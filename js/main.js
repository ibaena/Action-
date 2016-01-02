
var discoverContent;
var releaseContent = " ";
var genreContent = " ";
var popularContent = " ";
var tvList = " ";
var discoverImage = 'https://image.tmdb.org/t/p/w500';

$(document).ready(function() {
  $(".button-collapse").sideNav();

//enables coallpasible for plot descriptions
$('.content').on('click','.collapsible-header',function(){
$('.collapsible').collapsible({
      accordion : false 
    });
});

  //tmdb
  function tmdbApi() {
    $('#search-input').keypress(function(e) {
      var input = $('#search-input').val();
      var plotUrl = 'https://api.themoviedb.org/3/search/multi?api_key=3729ffa22dfa780e9abb43dee3074695&query=' + input;

      var movie;
      var grid = " ";

      if (e.which == 13) {
        $.getJSON(plotUrl, function(data) {
          movie = data.results;

          for (var i = 0; i < movie.length; i++) {
            grid += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + discoverImage + '' + movie[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + movie[i].name +' <span class="tv-plot right align">'+movie[i].vote_average+'<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body">\
                                      <p>'+movie[i].overview+'</p>\
                                      <p>'+movie[i].genre_ids+'</p>\
                                    </div>\
                                  </li>\
                                </ul>\
                          </div>';
            //console.log(movie[i]);
          }

          $('.content').html(grid).hide().fadeIn(400);;

        });
      }
    });

  }
  tmdbApi();

  /*tv Genre List reference
     $.getJSON('https://api.themoviedb.org/3/genre/tv/list?api_key=3729ffa22dfa780e9abb43dee3074695', function(data){
            var names =  data.genres;
            console.log(names)

           });*/

//Will Pull Lst of top rated tv shows to go though
function topRatedtelevison() {
  var genreList = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
  var page = 1;
  var genre;
  var genreMinfo = " ";

  $('#top-tv').on('click', function() {
    $.getJSON(genreList, function(data) {
      genre = data.results;
      //console.log(genre);

      for (var i = 0; i < genre.length; i++) {
        //console.log(genre[i].name);

        genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + genre[i].name + ' <span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body">\
                                      <p>' + genre[i].overview + '</p>\
                                      <p>' + genre[i].genre_ids + '</p>\
                                    </div>\
                                  </li>\
                                </ul>\
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
    genreList = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;
    genreContent = " "

    $.getJSON(genreList, function(data) {
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {

        genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + genre[i].name + ' <span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + genre[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
      }
      $('.content').html(genreContent).hide().fadeIn(400);


    });

  });
  //Previous Button
  $('#previous-btn').on('click', '#toprated-backbtn', function(e) {
    e.preventDefault();
    page = page - 1;
    genreContent = " ";

    genreUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;

    $.getJSON(genreUrl, function(data) {
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {

        genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + genre[i].name + ' <span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + genre[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
      }
      $('.content').html(genreContent).hide().fadeIn(400);
    });

  });

}
topRatedtelevison();

//Will Pull Lst of Popular tv shows to go though
function popularTelevison() {
  var popularList = 'https://api.themoviedb.org/3/tv/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
  var page = 1;
  var popular;

  $('#popular-tv').on('click', function() {
    $.getJSON(popularList, function(data) {
      popular = data.results;
      //console.log(genre);

      for (var i = 0; i < popular.length; i++) {
        //console.log(genre[i].name);

        popularContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + discoverImage + '' + popular[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + popular[i].name + ' <span class="tv-plot right align">' + popular[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body">\
                                      <p>' + popular[i].overview + '</p>\
                                      <p>' + popular[i].genre_ids + '</p>\
                                    </div>\
                                  </li>\
                                </ul>\
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
    genreList = 'https://api.themoviedb.org/3/tv/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;
    genreContent = " "

    $.getJSON(genreList, function(data) {
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {

        genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + genre[i].name + ' <span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + genre[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
      }
      $('.content').html(genreContent).hide().fadeIn(400);


    });

  });
  //Previous Button
  $('#previous-btn').on('click', '#popular-backbtn', function(e) {
    e.preventDefault();
    page = page - 1;
    genreContent = " ";

    genreUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;

    $.getJSON(genreUrl, function(data) {
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {

        genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + genre[i].name + ' <span class="tv-plot right align">' + genre[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + genre[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
      }
      $('.content').html(genreContent).hide().fadeIn(400);
    });

  });

}
popularTelevison();

  //create Theatre list
  function moviesOut() {

    var movieList = 'http://api.themoviedb.org/3/movie/now_playing?api_key=3729ffa22dfa780e9abb43dee3074695&query';
    var release;
    $('#release').on('click', function(e) {
      e.preventDefault();
      $.getJSON(movieList, function(data) {
        release = data.results;

        for (var i = 0; i < release.length; i++) {
          //console.log(release[i].title);
          releaseContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + release[i].backdrop_path + '" /><span class="card-title">' + release[i].title + '</span></div></div></div>';
        }
        $('.content').html(releaseContent).hide().fadeIn(400);

      });

    });

  }
  moviesOut();

  //discover  Movie List generate

  function discoverContentCall() {
    var discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
    var page = 1;
    var discover;
    var discoverImage = 'http://image.tmdb.org/t/p/w500';


    $('#discover').on('click', function(e) {
      e.preventDefault();


      $.getJSON(discoverUrl, function(data) {
        discover = data.results;
        console
       
        for (var i = 0; i < discover.length; i++) {
          if (typeof(discoverContent) != 'undefined') {
            discoverContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span><p>Score:<p>/div></div></div>';
          } else {
            discoverContent = '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span></div></div></div>';
          }
        }
        $('.content').hide().html(discoverContent).fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="discover-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="discover-addbtn"><i class="material-icons">skip_next</i></a>');
      });
    });
    //next page button
    $('#next-btn').on('click', '#discover-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      discoverContent = "";
      discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page=' +page+'&media_type=movie';

      $.getJSON(discoverUrl, function(data) {
        discover = data.results;

        for (var i = 0; i < discover.length; i++) {

          discoverContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span></div></div></div>';
        }
        $('.content').hide().html(discoverContent).fadeIn(400);
      });

    });
    //Previous page Button
    $('#previous-btn').on('click', '#discover-backbtn', function(e) {
      e.preventDefault();
      discoverContent = "";
      page = page - 1;

      discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page+'&media_type=movie';

      $.getJSON(discoverUrl, function(data) {
        discover = data.results;

        for (var i = 0; i < discover.length; i++) {

          discoverContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span></div></div></div>';
        }
        $('.content').hide().html(discoverContent).fadeIn(400);
      });


    });
  }
  discoverContentCall();





});

