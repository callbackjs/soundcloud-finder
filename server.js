const express = require('express')
const soundcloud = require('./lib/soundcloud')

const STATUS_OK = 200
const STATUS_USER_ERROR = 422

const server = express()
// serve all files out of public folder
server.use(express.static('public'))

server.get('/search', function(request, response) {
  const title = request.query.title
  const artist = request.query.artist

  if (!title || !artist) {
    // missing required parameters
    response.set('Content-type', 'text/plain')
    response.status(STATUS_USER_ERROR)
    response.send('You must specify both a title and artist.')
  } else {
    soundcloud.search(title, artist, (error, tracks) => {
      if (error) {
        throw error
      }

      response.set('Content-type', 'application/json')
      response.status(STATUS_OK)
      response.send(JSON.stringify(tracks))
    })
  }
})

const port = 3000
console.log('Listening at 127.0.0.1:' + port)
server.listen(port)
