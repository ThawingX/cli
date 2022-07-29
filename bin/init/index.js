#!/usr/bin/env node

const exists = require('fs').existsSync
const resolve = require('path').resolve
const logger = require('../../lib/logger')
const { callTxInitHelp, help } = require('./utils/help')
const { detect } = require('./utils/detect')


const init = new (require('commander')
  .Command)('init', 'generate a new project from a template')

init.on('--help', callTxInitHelp)

init
  .usage('<template-name> <project-name>')
  .description('generate a new project from a template')
  .summary('init project')

init
  .arguments('<template> <projectName>')
  .action((template, projectName) => {
    
    const hasSlash = template.indexOf('/') > -1
    const to = resolve(projectName)
    if (exists(to)) logger.fatal('"%s" already exists.', projectName)
    detect(template, projectName, to, hasSlash)

  })
module.exports = {
  init
}