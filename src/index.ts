#!/usr/bin/env node
require('dotenv').config()
const chalk = require('chalk')

const fs = require('fs')
const path = require('path')
const { generateApi } = require('swagger-typescript-api')

function main() {
  if (!process.env.OPEN_API_URL) {
    console.log(
      chalk.yellow('OPEN_API_URL is not defined. Service creation aborted!')
    )
    return
  }

  const OUTPUT_NAME = process.env.OPEN_API_OUT_FILENAME || '__generated-api.ts'
  const OUTPUT_PATH = path.resolve(
    process.cwd(),
    process.env.OPEN_API_OUT_DIR || './service/'
  )
  const TEMPLATES_PATH = path.resolve(__dirname, '../templates/')

  generateApi({
    name: OUTPUT_NAME,
    url: process.env.OPEN_API_URL,
    httpClientType: 'axios',
    templates: TEMPLATES_PATH,
    prettier: {
      parser: 'typescript',
      semi: false,
      arrowParens: 'avoid',
      trailingComma: 'none',
      singleQuote: true,
      endOfLine: 'lf',
      bracketSpacing: true,
      printWidth: 80,
      useTabs: false,
      quoteProps: 'as-needed',
      tabWidth: 2
    },
    unwrapResponseData: true,
    hooks: {
      onCreateRoute: (routeData) => {
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
            type: requestQuery.type.slice(0, - 1) + 'fetchKeys?: T }'
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
    if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH)

    files.forEach(({ content, name }) => {
      fs.writeFileSync(`${OUTPUT_PATH}/${name}`, content)
    })
  })
}

main()
