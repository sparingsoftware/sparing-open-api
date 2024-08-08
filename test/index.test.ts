import { describe, expect, expectTypeOf, it, test } from 'vitest'
import { generateFromConfig } from '../src/generateFromConfig'
import fs from 'fs/promises'
import path from 'path'
import { PickKeys, postprocessQuery } from '../src/postprocessQuery'

const GENERATED_DIRECTORY = 'test'
const GENERATED_FILENAME = '__generated-api.ts'
const GENERATED_PATH = path.join(GENERATED_DIRECTORY, GENERATED_FILENAME)

test('generates api from config object', async () => {
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

describe('postprocessQuery', () => {
  it('creates query based on fetchKeys', () => {
    const parsedQuery = postprocessQuery({ fetchKeys: { key1: true } })
    expect(parsedQuery).toEqual({ query: '{key1}' })
  })
  it('handles nested fields', () => {
    const parsedQuery = postprocessQuery({
      fetchKeys: { key1: { key2: true } }
    })
    expect(parsedQuery.query).toEqual('{key1{key2}}')
  })
  it('handles multiple fields', () => {
    const parsedQuery = postprocessQuery({
      fetchKeys: { key1: { key2: true }, key3: true }
    })
    expect(parsedQuery.query).toEqual('{key1{key2},key3}')
  })
})

describe('PickKeys', () => {
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
})
