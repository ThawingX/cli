const getGitUser = require('../../../lib/git-user')
const Khaos = require('khaos')
const join = require('path').join
const exists = require('fs').existsSync
const metadata = require('read-metadata')


/**
 * Generate a template given a `src` and `dest`
 *
 * @param {string} src
 * @param {string} dest
 * @param {Function} fn
 */

function generate(src, dest, fn) {
  const template = join(src)
  const khaos = new Khaos(template)
  const opts = options(src)

  khaos.schema(opts.schema)
  khaos.generate(dest, fn)
}


/**
* Read prompts metadata.
*
* @param {String} dir
* @return {Object}
*/


function options(dir) {
  // 预留meta.json
  const file = join(dir, 'meta.json')
  const opts = exists(file)
    ? metadata.sync(file)
    : {}

  setDefault(opts, 'name', projectName)
  setDefault(opts, 'version', "v0.0.0")
  setDefault(opts, 'description', "<>")
  setDefault(opts, 'main', "index.js")
  const author = getGitUser()
  if (author) {
    setDefault(opts, 'author', author)
  }
  return opts
}

/**
 * Automatically infer the default project name
 *
 * @param {Object} opts
 */

function setDefault(opts, key, val) {
  const schema = opts.schema || (opts.schema = {})
  if (!schema[key] || typeof schema[key] !== 'object') {
    schema[key] = {
      'type': 'string',
      'default': val
    }
  } else {
    schema[key]['default'] = val
  }
}

module.exports = {
  generate
}