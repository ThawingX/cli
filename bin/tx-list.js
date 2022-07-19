#!/usr/bin/env node

const logger = require('../lib/logger')

const chalk = require('chalk')

/**
 * Padding.
 */

console.log()
process.on('exit', function () {
  console.log()
})

/**
 * List repos.
 */

request({
  url: 'https://api.github.com/users/tx-templates',
  headers: {
    'User-Agent': 'tx-cli'
  }
}, function (err, res, body) {
  if (err) logger.fatal(err)
  console.log('  Available official templates:')
  console.log()
  JSON.parse(body).forEach(function (repo) {
    console.log(
      '  ' + chalk.yellow('★') +
      '  ' + chalk.blue(repo.name) +
      ' - ' + repo.description)
  })
})
