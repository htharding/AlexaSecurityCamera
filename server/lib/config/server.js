var path = require('path')

//Original httpPort: 8080,

module.exports = {
  httpPort: 8080,
  http2Port: 3000,
  staticFolder: path.join(__dirname + '/../../../client')
};