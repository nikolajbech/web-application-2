import { exec } from 'child_process'
import fs from 'fs'

const kebabCase = (/** @type {string} */ str) => {
  return str
    .split('')
    .map((/** @type {string} */ letter, /** @type {number} */ idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')
}

const capitalize = (/** @type {string} */ str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const _componentName = capitalize(process.argv[2]?.trim() ?? '')

const dir = `./src/components`

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const parts = _componentName.split('/')

const componentName = parts[parts.length - 1]

// Create category folder if it doesn't exist
if (parts.length > 1 && parts[0]) {
  const categoryDir = `${dir}/${kebabCase(parts[0])}`
  if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir)
}

// Hack - make prettier if copied to another project
const componentPath = `${dir}/${parts.length === 1 ? kebabCase(_componentName) : kebabCase(parts[0] ?? '') + '/' + kebabCase(parts[1] ?? '')}.tsx`

const componentSnippet = `'use client'

export const ${componentName} = () => {
  return (
    <div className=''>
      <h1>${componentName}</h1>
    </div>
  )
}
`

fs.writeFile(componentPath, componentSnippet, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Created', componentName)
})

exec(`code ${componentPath}`)
