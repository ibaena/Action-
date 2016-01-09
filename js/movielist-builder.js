$(document).ready(function(){
//Image Error check and replacement with selected image  
function replaceBrokenImages(){
  $("img").error(function () {
    $(this).unbind("error").attr("src", "images/no-poster.png");
  });
}  
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
        for (var i = 0; i < sortMovie.length; i++) {
          movieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortMovie[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + sortMovie[i].title + '<span class="tv-plot right align">' + sortMovie[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
        replaceBrokenImages();
      });
      //next page
      $('#next-btn').on('click', '#moviepages-addbtn', function(e) {
        e.preventDefault();
        page = page + 1;
        moviePage = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page + '&with_genres=' + movieId;
        $.getJSON(movieListUrl + movieId + '&page=' + page, function(data) {
          var movieLoad = data.results;
          movieContent = " ";
          for (var i = 0; i < movieLoad.length; i++) {
            movieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + movieLoad[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + movieLoad[i].title + '<span class="tv-plot right align">' + movieLoad[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
          replaceBrokenImages();
        });
      });
      //Previous Button
      $('#previous-btn').on('click', '#moviepages-backbtn', function(e) {
        e.preventDefault();
        page = page - 1;
        moviePage = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page+'&with_genres='+movieId;
        $.getJSON(movieListUrl + movieId + '&page=' + page, function(data) {
          var movieLoad = data.results;
          movieContent = " ";
          for (var i = 0; i < movieLoad.length; i++) {

            movieContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + movieLoad[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + movieLoad[i].title + '<span class="tv-plot right align">' + movieLoad[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
          replaceBrokenImages();
        });
      });
    });
  }
  discoverContentCall();
});