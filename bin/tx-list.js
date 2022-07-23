#!/usr/bin/env node

const logger = require('../lib/logger')
const chalk = require('chalk')
const axios = require('axios')
const treeBaseUrl = "https://github.com/ThawingX/template/tree/"
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
const config = {
  method: 'get',
  url: 'https://api.github.com/repos/thawingx/template/branches',
  headers: {
    "User-Agent": "thawingx"
  }
};

axios(config)
  .then(function ({ data: branches }) {
    console.log('Available templates:')
    chalk.gray('just my preset, you can use any other template by github-path')
    console.log()
    branches.forEach(({ name, commit, protected }) => {
      console.log(` ${chalk.yellow('★')} ${chalk.blue(name)}-${treeBaseUrl + name}`)
    })
  })
  .catch(function (error) {
    logger.fatal(error)
  });