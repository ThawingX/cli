/**
 * List repos.
 */
 const defaultConfig = {
  method: 'get',
  url: 'https://api.github.com/repos/thawingx/template/branches',
  headers: {
    "User-Agent": "thawingx"
  }
 };

module.exports = {
   defaultConfig
 }