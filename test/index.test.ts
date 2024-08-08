import { expect, test } from 'vitest'
import { generateFromConfig } from '../src/generateFromConfig'
import fs from 'fs/promises'
import path from 'path'

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
