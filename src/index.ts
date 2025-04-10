#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { type Config, generateFromConfig } from './generateFromConfig'

async function main() {
  const CONFIG_PATH = path.resolve(process.cwd(), 'sparing-open-api.config.js')

  if (!fs.existsSync(CONFIG_PATH)) {
    console.log(
      chalk.yellow(
        "Couldn't find sparing-open-api.config.js. Service creation aborted!"
      )
    )
    return
  }

  const config = (await import(pathToFileURL(CONFIG_PATH).href))
    .default as Config

  const isUrlMissing = Array.isArray(config)
    ? !config.every(item => item.url)
    : !config.url

  if (isUrlMissing) {
    console.log(
      chalk.yellow(
        '"url" property is not defined. Service creation aborted!'
      )
    )
    return
  }

  await generateFromConfig(config)
  process.exit(0)
}

main()
