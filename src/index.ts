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

  const OUTPUT_NAME = '__generated-api.ts'
  const OUTPUT_PATH = path.resolve(process.cwd(), './service/')
  const TEMPLATES_PATH = path.resolve(__dirname, './templates/')

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
    }
  }).then(({ files }) => {
    if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH)

    files.forEach(({ content, name }) => {
      fs.writeFileSync(`${OUTPUT_PATH}/${name}`, content)
    })
  })
}

main()
