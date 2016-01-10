var discoverContent;
var releaseContent;
var genreContent;
var popularContent;
var tvList;
var movieContent;
var popMovieContent;
var topMovieContent;
var tvPage;
var imageUrl = 'https://image.tmdb.org/t/p/w500';
var movieIdGenreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3729ffa22dfa780e9abb43dee3074695';
var genreTvUrl = 'https://api.themoviedb.org/3/genre/tv/list?api_key=3729ffa22dfa780e9abb43dee3074695';
var tvGenreList = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&with_genres=';
var genreMovieList = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3729ffa22dfa780e9abb43dee3074695';
var movieListUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&with_genres=';
var page = 1;
var addMovieGenre = [];
var addMovieListName;
var trailerMovieId;
var modalContent = " ";

$(document).ready(function() {

  //Side nav initialiazed
  $("#searchDropdown").sideNav();
  $("#slide-out").on('click','.genre-tv,#popular-tv, #top-tv', function() {
    $("#searchDropdown").sideNav('hide');
  });
  $("#movies").sideNav();
  $("#slide-out1").on('click', '.genre-movie,#popular-movie, #top-movie', function() {
    $("#searchDropdown").sideNav('hide');
  });
  //error check images urls and replace broken images with selected images
  function replaceBrokenImages(){
  $("img").error(function () {
    $(this).unbind("error").attr("src", "images/no-poster.png");
  });
}
//iframe on exit stop
jQuery(function () {
  jQuery().on("click", function () {
    jQuery('iframe').contents().find('video').each(function () {
      this.currentTime = 0;
      this.pause();
    });
  });
});

 
  //Generating a List of movies based on genre chosen
  function popularMoviesBuilder() {
    var popMovieList = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
    var page = 1;
    var popMovie;

    $('#popular-movie').on('click', function() {
      $.getJSON(popMovieList, function(data) {
        popMovie = data.results;
        popMovieContent = '';
        for (var i = 0; i < popMovie.length; i++) {
          popMovieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + popMovie[i].title + '<span class="tv-plot right align">' + popMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + popMovie[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + popMovie[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + popMovie[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(popMovieContent).hide().fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="popmovie-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="popmovie-addbtn"><i class="material-icons">skip_next</i></a>');
        replaceBrokenImages();
         $('.tv-plot').addClass('.hide-on-small-only')
      });
    });

    //next page
    $('#next-btn').on('click', '#popmovie-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      popMovieContent = " "

      $.getJSON(popMovieList + page, function(data) {
        popMovie = data.results;

        for (var i = 0; i < popMovie.length; i++) {

          popMovieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + popMovie[i].title + '<span class="tv-plot right align">' + popMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + popMovie[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + popMovie[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + popMovie[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(popMovieContent).hide().fadeIn(400);
      });
    });
    //Previous Button
    $('#previous-btn').on('click', '#popmovie-backbtn', function(e) {
      e.preventDefault();
      page = page - 1;
      popMovieContent = " ";
      $.getJSON(popMovieList + page, function(data) {
        popMovie = data.results;

        for (var i = 0; i < popMovie.length; i++) {

          popMovieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + popMovie[i].title + '<span class="tv-plot right align">' + popMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + popMovie[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + popMovie[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + popMovie[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(popMovieContent).hide().fadeIn(400);
        replaceBrokenImages();
      });
    });
  }
  popularMoviesBuilder();

  //Generating a List of top rated movies and display to html in card format
  function topMoviesBuilder() {
    var topMovieList = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
    var page = 1;
    var topMovie;

    $('#top-movie').on('click', function() {
      $.getJSON(topMovieList, function(data) {
        topMovie = data.results;
        topMovieContent = ' ';
        for (var i = 0; i < topMovie.length; i++) {
          topMovieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + topMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + topMovie[i].title + '<span class="tv-plot right align">' + topMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + topMovie[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + topMovie[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + topMovie[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(topMovieContent).hide().fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="topmovie-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="topmovie-addbtn"><i class="material-icons">skip_next</i></a>');
        replaceBrokenImages();
      });
    });

    //next page
    $('#next-btn').on('click', '#topmovie-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      $.getJSON(topMovieList+page, function(data) {
        topMovie = data.results;
        topMovieContent = " ";
        for (var i = 0; i < topMovie.length; i++) {
          topMovieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + topMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + topMovie[i].title + '<span class="tv-plot right align">' + topMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + topMovie[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + topMovie[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + topMovie[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(topMovieContent).hide().fadeIn(400);
        replaceBrokenImages();
      });
    });
    //Previous Button
    $('#previous-btn').on('click', '#topmovie-backbtn', function(e) {
      e.preventDefault();
      page = page - 1;
      $.getJSON(topMovieList + page, function(data) {
        topMovie = data.results;
        topMovieContent = " ";
        for (var i = 0; i < popMovie.length; i++) {
          topMovieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + topMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + topMovie[i].title + '<span class="tv-plot right align">' + topMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text reveal">' + topMovie[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + topMovie[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + topMovie[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(topMovieContent).hide().fadeIn(400);
        replaceBrokenImages();
      });
    });
  }
  topMoviesBuilder();
});