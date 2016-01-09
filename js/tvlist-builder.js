$(document).ready(function(){
//Image Error check and replacement with selected image  
function replaceBrokenImages(){
  $("img").error(function () {
    $(this).unbind("error").attr("src", "images/no-poster.png");
  });
}  
//Building Television Genre List in sideNav, implmenting a on click event on genre names that will load a list of movies based on their genre 
  $.getJSON(genreTvUrl, function(data) {
    var genreNames = data.genres;
    var tvGenre = " ";
    for (var i = 0; i < genreNames.length; i++) {
      tvGenre += '<li><a href="" class="genre-tv" value =' + genreNames[i].id + '>' + genreNames[i].name + '</a></li>';
    };
    $('#slide-out').append(tvGenre);
  });
//Load List of movies wbased on genre
  function buildTvGenrelist() {
    $('#slide-out').on('click', '.genre-tv', function(e) {
      e.preventDefault();
      var genreId = $(this).attr("value");
      $.getJSON(tvGenreList + genreId, function(data) {
        var sortTv = data.results;
        tvList = " ";
        for (var i = 0; i < sortTv.length; i++) {
          tvList += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + sortTv[i].name + '<span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4">' + sortTv[i].name + '<i class="material-icons right">close</i></span>\
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
        replaceBrokenImages();
      });
      //next page
      $('#next-btn').on('click', '#genrepages-addbtn', function(e) {
        e.preventDefault();
        page = page + 1;
        tvPage = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page+'&with_genres='+genreId;
        $.getJSON(tvPage, function(data) {
          sortTv = data.results;
          tvList = " ";
          for (var i = 0; i < sortTv.length; i++) {
            tvList += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + sortTv[i].name + '<span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
          replaceBrokenImages();
        });
      });
      //Previous Button
      $('#previous-btn').on('click', '#genrepages-backbtn', function(e) {
        e.preventDefault();
        page = page - 1;
        tvPage = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page+'&with_genres='+genreId;
        $.getJSON(tvPage, function(data) {
          sortTv = data.results;
          tvList = " ";
          for (var i = 0; i < sortTv.length; i++) {
            tvList += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + sortTv[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + sortTv[i].name + '<span class="tv-plot right align">' + sortTv[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
          replaceBrokenImages();
        })
      });
    });
  }
  buildTvGenrelist();

})