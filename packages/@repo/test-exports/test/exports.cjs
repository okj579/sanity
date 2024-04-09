const path = require('node:path')
const _pkg = require('@repo/test-exports/package.json')

const {dependencies} = _pkg

module.exports = (condition) => {
  if (!condition) {
    throw new TypeError('condition is required')
  }
  const workspaces = {}
  for (const workspace of Object.keys(dependencies)) {
    // eslint-disable-next-line import/no-dynamic-require
    const pkg = require(`${workspace}/package.json`)
    if (pkg.exports) {
      workspaces[workspace] = []
      for (const [key, value] of Object.entries(pkg.exports)) {
        if (typeof value === 'object' && condition in value) {
          workspaces[workspace].push(path.join(workspace, key))
        }
      }
    } else {
      // @TODO all packages should declare `exports`
      console.warn('No exports found in:', workspace)
    }
  }

  return workspaces
}