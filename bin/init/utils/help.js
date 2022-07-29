const chalk = require('chalk')

function callTxInitHelp() {
  console.log(chalk.green('Examples:'))
  console.log()
  console.log(chalk.gray(' # create a new project with an template of thawingx,'))
  console.log(chalk.gray(' # detail at branch of https://github.com/ThawingX/template'))
  console.log(chalk.green(' $ tx init vue-unocss my-project'))
  console.log()
  console.log(chalk.gray(' # create a new project straight from a github template, just support github and gitlab'))
  console.log(chalk.green(' $ tx init thawingx/template/vue-unocss my-project'))
  console.log(chalk.green(' $ tx init <username>/<template> <projectName>'))
  console.log()
  return 
}

function help() {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}

module.exports = {
  callTxInitHelp,
  help
}