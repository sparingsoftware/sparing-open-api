#!/usr/bin/env node
const chalk = require('chalk')

const fs = require('fs')
const path = require('path')
const { generateApi } = require('swagger-typescript-api')
const prettierConfig = require('@sparing-software/prettier-config')

export type Config = {
  /**
   * Http address of JSON OpenAPI schema to your API
   * @required
   */
  url?: string
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
}

function main() {
  const CONFIG_PATH = path.resolve(process.cwd(), 'sparing-open-api.config.js')

  if (!fs.existsSync(CONFIG_PATH)) {
    console.log(
      chalk.yellow(
        "Couldn't find sparing-open-api.config.js. Service creation aborted!"
      )
    )
    return
  }

  const {
    url,
    outDir = './service/',
    outFilename = '__generated-api.ts',
    exclude = [],
    include = []
  } = require(CONFIG_PATH) as Config

  if (!url) {
    console.log(
      chalk.yellow(
        '"url" property in sparing-open-api.config.js is not defined. Service creation aborted!'
      )
    )
    return
  }

  const OUTPUT_PATH = path.resolve(process.cwd(), outDir)
  const TEMPLATES_PATH = path.resolve(__dirname, '../templates/')

  generateApi({
    name: outFilename,
    url,
    httpClientType: 'axios',
    templates: TEMPLATES_PATH,
    prettier: {
      parser: 'typescript',
      ...prettierConfig
    },
    generateUnionEnums: true,
    unwrapResponseData: true,
    exclude,
    include,
    hooks: {
      onCreateRoute: routeData => {
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
  }).then(({ files }) => {
    if (!fs.existsSync(OUTPUT_PATH))
      fs.mkdirSync(OUTPUT_PATH, { recursive: true })

    files.forEach(({ content, name }) => {
      fs.writeFileSync(`${OUTPUT_PATH}/${name}`, content)
    })

    process.exit(0)
  })
}

main()
