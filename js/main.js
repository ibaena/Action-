var discoverContent;
var releaseContent;
var genreContent;
var popularContent;
var tvList;
var movieContent;
var popMovieContent;
var topMovieContent;
var imageUrl = 'https://image.tmdb.org/t/p/w500';
var genreTvUrl = 'https://api.themoviedb.org/3/genre/tv/list?api_key=3729ffa22dfa780e9abb43dee3074695';
var tvGenreList = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&with_genres=';
var genreMovieList = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3729ffa22dfa780e9abb43dee3074695'
var movieListUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&with_genres='
var page = 1;



$(document).ready(function() {
  //Side nav initialiazed
  $("#searchDropdown").sideNav();
  $("#slide-out").on('click', '.genre-tv,#popular-tv, #top-tv', function() {
    $("#searchDropdown").sideNav('hide');
  });
  $("#movies").sideNav();
  $("#slide-out1").on('click', '.genre-movie,#popular-movie, #top-movie', function() {
    $("#searchDropdown").sideNav('hide');
  });
  //collapasible for plot descriptions initialized
  $('.content').on('click', '.collapsible-header', function() {
    $('.collapsible').collapsible({
      accordion: false
    });
  });

  //Search Engine user can input movie name, actor, or tv show name. Results will return title, rating, image , and plot.
  function searchItems() {
    $('#search-input').keypress(function(e) {
      var input = $('#search-input').val();
      var plotUrl = 'https://api.themoviedb.org/3/search/multi?api_key=3729ffa22dfa780e9abb43dee3074695&query=' + input;

      var searchEngine;
      var grid = " ";

      if (e.which == 13) {
        $.getJSON(plotUrl, function(data) {
          searchEngine = data.results;

          for (var i = 0; i < searchEngine.length; i++) {
            if (searchEngine[i].backdrop_path === null) {
              imageUrl = '';
              searchEngine[i].backdrop_path = 'images/no-poster.png';
            }
            if (searchEngine[i].name !== undefined) {
              grid += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + searchEngine[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + searchEngine[i].name + '<span class="tv-plot right align">' + searchEngine[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + searchEngine[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + searchEngine[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + searchEngine[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
              console.log(searchEngine[i]);
            } else {
              grid += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + searchEngine[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + searchEngine[i].title + '<span class="tv-plot right align">' + searchEngine[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + searchEngine[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + searchEngine[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + searchEngine[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
            }
          }
          $('.content').html(grid).hide().fadeIn(400);
        });
      }
    });
  }
  searchItems();

  //Build TV genre List
  $.getJSON(genreTvUrl, function(data) {
    var genreNames = data.genres;
    var tvGenre = " ";
    for (var i = 0; i < genreNames.length; i++) {
      tvGenre += '<li><a href="" class="genre-tv" value =' + genreNames[i].id + '>' + genreNames[i].name + '</a></li>';
    };
    $('#slide-out').append(tvGenre);
  });

  //Building Television Genre List in sideNav, implmenting a on click event on genre names that will load a list of movies based on their genre 
  function buildTvGenrelist() {
    $('#slide-out').on('click', '.genre-tv', function(e) {
      e.preventDefault();
      var genreId = $(this).attr("value");
      console.log(genreId);
      $.getJSON(tvGenreList + genreId, function(data) {
        var sortTv = data.results;
        tvList = " ";
        for (var i = 0; i < sortTv.length; i++) {
          if (sortTv[i].backdrop_path === null) {
            imageUrl = '';
            sortTv[i].backdrop_path = 'images/no-poster.png';
          }
          //console.log(genre[i].name); 
          tvList += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + sortTv[i].name + '<span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + sortTv[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + sortTv[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + sortTv[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(tvList).hide().fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="genrepages-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="genrepages-addbtn"><i class="material-icons">skip_next</i></a>');

      });
      //next page
      $('#next-btn').on('click', '#genrepages-addbtn', function(e) {
        e.preventDefault();
        page = page + 1;
        var tvGenre = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&with_genres=' + genreId + '&page=' + page;

        $.getJSON(tvGenre, function(data) {
          sortTv = data.results;
          tvList = " ";

          for (var i = 0; i < sortTv.length; i++) {
            if (sortTv[i].backdrop_path === null) {
              imageUrl = '';
              sortTv[i].backdrop_path = 'images/no-poster.png';
            }

            tvList += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + sortTv[i].name + '<span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + sortTv[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + sortTv[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + sortTv[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
          }
          $('.content').html(tvList).hide().fadeIn(400);


        });

      });
      //Previous Button
      $('#previous-btn').on('click', '#genrepages-backbtn', function(e) {
        e.preventDefault();
        page = page - 1;
        tvGenre = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page + '&with_genres=' + genreId;

        $.getJSON(tvGenre, function(data) {
          genre = data.results;
          tvList = " ";

          for (var i = 0; i < genre.length; i++) {
            if (sortTv[i].backdrop_path === null) {
              imageUrl = '';
              searchEngine[i].backdrop_path = 'images/no-poster.png';
            }

            tvList += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + sortTv[i].name + '<span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + sortTv[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + sortTv[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + sortTv[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
          }
          $('.content').html(tvList).hide().fadeIn(400);
        })
      });

    });
  }
  buildTvGenrelist();

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
          if (genre[i].backdrop_path === null) {
            imageUrl = '';
            genre[i].backdrop_path = 'images/no-poster.png';
          }

          genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + genre[i].name + '<span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });
    });

    //next page
    $('#next-btn').on('click', '#toprated-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      var topRatedTvPageUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;


      $.getJSON(topRatedTvPageUrl, function(data) {
        genre = data.results;
        genreContent = " ";

        for (var i = 0; i < genre.length; i++) {
          if (genre[i].backdrop_path === null) {
            imageUrl = '';
            genre[i].backdrop_path = 'images/no-poster.png';
          }

          genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + genre[i].name + '<span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });

    });
    //Previous Button
    $('#previous-btn').on('click', '#toprated-backbtn', function(e) {
      e.preventDefault();
      page = page - 1;
      var topRatedTvPageUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;


      $.getJSON(topRatedTvPageUrl, function(data) {
        genre = data.results;
        genreContent = " ";

        for (var i = 0; i < genre.length; i++) {
          if (genre[i].backdrop_path === null) {
            imageUrl = '';
            genre[i].backdrop_path = 'images/no-poster.png';
          }

          genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + genre[i].name + '<span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
          if (popular[i].backdrop_path === null) {
            imageUrl;
            popular[i].backdrop_path = 'images/no-poster.png';
          }

          popularContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popular[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + popular[i].name + '<span class="tv-plot right align">' + popular[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });
    });

    //next page
    $('#next-btn').on('click', '#popular-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      popularList = 'https://api.themoviedb.org/3/tv/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;
      popularContent = " ";

      $.getJSON(popularList, function(data) {
        popular = data.results;

        for (var i = 0; i < popular.length; i++) {
          if (popular[i].backdrop_path === null) {
            imageUrl = '';
            popular[i].backdrop_path = 'images/no-poster.png';
          }

          popularContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popular[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + popular[i].name + '<span class="tv-plot right align">' + popular[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });

    });
    //Previous Button
    $('#previous-btn').on('click', '#popular-backbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      popularList = 'https://api.themoviedb.org/3/tv/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;
      popularContent = " "

      $.getJSON(popularList, function(data) {
        popular = data.results;

        for (var i = 0; i < popular.length; i++) {
          if (popular[i].backdrop_path === null) {
            imageUrl = '';
            popular[i].backdrop_path = 'images/no-poster.png';
          }

          popularContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popular[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + popular[i].name + '<span class="tv-plot right align">' + popular[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });

    });

  }
  popularTelevison();

  //Generate a List of movies currently out in theatre this list will update daily
  function moviesOut() {

    var movieList = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3729ffa22dfa780e9abb43dee3074695&query';
    var release;
    $('#release').on('click', function(e) {
      e.preventDefault();
      $.getJSON(movieList, function(data) {
        release = data.results;
        releaseContent = " ";

        for (var i = 0; i < release.length; i++) {
          //console.log(release[i].title);
          releaseContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + release[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + release[i].title + '<span class="tv-plot right align">' + release[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + release[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + release[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + release[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(releaseContent).hide().fadeIn(400);

      });

    });

  }
  moviesOut();

  //Build Movie Genre List dispplay to side nav
  $.getJSON(genreMovieList, function(data) {
    var genreMovies = data.genres;
    var movieGenre = " ";
    for (var i = 0; i < genreMovies.length; i++) {
      movieGenre += '<li><a href="" class="genre-movie" value =' + genreMovies[i].id + '>' + genreMovies[i].name + '</a></li>';
    };
    $('#slide-out1').append(movieGenre);
  });


  //discover  Movie List generate
  function discoverContentCall() {
    var page = 1;
    $('#slide-out1').on('click', '.genre-movie', function(e) {
      e.preventDefault();
      var movieId = $(this).attr("value");
      $.getJSON(movieListUrl + movieId, function(data) {
        var sortMovie = data.results;
        movieContent = " ";
        console.log(sortMovie);
        for (var i = 0; i < sortMovie.length; i++) {
          if (sortMovie[i].backdrop_path === null) {
            imageUrl = '';
            sortMovie[i].backdrop_path = 'images/no-poster.png';
          }
          movieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + sortMovie[i].title + '<span class="tv-plot right align">' + sortMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + sortMovie[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + sortMovie[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + sortMovie[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        }
        $('.content').html(movieContent).hide().fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="moviepages-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="moviepages-addbtn"><i class="material-icons">skip_next</i></a>');
      });
      //next page
      $('#next-btn').on('click', '#moviepages-addbtn', function(e) {
        e.preventDefault();
        page = page + 1;

        $.getJSON(movieListUrl + movieId + '&page=' + page, function(data) {
          var movieLoad = data.results;
          movieContent = " ";

          for (var i = 0; i < movieLoad.length; i++) {

            movieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + movieLoad[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + movieLoad[i].title + '<span class="tv-plot right align">' + movieLoad[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + movieLoad[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + movieLoad[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + movieLoad[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
          }
          $('.content').html(movieContent).hide().fadeIn(400);
        });

      });
      //Previous Button
      $('#previous-btn').on('click', '#moviepages-backbtn', function(e) {
        e.preventDefault();
        page = page - 1;

        moviePage = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page + '&with_genres=' + movieId;

        $.getJSON(moviePage, function(data) {
          var movieLoad = data.results;
          movieContent = " ";

          for (var i = 0; i < movieLoad.length; i++) {

            movieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + movieLoad[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + movieLoad[i].title + '<span class="tv-plot right align">' + movieLoad[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + movieLoad[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + movieLoad[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + movieLoad[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
          }
          $('.content').html(movieContent).hide().fadeIn(400);
        });
      });
    });


  }
  discoverContentCall();

  //Generating a List of movies based on genre chosen
  function popularMoviesBuilder() {
    var popMovieList = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
    var page = 1;
    var popMovie;

    $('#popular-movie').on('click', function() {
      $.getJSON(popMovieList, function(data) {
        popMovie = data.results;
        popMovieContent = '';
        //console.log(genre);

        for (var i = 0; i < popMovie.length; i++) {
          //console.log(genre[i].name);

          popMovieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + popMovie[i].title + '<span class="tv-plot right align">' + popMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });
    });

    //next page
    $('#next-btn').on('click', '#popmovie-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      popMovieList = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
      popMovieContent = " "

      $.getJSON(popMovieList + page, function(data) {
        popMovie = data.results;

        for (var i = 0; i < popMovie.length; i++) {

          popMovieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + popMovie[i].title + '<span class="tv-plot right align">' + popMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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

      popMovieList = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=';

      $.getJSON(popMovieList + page, function(data) {
        popMovie = data.results;

        for (var i = 0; i < popMovie.length; i++) {

          popMovieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + popMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + popMovie[i].title + '<span class="tv-plot right align">' + popMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
        //console.log(genre);

        for (var i = 0; i < topMovie.length; i++) {
          //console.log(genre[i].name);

          topMovieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + topMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + topMovie[i].title + '<span class="tv-plot right align">' + topMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });
    });

    //next page
    $('#next-btn').on('click', '#topmovie-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      topMovieList = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=';

      $.getJSON(topMovieList, function(data) {
        topMovie = data.results;
        topMovieContent = " ";

        for (var i = 0; i < topMovie.length; i++) {

          topMovieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + topMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + topMovie[i].title + '<span class="tv-plot right align">' + topMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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


      });

    });
    //Previous Button
    $('#previous-btn').on('click', '#topmovie-backbtn', function(e) {
      e.preventDefault();
      page = page - 1;

      topMovieList = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=';

      $.getJSON(topMovieList + page, function(data) {
        topMovie = data.results;

        for (var i = 0; i < popMovie.length; i++) {
          topMovieContent = " ";
          topMovieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + topMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 flow-text">' + topMovie[i].title + '<span class="tv-plot right align">' + topMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
      });

    });

  }
  topMoviesBuilder();









});