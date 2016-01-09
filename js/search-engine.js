$(document).ready(function(){
//Image Error check and replacement with selected image  
function replaceBrokenImages(){
  $("img").error(function () {
    $(this).unbind("error").attr("src", "images/no-poster.png");
  });
}  
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
              if (searchEngine[i].name !== undefined){
              grid += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + searchEngine[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + searchEngine[i].name + '<span class="tv-plot right align">' + searchEngine[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + searchEngine[i].name + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + searchEngine[i].overview + '</p>\
                                      <p class="rating">IMDB rating: ' + searchEngine[i].vote_average + '</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
            } else {
              grid += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + searchEngine[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate">' + searchEngine[i].title + '<span class="tv-plot right align">' + searchEngine[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
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
          replaceBrokenImages();
        });
      }
    });
  }
  searchItems();







})