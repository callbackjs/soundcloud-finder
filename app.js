var express = require('express');
var soundcloud = require('./lib/soundcloud');

var STATUS_OK = 200;
var STATUS_USER_ERROR = 422;

var app = express();
// serve all files out of public folder
app.use(express.static('public'));

app.get('/search', function(request, response) {
  var title = request.query.title;
  var artist = request.query.artist;

  if (!title || !artist) {
    // missing required parameters
    response.set('Content-type', 'text/plain');
    response.status(STATUS_USER_ERROR);
    response.send('You must specify both a title and artist.');
  } else {
    soundcloud.search(title, artist, function(error, tracks) {
      if (error) {
        throw error;
      }

      response.set('Content-type', 'application/json');
      response.status(STATUS_OK);
      response.send(JSON.stringify(tracks));
    });
  }
});

var port = 3000;
console.log('Listening at 127.0.0.1:' + port);
app.listen(port);
