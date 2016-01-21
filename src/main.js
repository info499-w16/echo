'use strict'

const http = require('http')

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/json'})
  response.end('Hello World\n')
  console.log(request)
}).listen(80)

console.log('Echo listening on http://localhost:80')
