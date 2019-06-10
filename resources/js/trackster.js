const API_KEY= '64eedbbe2dcfb2b5faea5fd3cdd79759';

$(document).ready(function(){


// CODE BELOW IS THE CLICK EVENT FOR THE SEARCH BUTTON
$('#search_button').click(function(){
  var SearchText = $('#search_input').val();
  $(Trackster.searchTracksByTitle(SearchText));
  // $('h1').addClass('headingtext');
  // BELOW IS TO REMOVE PREVIOUS SEARCH RESULTS BEFORE DISPLAYING NEW ONES
$('.track-container').empty();
});
// THE CODE BELOW IS A KEYUP EVENT HANDLER FOR THE ENTER BUTTON
$('#search_input').keyup(function(event){
  if(event.which == 13){
  var SearchText = $('#search_input').val();
  $(Trackster.searchTracksByTitle(SearchText));
  // $('h1').addClass('headingtext');
  // BELOW IS TO REMOVE PREVIOUS SEARCH RESULTS BEFORE DISPLAYING NEW ONES
$('.track-container').empty();
}});

var Trackster = {};




/*
  Given an array of track data, loop thru the returned API request data  of tracks
  and the information stored for track name, artist, video, listeners & album art
*/
Trackster.renderTracks = function(tracks) {
 var name, artist, imageURL, listeners;

 for(var i=0; i< tracks.length; i++){
   trackURL = tracks[i].url;
   name = tracks[i].name;
   artist = tracks[i].artist;
   imageURL = mediumAlbumArt;
   listeners = tracks[i].listeners;
// CODE BELOW IS A VARIABLE USED FOR READABILITY
   var mediumAlbumArt= tracks[i].image[1]['#text'];

// CODE BELOW IS A VARIABLE USED TO STORE THE HTML
// STRUCTURE THE DATA VALUES FROM THE TRACKS FOR LOOP ARE PLUGGED INTO
   var resultTable=
    '<div class="row">' +
      '<div class="container-fluid track-container" id="track-container">' +
         '<div class="col-xs-2" title="play button">' +
           '<a href='+ trackURL + '><i class="fas fa-play-circle"></i></a>' +
         '</div>' +
        '<div class="col-xs-4">' + name + '</div>' +
        '<div class="col-xs-2">' + artist + '</div>' +
        '<div class="col-xs-2">' + '<a href=' + mediumAlbumArt + '><i class="fas fa-photo-video"></i></a>'+ '</div>' +
        '<div class="col-xs-2">' + listeners + '</div>' +
    '</div>';

   // The code below will Append each "row" or track to the track-container in the body to display all tracks.
      $('#track-container').append(resultTable);
 }
};

/*
  Given a search term as a string, the code below will query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(SearchText) {
  $.ajax( {
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + SearchText + '&api_key=' + API_KEY + '&format=json',
    datatype: 'jsonp',
    success: function(data) {
      console.log(data);
      $('h1').toggleClass('headingtext');
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });

};
});
