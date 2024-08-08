#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
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

  const config = (await import(CONFIG_PATH)).default as Config

  if (!config.url) {
    console.log(
      chalk.yellow(
        '"url" property in sparing-open-api.config.js is not defined. Service creation aborted!'
      )
    )
    return
  }

  await generateFromConfig(config)
  process.exit(0)
}

main()
