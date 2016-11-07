// soundcloud api key
const SC_CLIENT_ID = '1c3aeb3f91390630d351f3c708148086'
const STATUS_OK = 200

SC.initialize({client_id: SC_CLIENT_ID})
const player = document.querySelector('#player')
const search = document.querySelector('#search')

search.addEventListener('submit', event => {
  event.preventDefault()
  player.textContent = 'Loading...'

  const title = search.querySelector('[name="title"]').value
  const artist = search.querySelector('[name="artist"]').value

  const request = new XMLHttpRequest()
  request.addEventListener('load', () => {
    if (request.status === STATUS_OK) {
      const tracks = JSON.parse(request.responseText)

      if (tracks.length === 0) {
        player.textContent = 'No tracks were found.'
      } else {
        displayPlayer(tracks[0])
      }
    } else {
      player.textContent = request.responseText
    }
  })

  // make request to our search endpoint
  const searchParams = 'artist=' + encodeURIComponent(artist) +
    '&title=' + encodeURIComponent(title)
  request.open('GET', '/search?' + searchParams)
  request.send()
})

/* Display SoundCloud player for the given track. */
function displayPlayer(track) {
  SC.oEmbed(track.permalink_url, {auto_play: true}, output => {
    player.innerHTML = output.html
  })
}
