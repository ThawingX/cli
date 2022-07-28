const logger = require('../../..//lib/logger')
const chalk = require('chalk')
const axios = require('axios')
const treeBaseUrl = "https://github.com/ThawingX/template/tree/"
const { defaultConfig } = require('./config/gitRepo')
const spinner = (require('ora'))('Loading Templates...')


function getList(config = defaultConfig) {
  spinner.start()
  axios(config)
    .then(function ({ data: branches }) {
      spinner.succeed('ok!')
      console.log(chalk.green('Available templates:'))
      console.log(chalk.yellow('--just some preset, you can use any other template by github-path'))
      branches.forEach(({ name, commit, protected }) => {
        console.log(`${chalk.yellow('★')} ${chalk.blue(name)}-${chalk.gray(treeBaseUrl + name)}`)
      })
    })
    .catch(function (error) {
      spinner.fail('fail!')
      logger.fatal(error)
    });
}

module.exports = {
  getList
}