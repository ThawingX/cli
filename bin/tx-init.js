#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const exists = require('fs').existsSync
const join = require('path').join
const resolve = require('path').resolve
const { uid } = require('uid')
const download = require('download-github-repo')
const Khaos = require('khaos')
const metadata = require('read-metadata')
const logger = require('../lib/logger')
const rm = require('rimraf').sync
const getGitUser = require('../lib/git-user')

/**
 * Usage
 */
program.usage('<template-name> <project-name>')


/**
 * Help
 */
program.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with an template of thawingx,'))
  console.log(chalk.gray('    # detail at branch of https://github.com/ThawingX/template'))
  console.log('    $ tx init vue-unocss my-project')
  console.log()
  console.log(chalk.gray('    # create a new project straight from a github template, just support github and gitlab'))
  console.log('    $ tx init thawingx/template/vue-unocss my-project')
  console.log('    $ tx init <username>/<template> <projectName>')
  console.log()
})

/**
 * Help
 */

program.parse(process.argv)
if (program.args.length < 2) return program.help()

/**
 * Padding
 */

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * Settings
 */

let template = program.args[0]
const hasSlash = template.indexOf('/') > -1
const projectName = program.args[1]
const dir = program.directory
const to = resolve(projectName)
if (exists(to)) logger.fatal('"%s" already exists.', projectName)

/**
 * Detect if template on file system
 */

if (exists(template)) {
  generate(template, to, function (err) {
    if (err) logger.fatal(err)
    console.log()
    logger.success('Generated "%s".', projectName)
  })
} else {
  /**
   * Detect official template.
   */
  // 当不存在时，返回true  !~ indexof 的配合使用
  if (!hasSlash) {
    template = `thawingx/template#${template}`
  }

  /** 
   * Download and generate
   */

  const tmp = '/tmp/tx-template-' + uid()
  download(template, tmp, function (err) {
    if (err) logger.fatal(err)
    generate(tmp, to, function (err) {
      if (err) logger.fatal(err)
      rm(tmp)
      console.log()
      logger.success('Generated "%s".', projectName)
    })
  })
}

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
  khaos.generate(dest,fn)
}

/**
 * Read prompts metadata.
 *
 * @param {String} dir
 * @return {Object}
 */

function options(dir) {
  const file = join(dir, 'meta.json')
  const opts = exists(file)
    ? metadata.sync(file)
    : {}

  setDefault(opts, 'name', projectName)
  const author = getGitUser()
  if (author) {
    setDefault(opts,'author',author)
  }
  return opts
}

/**
 * Automatically infer the default project name
 *
 * @param {Object} opts
 */

function setDefault(opts,key,val) {
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