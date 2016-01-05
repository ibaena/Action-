
var discoverContent = " ";
var releaseContent = " ";
var genreContent = " ";
var popularContent = " ";
var tvList = " ";
var tvGenre;
var movieGenre;
var imageUrl = 'https://image.tmdb.org/t/p/w500';
var genreTvUrl = 'https://api.themoviedb.org/3/genre/tv/list?api_key=3729ffa22dfa780e9abb43dee3074695';
var tvGenreList = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&with_genres=';
var genreMovieUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3729ffa22dfa780e9abb43dee3074695'
var movieGenreList = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&with_genres='



$(document).ready(function() {
//Side nav initialiazed
  $(".button-collapse").sideNav();
//collapasible for plot descriptions initialized
  $('.content').on('click','.collapsible-header',function(){
  $('.collapsible').collapsible({
      accordion : false 
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
            if(searchEngine[i].backdrop_path === null){
              imageUrl = '';
              searchEngine[i].backdrop_path = 'images/no-poster.png';
            }
            if(searchEngine[i].name !== undefined){
               grid +='<div class="col s6">\
                        <div class="card">\
                          <div class="card-image">\
                            <img class="responsive-img poster" src="'+searchEngine[i].backdrop_path +'" />\
                          </div>\
                        </div>\
                        <ul class="collapsible" data-collapsible="accordion">\
                          <li>\
                            <div class="collapsible-header">' + searchEngine[i].name +'<span class="tv-plot right align">'+searchEngine[i].vote_average+'<i class="tiny material-icons">grade</i></span>\
                            </div>\
                            <div class="collapsible-body">\
                              <p>'+searchEngine[i].overview+'</p>\
                              <p>'+searchEngine[i].genre_ids+'</p>\
                            </div>\
                          </li>\
                        </ul>\
                    </div>';
              console.log(searchEngine[i]);
            }
            else{
               grid +='<div class="col s6">\
                        <div class="card">\
                          <div class="card-image">\
                            <img class="responsive-img poster" src="' + imageUrl + '' + searchEngine[i].backdrop_path + '" />\
                          </div>\
                        </div>\
                        <ul class="collapsible" data-collapsible="accordion">\
                          <li>\
                            <div class="collapsible-header">' + searchEngine[i].title +'<span class="tv-plot right align">'+searchEngine[i].vote_average+'<i class="tiny material-icons">grade</i></span>\
                            </div>\
                            <div class="collapsible-body">\
                              <p>'+searchEngine[i].overview+'</p>\
                              <p>'+searchEngine[i].genre_ids+'</p>\
                            </div>\
                          </li>\
                        </ul>\
                      </div>';
            }
          }
          $('.content').html(grid).hide().fadeIn(400);
        });
      }
    });
  }
  searchItems();

//Building Television Genre List in sideNav, implmenting a on click event on genre names that will load a list of movies based on their genre 
function buildTvGenrelist(){
  $.getJSON(genreTvUrl, function(data){
    var genreNames =  data.genres;
    var page = 1;
      for (var i = 0; i < genreNames.length; i++) {
        tvGenre += '<li><a href="" class="genre-tv" value ='+genreNames[i].id+'>'+genreNames[i].name+'</a></li>';
      };
  $('.side-nav').append(tvGenre);
  $('.genre-tv').on('click',function(e){
    e.preventDefault();
    var genreId = $(this).attr("value");
      $.getJSON(tvGenreList+genreId,function(data){
        var sortTv = data.results;
         for (var i = 0; i < sortTv.length; i++) {
          if(sortTv[i].backdrop_path === null){
              imageUrl = '';
              sortTv[i].backdrop_path = 'images/no-poster.png';
            }
        //console.log(genre[i].name); 
          tvList += '<div class="col s6">\
                      <div class="card">\
                        <div class="card-image">\
                          <img class="responsive-img poster" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                        </div>\
                      </div>\
                      <ul class="collapsible" data-collapsible="accordion">\
                        <li>\
                            <div class="collapsible-header">' + sortTv[i].name + ' <span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                              <div class="collapsible-body">\
                                <p>' + sortTv[i].overview + '</p>\
                                <p>' + sortTv[i].genre_ids + '</p>\
                              </div>\
                        </li>\
                      </ul>\
                    </div>';
      };
      $('.content').html(tvList).hide().fadeIn(400);
      $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="genrepages-backbtn"><i class="material-icons">skip_previous</i></a>');
      $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="genrepages-addbtn"><i class="material-icons">skip_next</i></a>');
      
});
   
//next page
              $('#next-btn').on('click', '#genrepages-addbtn', function(e) {
                e.preventDefault();
                page = page + 1;
                var tvGenre = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page+'&with_genres=' + genreId;

                $.getJSON(tvGenre, function(data) {
                  sortTv = data.results;

                  for (var i = 0; i < sortTv.length; i++) {
                    if(sortTv[i].backdrop_path === null){
                      imageUrl = '';
                      searchEngine[i].backdrop_path = 'images/no-poster.png';
                    }

                    tvList += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + sortTv[i].name + ' <span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + sortTv[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
                  }
                  $('.content').html(tvList).hide().fadeIn(400);


                });

              });
              //Previous Button
              $('#previous-btn').on('click', '#genrepages-backbtn', function(e) {
                e.preventDefault();
                page = page + 1;
                genreContent = " ";

                tvGenre = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page+'&with_genres=' + genreId;

                $.getJSON(tvGenre, function(data) {
                  genre = data.results;

                  for (var i = 0; i < genre.length; i++) {
                    if(sortTv[i].backdrop_path === null){
                      imageUrl = '';
                      searchEngine[i].backdrop_path = 'images/no-poster.png';
                    }

                    tvList += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + imageUrl+ '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + sortTv[i].name + ' <span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + sortTv[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
                  }
                  $('.content').html(tvList).hide().fadeIn(400);
                   })
                });
 });
});
}
   buildTvGenrelist();

//Will Pull Lst of top rated tv shows to go though listed in side nav
function topRatedtelevison() {
  var topRatedTvUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
  var page = 1;
  var genre;
  var genreMinfo = " ";

  $('#top-tv').on('click', function() {
    genreList = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695';
    $.getJSON(topRatedTvUrl, function(data) {
      genre = data.results;
      //console.log(genre);

      for (var i = 0; i < genre.length; i++) {
        //console.log(genre[i].name);

        genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
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
                           $('.content').html(genreContent).hide().fadeIn(400);
      }
      $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="toprated-backbtn"><i class="material-icons">skip_previous</i></a>');
      $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="toprated-addbtn"><i class="material-icons">skip_next</i></a>');


    });
  });

  //next page
  $('#next-btn').on('click', '#toprated-addbtn', function(e) {
    e.preventDefault();
    page = page + 1;
    var topRatedTvPageUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;
    genreContent = " "

    $.getJSON(genreList, function(data) {
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {

        genreContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
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
                                  <img class="responsive-img poster" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
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

//Generating A list of Popular Television shows
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
                                  <img class="responsive-img poster" src="' + imageUrl + '' + popular[i].backdrop_path + '" />\
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
                                  <img class="responsive-img poster" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
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
                                  <img class="responsive-img poster" src="' + imageUrl + '' + genre[i].backdrop_path + '" />\
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
          releaseContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + imageUrl + '' + release[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + release[i].title + ' <span class="tv-plot right align">' + release[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + release[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
        }
        $('.content').html(releaseContent).hide().fadeIn(400);

      });

    });

  }
  moviesOut();

  //Generate Movie Genre List in side nav and then add on click to load list of movies with desired genre

  function discoverContentCall() {
    $.getJSON(genreMovieUrl, function(data){
    var movieGenreNames =  data.genres;
    var page = 1;
      for (var i = 0; i < movieGenreNames.length; i++) {
        tvGenre += '<li><a href="" class="genre-tv" value ='+movieGenreNames[i].id+'>'+movieGenreNames[i].name+'</a></li>';
      };
  $('.side-nav').append(tvGenre);

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
            discoverContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + imageUrl + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span><p>Score:<p>/div></div></div>';
          } else {
            discoverContent = '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + imageUrl + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span></div></div></div>';
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

          discoverContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + imageUrl + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span></div></div></div>';
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

          discoverContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + imageUrl + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span></div></div></div>';
        }
        $('.content').hide().html(discoverContent).fadeIn(400);
      });
    });
    });
  }
  discoverContentCall();





});

