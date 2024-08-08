import path from 'path'
import { generateApi } from 'swagger-typescript-api'
import prettierConfig from '@sparing-software/prettier-config'
import fs from 'fs'
import { default as optimizeTypesUtil } from './optimizeTypes'

export type Config = {
  /**
   * Http address of JSON OpenAPI schema to your API
   * @required
   */
  url?: string
  /**
   * File path of JSON OpenAPI schema to your API
   */
  filePath?: string
  /**
   * Output directory for generated http service
   *
   * In order to help webpack automatically map aliases for generated file in Vue/React projects please use the following config: './src/service'
   * @default './service'
   */
  outDir?: string
  /**
   * Output filename (filename must be with .ts extension)
   * @default '__generated-api.ts'
   */
  outFilename?: string
  /**
   * List of paths to be excluded from generated api
   * @example ['/users'] // all paths starting with /users
   * @example [''] // all paths
   */
  exclude?: string[]
  /**
   * List of paths to be included in the generated api, takes priority over excluded paths
   *
   * Helpful when you need to exclude all but a few paths
   * @example ['/users'] // all paths starting with /users
   */
  include?: string[]
  /**
   * Removes all type exports that have no references in endpoints (can slow down api generation)
   * @default true
   */
  optimizeTypes?: boolean
  /**
   * List of types unaffected by optimizeTypes
   *
   * Helpful when you need an exported type that isn't referenced in any endpoint
   * @example ['WidgetResourcetypeEnum']
   */
  typeWhitelist?: string[]
}

export const generateFromConfig = ({
  url,
  filePath,
  outDir = './service/',
  outFilename = '__generated-api.ts',
  exclude = [],
  include = [],
  optimizeTypes = true,
  typeWhitelist = []
}: Config) => {
  const OUTPUT_PATH = path.resolve(process.cwd(), outDir)
  const TEMPLATES_PATH = path.resolve(__dirname, '../templates/')

  return generateApi({
    ...(filePath ? { input: filePath } : { url }),
    name: outFilename,
    httpClientType: 'axios',
    templates: TEMPLATES_PATH,
    prettier: {
      parser: 'typescript',
      ...prettierConfig
    },
    generateUnionEnums: true,
    unwrapResponseData: true,
    // @ts-ignore
    exclude,
    // @ts-ignore
    include,
    hooks: {
      onCreateRoute: data => {
        // TODO Simplify types
        const routeData = data as typeof data & {
          responseBodySchema: { type: string }
          routeParams: { query: object[] }
          request: { query: { type: string; name: string; optional: boolean } }
        }

        if (routeData.request.method !== 'get') return routeData

        const type = `FetchKeys<${routeData.responseBodySchema.type}>`

        routeData.routeParams.query.push({
          name: 'fetchKeys',
          required: false,
          in: 'query',
          description: 'Keys to fetch from endpoint',
          schema: { type },
          type
        })

        if (routeData.request.query) {
          const requestQuery = routeData.request.query
          routeData.request.query = {
            ...requestQuery,
            type: requestQuery.type.slice(0, -1) + 'fetchKeys?: T }'
          }
        } else {
          routeData.request.query = {
            name: 'query',
            optional: true,
            type: `{ fetchKeys?: T }`
          }
        }

        return routeData
      }
    }
  }).then(async ({ files }) => {
    if (!fs.existsSync(OUTPUT_PATH))
      fs.mkdirSync(OUTPUT_PATH, { recursive: true })

    const [firstFile] = files

    if (firstFile) {
      const { name, content } = firstFile
      const fullPath = `${OUTPUT_PATH}/${name}`

      fs.writeFileSync(fullPath, content)

      if (optimizeTypes) {
        console.log('🤏   optimizing types')
        await optimizeTypesUtil(fullPath, typeWhitelist)
      }
    }
  })
}
