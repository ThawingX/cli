
const { getList } = require('./utils/http')
const chalk = require('chalk')


const list = new (require('commander'))
  .Command('list', 'list available official templates')

list.addHelpText('after', 
`Example call: 
$ tx list    show available official templates
$ tx list -t vue    show templates about vue
$ tx list -t angular    show templates about angular`
)

list
  .option('-t,--target','you can see specify templates')
  .action((param) => {
    if (param.target) {
      console.log(chalk.yellow('This feature is still in the Coding'))
      console.log(chalk.green('you can use <tx list> to view usable templates'))
    }
    else {
      getList()
    }
  })

module.exports = {
  list
}
