const program = require('commander')
const chalk = require('chalk')
const exists = require('fs').existsSync
const join = require('path').join
const resolve = require('path').resolve
const uid = require('uid')
const download = require('download-github-repo')
const Khaos = require('khaos')
const metadata = require('read-metadata')
// const logger = require('../lib/logger')
const rm = require('rimraf').sync

var template = program.args[0]
var name = program.args[1]
var dir = program.directory
var to = resolve(name)
if (exists(to)) logger.fatal('"%s" already exists.', name)


function options(dir) {
  var file = join(dir, 'meta.json')
  var opts = exists(file)
    ? metadata.sync(file)
    : {}
  console.log(opts)
  defaultName(opts)
  return opts
}

function defaultName (opts) {
  var schema = opts.schema || (opts.schema = {})
  if (!schema.name || typeof schema.name !== 'object') {
    schema.name = {
      'type': 'string',
      'default': name
    }
  } else {
    schema.name['default'] = name
  }
}

options('./2asd/23s')