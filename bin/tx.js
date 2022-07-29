#!/usr/bin/env node

const program = new (require('commander').Command)()
const { list } = require('./list')
const { init } = require('./init')
program
  .name('tx')
  .version(require('../package.json').version, '-v,--version', 'output the current version')
  .usage(' <command> [options]')
  .addCommand(list)
  .addCommand(init)
  .parse(process.argv)



/**
* Padding.
*/
process.on('exit', function () {
  console.log()
})
