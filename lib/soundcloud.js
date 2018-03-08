const request = require('request')

// soundcloud api key
const SC_CLIENT_ID = '1c3aeb3f91390630d351f3c708148086'

// api endpoint to fetch tracks
const SC_URL = 'https://api.soundcloud.com/tracks.json'
const STATUS_OK = 200

/* Searches SoundCloud for a track with the given title and/or artist.
 *
 * Calls callback(error, tracks):
 *  error - an error if one occurred
 *  tracks - an array of matching SoundCloud tracks
 */
module.exports.search = function(title, artist, callback) {
  // query string parameters for request to soundcloud api
  const params = {
    client_id: SC_CLIENT_ID,
    q: title + ' ' + artist,
  }

  request.get({
    url: SC_URL,
    qs: params,
  }, (error, response, body) => {
    if (error) {
      callback(error)
    } else if (response.statusCode !== STATUS_OK) {
      callback(new Error('Received bad status code: ' + response.statusCode))
    } else {
      callback(null, JSON.parse(body))
    }
  })
}
