const express = require('express')

const server = express()
// serve all files out of public folder
server.use(express.static('public'))

// TODO: soundcloud finder code

const port = 3000
console.log('Listening at 127.0.0.1:' + port)
server.listen(port)
