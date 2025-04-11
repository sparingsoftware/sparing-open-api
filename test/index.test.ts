import { describe, expect, expectTypeOf, it, test } from 'vitest'
import { generateFromConfig } from '../src/generateFromConfig'
import fs from 'fs/promises'
import path from 'path'
import {
  PickKeys,
  FetchKeys,
  postprocessQuery,
  Api
} from './generated/__generated-api'
import onCreateRoute from '../src/onCreateRoute'

const GENERATED_DIRECTORY = path.join('test', 'generated')

describe('generates api', () => {
  it('by file path', async () => {
    const GENERATED_FILENAME = '__generated-api.ts'
    const GENERATED_PATH = path.join(GENERATED_DIRECTORY, GENERATED_FILENAME)

    await fs.rm(GENERATED_PATH, {
      force: true
    })

    await generateFromConfig({
      filePath: path.join('test', 'api.json'),
      outDir: GENERATED_DIRECTORY
    })

    const generated = await fs.readFile(GENERATED_PATH, { encoding: 'utf-8' })
    expect(generated).toMatchSnapshot()
  })

  it('by url', async () => {
    const GENERATED_FILENAME = '__generated-api-from-url.ts'
    const GENERATED_PATH = path.join(GENERATED_DIRECTORY, GENERATED_FILENAME)
    const TEST_API_URL = 'https://petstore3.swagger.io/api/v3/openapi.json'

    await fs.rm(GENERATED_PATH, {
      force: true
    })

    await generateFromConfig({
      url: TEST_API_URL,
      outDir: GENERATED_DIRECTORY,
      outFilename: GENERATED_FILENAME
    })

    const generated = await fs.readFile(GENERATED_PATH, { encoding: 'utf-8' })
    expect(generated).toContain('type FetchKeys')

    await fs.rm(GENERATED_PATH)
  })

  it('from array', async () => {
    const GENERATED_FILENAME_V1 = '__generated-api-from-url-v1.ts'
    const GENERATED_FILENAME_V2 = '__generated-api-from-url-v2.ts'
    const GENERATED_PATH_V1 = path.join(
      GENERATED_DIRECTORY,
      GENERATED_FILENAME_V1
    )
    const GENERATED_PATH_V2 = path.join(
      GENERATED_DIRECTORY,
      GENERATED_FILENAME_V2
    )
    const TEST_API_URL = 'https://petstore3.swagger.io/api/v3/openapi.json'

    await generateFromConfig([
      {
        url: TEST_API_URL,
        outDir: GENERATED_DIRECTORY,
        outFilename: GENERATED_FILENAME_V1
      },
      {
        url: TEST_API_URL,
        outDir: GENERATED_DIRECTORY,
        outFilename: GENERATED_FILENAME_V2
      }
    ])

    await Promise.all([
      fs
        .readFile(GENERATED_PATH_V1, { encoding: 'utf-8' })
        .then(result => expect(result).toContain('type FetchKeys'))
        .then(() => fs.rm(GENERATED_PATH_V1)),
      fs
        .readFile(GENERATED_PATH_V2, { encoding: 'utf-8' })
        .then(result => expect(result).toContain('type FetchKeys'))
        .then(() => fs.rm(GENERATED_PATH_V2))
    ])
  })
})

describe('postprocessQuery', () => {
  it('handles undefined query', () => {
    const parsedQuery = postprocessQuery(undefined)
    expect(parsedQuery).toBeUndefined()
  })
  it('handles undefined fetchKeys', () => {
    const parsedQuery = postprocessQuery({ fetchKeys: undefined })
    expect(parsedQuery).toEqual({})
  })
  it('keeps other parameters', () => {
    const parsedQuery = postprocessQuery({ fetchKeys: undefined, key1: 1 })
    expect(parsedQuery).toEqual({ key1: 1 })
  })
  describe('based on FetchKeys object', () => {
    it('creates query', () => {
      const parsedQuery = postprocessQuery({ fetchKeys: { key1: true } })
      expect(parsedQuery).toEqual({ query: '{key1}' })
    })
    it('handles nested fields', () => {
      const parsedQuery = postprocessQuery({
        fetchKeys: { key1: { key2: true } }
      })
      expect(parsedQuery?.query).toEqual('{key1{key2}}')
    })
    it('handles multiple fields', () => {
      const parsedQuery = postprocessQuery({
        fetchKeys: { key1: { key2: true }, key3: true }
      })
      expect(parsedQuery?.query).toEqual('{key1{key2},key3}')
    })
    it('handles multiple nested fields', () => {
      const parsedQuery = postprocessQuery({
        fetchKeys: { key1: { key2: true, key3: true } }
      })
      expect(parsedQuery?.query).toEqual('{key1{key2,key3}}')
    })
  })
  describe('based on FetchKeys array', () => {
    it('creates query', () => {
      const parsedQuery = postprocessQuery({ fetchKeys: ['key1'] })
      expect(parsedQuery).toEqual({ query: '{key1}' })
    })
    it('handles nested fields', () => {
      const parsedQuery = postprocessQuery({
        fetchKeys: ['key1.key2']
      })
      expect(parsedQuery?.query).toEqual('{key1{key2}}')
    })
    it('handles multiple fields', () => {
      const parsedQuery = postprocessQuery({
        fetchKeys: ['key1.key2', 'key3']
      })
      expect(parsedQuery?.query).toEqual('{key1{key2},key3}')
    })
    it('handles multiple nested fields', () => {
      const parsedQuery = postprocessQuery({
        fetchKeys: ['key1.key2', 'key1.key3']
      })
      expect(parsedQuery?.query).toEqual('{key1{key2,key3}}')
    })
    it('throws when there are duplicate keys', () => {
      expect(() => {
        postprocessQuery({ fetchKeys: ['key1', 'key1'] })
      }).toThrow(`Duplicate`)
    })
    it('throws when there is invalid duplicate nesting', () => {
      expect(() => {
        postprocessQuery({ fetchKeys: ['key1', 'key1.key2'] })
      }).toThrow('Invalid')
    })
  })
})

describe('PickKeys', () => {
  it("doesn't change the response model by default", () => {
    type ResponseModel = { key1?: string }
    type WithPickKeys = PickKeys<ResponseModel, FetchKeys<ResponseModel>>
    expectTypeOf<WithPickKeys>().toEqualTypeOf<ResponseModel>()
  })
  describe('based on FetchKeys object', () => {
    it('picks keys from object', () => {
      type MyObject = PickKeys<
        { key1: string; key2: string; key3: number },
        { key1: true; key3: true }
      >
      expectTypeOf<MyObject>().toEqualTypeOf<{ key1: string; key3: number }>()
    })
    it('handles nested fields', () => {
      type MyObject = PickKeys<
        { key1: { key2: string; key3: string } },
        { key1: { key2: true } }
      >
      expectTypeOf<MyObject>().toEqualTypeOf<{ key1: { key2: string } }>()
    })
    it('handles pagination', () => {
      type MyObject = PickKeys<
        { results: [{ key1: string; key2: string }]; count: number },
        { key1: true }
      >
      expectTypeOf<MyObject>().toEqualTypeOf<{
        results: { key1: string }[]
        count: number
      }>()
    })
    it('handles empty object', () => {
      type ResponseModel = { key1: string }
      expectTypeOf<PickKeys<ResponseModel, {}>>().toEqualTypeOf<ResponseModel>()
    })
    it('handles arrays', () => {
      type DataModel = { key1: string; key2: string }
      type ResponseModel = DataModel[]
      expectTypeOf<PickKeys<ResponseModel, { key1: true }>>().toEqualTypeOf<
        { key1: string }[]
      >()
    })
    it('handles optional fields', () => {
      type ResponseModel = { key1?: string }
      expectTypeOf<PickKeys<ResponseModel, { key1: true }>>().toEqualTypeOf<{
        key1: string | undefined
      }>()
    })
  })
  describe('based on FetchKeys array', () => {
    it('picks keys from object', () => {
      type MyObject = PickKeys<
        { key1: string; key2: string; key3: number },
        ['key1', 'key3']
      >
      expectTypeOf<MyObject>().toEqualTypeOf<{ key1: string; key3: number }>()
    })
    it('handles nested fields', () => {
      type MyObject = PickKeys<
        { key1: { key2: string; key3: string } },
        ['key1.key2']
      >
      expectTypeOf<MyObject>().toEqualTypeOf<{ key1: { key2: string } }>()
    })
    it('handles pagination', () => {
      type MyObject = PickKeys<
        { results: [{ key1: string; key2: string }]; count: number },
        ['key1']
      >
      expectTypeOf<MyObject>().toEqualTypeOf<{
        results: { key1: string }[]
        count: number
      }>()
    })
    it('handles empty array', () => {
      type ResponseModel = { key1: string }
      expectTypeOf<
        PickKeys<ResponseModel, never[]>
      >().toEqualTypeOf<ResponseModel>()
    })
    it('handles arrays', () => {
      type DataModel = { key1: string; key2: string }
      type ResponseModel = DataModel[]
      expectTypeOf<PickKeys<ResponseModel, ['key1']>>().toEqualTypeOf<
        { key1: string }[]
      >()
    })
    it('handles optional fields', () => {
      type ResponseModel = { key1?: string }
      expectTypeOf<PickKeys<ResponseModel, ['key1']>>().toEqualTypeOf<{
        key1: string | undefined
      }>()
    })
  })
})

describe('FetchKeys', () => {
  it('creates a type based on a ResponseModel', () => {
    type MyFetchKeys = FetchKeys<{ key1: string }>
    expectTypeOf<MyFetchKeys>().toEqualTypeOf<
      | {
          key1?: true | undefined
        }
      | 'key1'[]
    >()
  })
  it('handles nested fields', () => {
    type MyFetchKeys = FetchKeys<{ key1: string; key2: { key3: string } }>
    expectTypeOf<MyFetchKeys>().toEqualTypeOf<
      | {
          key1?: true | undefined
          key2?: true | undefined | { key3?: true | undefined }
        }
      | ('key1' | 'key2' | 'key2.key3')[]
    >()
  })
  it('handles pagination', () => {
    type MyFetchKeys = FetchKeys<{ results: { key1: string }[]; count: number }>
    expectTypeOf<MyFetchKeys>().toEqualTypeOf<
      | {
          key1?: true | undefined
        }
      | 'key1'[]
    >()
  })
  it('handles any', () => {
    type MyFetchKeys = FetchKeys<{ key1: any }>
    expectTypeOf<MyFetchKeys>().toEqualTypeOf<
      | {
          key1?: true | undefined
        }
      | 'key1'[]
    >()
  })
  it('handles arrays', () => {
    type MyFetchKeys = FetchKeys<{ key1: string }[]>
    expectTypeOf<MyFetchKeys>().toEqualTypeOf<
      { key1?: true | undefined } | 'key1'[]
    >()
  })
})

const clone = <T extends object>(object: T) =>
  JSON.parse(JSON.stringify(object)) as T

describe('onCreateRoute', () => {
  it("doesn't modify a POST route", () => {
    const routeData = {
      responseBodySchema: { type: 'ExampleType' },
      routeParams: { query: [] },
      request: {
        method: 'post'
      }
    }
    const originalRouteData = clone(routeData)
    expect(onCreateRoute(routeData)).toEqual(originalRouteData)
  })
  it('adds fetchKeys to `routeParams.query`', () => {
    const routeData = {
      responseBodySchema: { type: 'ExampleType' },
      routeParams: { query: [] },
      request: {
        method: 'get'
      }
    }
    expect(onCreateRoute(routeData).routeParams.query.at(-1)).toEqual({
      name: 'fetchKeys',
      required: false,
      in: 'query',
      description: 'Keys to fetch from endpoint',
      schema: { type: 'FetchKeys<ExampleType>' },
      type: 'FetchKeys<ExampleType>'
    })
  })
  it("creates `request.query` if it doesn't exist", () => {
    const routeData = {
      responseBodySchema: { type: 'ExampleType' },
      routeParams: { query: [] },
      request: {
        method: 'get'
      }
    }
    expect(onCreateRoute(routeData).request.query).toEqual({
      name: 'query',
      optional: true,
      type: `{ fetchKeys?: T }`
    })
  })
  it('appends to `request.query` if it exists', () => {
    const routeData = {
      responseBodySchema: { type: 'ExampleType' },
      routeParams: { query: [] },
      request: {
        query: {
          name: 'query',
          optional: true,
          type: '{\n    myQueryParam: string,\n\n}'
        },
        method: 'get'
      }
    }
    expect(onCreateRoute(routeData).request.query?.type).toEqual(
      '{\n    myQueryParam: string,\n\nfetchKeys?: T }'
    )
  })
})

describe('API class', () => {
  const api = new Api()

  it('has correct method type', () => {
    type Response = Awaited<
      ReturnType<typeof api.public.publicPagesArticlesList<['author.id']>>
    >
    expectTypeOf<Response>().toEqualTypeOf<{
      count: number
      next?: (string | null) | undefined
      previous?: (string | null) | undefined
      page_size?: number | undefined
      results: {
        author: { id: string }
      }[]
    }>()
  })
})
