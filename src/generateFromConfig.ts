import path from 'path'
import { generateApi, ParsedRoute } from 'swagger-typescript-api'
import prettierConfig from '@sparing-software/prettier-config'
import fs from 'fs'
import { default as optimizeTypesUtil } from './optimizeTypes'
import onCreateRoute from './onCreateRoute'

type SingleConfig = {
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

export type Config = SingleConfig | SingleConfig[]

export const generateFromConfig = async (config: Config) => {
  if (Array.isArray(config))
    for (const singleConfig of config) {
      await generateSingleApi(singleConfig)
    }
  else await generateSingleApi(config)
}
const generateSingleApi = ({
  url,
  filePath,
  outDir = './service/',
  outFilename = '__generated-api.ts',
  exclude = [],
  include = [],
  optimizeTypes = true,
  typeWhitelist = []
}: SingleConfig) => {
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
      onCreateRoute: onCreateRoute as unknown as (
        routeData: ParsedRoute
      ) => ParsedRoute
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
