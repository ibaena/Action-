$(document).ready(function () {

  $(".input-field").keypress(function (e) {
    // variables for url construction
    var today =;
    var apiKey = "3pc86f2jfnwqg359td2p3vwr";
    var zipCode = $("#zip").val();
    var mileEntry = $("#radius").val();
    var showtimesUrl = "http://data.tmsapi.com/v1.1";
    showtimesUrl += "/movies/showings?";
    showtimesUrl += "startDate=" + "2016-01-07";
    showtimesUrl += "&zip=" + zipCode;
    showtimesUrl += "&radius=" + mileEntry + "&units=mi";
    showtimesUrl += "&api_key=" + apiKey;
    

    if (e.which == 13) {
      $.ajax({
        type: "GET",
        url: showtimesUrl,
        success: (function (data) {
          console.log(data);
        })
      });
    };
  
  }); 
});