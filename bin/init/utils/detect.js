const exists = require('fs').existsSync
const download = require('download-github-repo')
const { uid } = require('uid')
const rm = require('rimraf').sync
const { generate } = require('./generate')
const logger = require('../../../lib/logger')



function detect(template, projectName, to, hasSlash) {
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

}


module.exports = {
  detect
}