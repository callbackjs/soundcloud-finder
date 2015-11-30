// soundcloud api key
var SC_CLIENT_ID = '1c3aeb3f91390630d351f3c708148086';
var STATUS_OK = 200;

SC.initialize({ client_id: SC_CLIENT_ID });
var $player = $('#player');

$("#search").submit(function() {
  event.preventDefault();

  var title = $('#search input[name="title"]').val();
  var artist = $('#search input[name="artist"]').val();

  $player.text('Loading...');

  var request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    if (request.status === STATUS_OK) {
      var tracks = JSON.parse(request.responseText);

      if (tracks.length === 0) {
        $player.text('No tracks were found.');
      } else {
        displayPlayer(tracks[0]);
      }
    } else {
      $player.text(request.responseText);
    }
  });

  // make request to our search endpoint
  var searchParams = 'artist=' + encodeURIComponent(artist) +
    '&title=' + encodeURIComponent(title);
  request.open('GET', '/search?' + searchParams);
  request.send();
});

/* Display SoundCloud player for the given track. */
function displayPlayer(track) {
  SC.oEmbed(track.permalink_url, { auto_play: true }, function(output) {
    $player.html(output.html);
  });
}
