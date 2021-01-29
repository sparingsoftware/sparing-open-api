require('dotenv').config()
const chalk = require('chalk')

const fs = require('fs')
const path = require('path')
const generateApi = require('swagger-typescript-api').generateApi

module.exports = function () {
  if (!process.env.OPEN_API_URL) {
    console.log(
      chalk.yellow('OPEN_API_URL is not defined. Service creation aborted!')
    )
    return
  }

  const OUTPUT_NAME = 'index.ts'
  const OUTPUT_PATH = path.resolve(process.cwd(), './service/')
  const TEMPLATES_PATH = path.resolve(__dirname, '../templates/')

  return generateApi({
    name: OUTPUT_NAME,
    url: process.env.OPEN_API_URL,
    templates: TEMPLATES_PATH
  }).then(({ files }) => {
    if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH)

    files.forEach(({ content, name }) => {
      fs.writeFileSync(`${OUTPUT_PATH}/${name}`, content)
    })
  })
}
