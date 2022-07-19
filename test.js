const download = require('download-github-repo')
download('thawingx/template#vue-unocss', 'temp/test', () => {
  console.log('callback')
})