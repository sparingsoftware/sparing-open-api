const ts = require('ts-morph')

const optimizeTypes = (path: string, whitelist: string[]) => {
  const project = new ts.Project()
  const file = project.addSourceFileAtPath(path)

  let prevTextLength = 0

  const removeUnusedTypes = () => {
    const fileText = file.getText()

    if (fileText.length === prevTextLength) return
    else prevTextLength = fileText.length

    file.getTypeAliases().forEach(typeDeclaration => {
      const type = typeDeclaration.getName()
      const typeReferences = [
        ...fileText.matchAll(new RegExp(`\\b${type}\\b`, 'g'))
      ]

      if (!whitelist.includes(type) && typeReferences.length <= 1)
        typeDeclaration.remove()
    })

    removeUnusedTypes()
  }

  removeUnusedTypes()

  project.save()
}

export default optimizeTypes
