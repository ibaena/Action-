$(document).ready(function(){
//Image Error check and replacement with selected image  
function replaceBrokenImages(){
  $("img").error(function () {
    $(this).unbind("error").attr("src", "images/no-poster.png");
  });
}  
  //Will Pull Lst of top rated tv shows to go though listed in side nav
  function topRatedtelevison() {
    var topRatedTvUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
    var page = 1;
    var genre;

    $('#top-tv').on('click', function() {
      $.getJSON(topRatedTvUrl, function(data) {
        genre = data.results;
        genreContent = " ";

        for (var i = 0; i < genre.length; i++) {
          genreContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + genre[i].name + '<span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + genre[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + genre[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + genre[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';

        }
        $('.content').html(genreContent).hide().fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="toprated-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="toprated-addbtn"><i class="material-icons">skip_next</i></a>');
        replaceBrokenImages();
      });
    });

    //next page
    $('#next-btn').on('click', '#toprated-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;

      $.getJSON(topRatedTvUrl+page, function(data) {
        genre = data.results;
        genreContent = " ";

        for (var i = 0; i < genre.length; i++) {
          genreContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + genre[i].name + '<span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + genre[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + genre[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + genre[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(genreContent).hide().fadeIn(400);
        replaceBrokenImages();
      });
    });
    //Previous Button
    $('#previous-btn').on('click', '#toprated-backbtn', function(e) {
      e.preventDefault();
      page = page - 1;

      $.getJSON(topRatedTvUrl+page, function(data) {
        genre = data.results;
        genreContent = " ";

        for (var i = 0; i < genre.length; i++) {
          genreContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + genre[i].name + '<span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + genre[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + genre[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + genre[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(genreContent).hide().fadeIn(400);
        replaceBrokenImages();
      });
    });
  }
  topRatedtelevison();

  //Generating A list of Popular Television shows
  function popularTelevison() {
    var popularList = 'https://api.themoviedb.org/3/tv/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
    var page = 1;
    var popular;

    $('#popular-tv').on('click', function() {
      $.getJSON(popularList, function(data) {
        popular = data.results;
        popularContent = '';

        for (var i = 0; i < popular.length; i++) {
          popularContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popular[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + popular[i].name + '<span class="tv-plot right align">' + popular[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + popular[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + popular[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + popular[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(popularContent).hide().fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="popular-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="popular-addbtn"><i class="material-icons">skip_next</i></a>');
        replaceBrokenImages();
      });
    });

    //next page
    $('#next-btn').on('click', '#popular-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      popularContent = " ";

      $.getJSON(popularList+page, function(data) {
        popular = data.results;

        for (var i = 0; i < popular.length; i++) {
          popularContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popular[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + popular[i].name + '<span class="tv-plot right align">' + popular[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + popular[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + popular[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + popular[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(popularContent).hide().fadeIn(400);
        replaceBrokenImages();
      });
    });
    //Previous Button
    $('#previous-btn').on('click', '#popular-backbtn', function(e) {
      e.preventDefault();
      page = page - 1;
      popularContent = " "

      $.getJSON(popularList+page, function(data) {
        popular = data.results;

        for (var i = 0; i < popular.length; i++) {
          popularContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popular[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + popular[i].name + '<span class="tv-plot right align">' + popular[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + popular[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + popular[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + popular[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(popularContent).hide().fadeIn(400);
        replaceBrokenImages();
      });
    });
  }
  popularTelevison();

});