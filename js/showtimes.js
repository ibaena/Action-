$(document).ready(function () {
  // variables for url construction
  var apiKey = "3pc86f2jfnwqg359td2p3vwr";
  var url = "http://data.tmsapi.com/v1.1";
  var showtimesUrl = url + '/movies/showings';
  var zipCode = $('#zip').val();

  $.ajax({
    url: showtimesUrl,

  })
});