$(document).ready(function(){


//build Television Genre List and Produce pages with images
'<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + imageUrl + '' + release[i].backdrop_path + '" /><span class="card-title">' + release[i].title + '</span></div></div></div>';





        //next page
        $('#next-btn').on('click', '#moviepages-addbtn', function(e) {
          e.preventDefault();
          page = page + 1;

          $.getJSON(movieListUrl + movieId + '&page=' + page, function(data) {
            var movieLoad = data.results;

            for (var i = 0; i < movieLoad.length; i++) {

              movieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + imageUrl + '' + movieLoad[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + movieLoad[i].title + ' <span class="tv-plot right align">' + movieLoad[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + movieLoad[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
            }
            $('.content').html(movieContent).hide().fadeIn(400);


          });

        });
        //Previous Button
        $('#previous-btn').on('click', '#moviepages-backbtn', function(e) {
          e.preventDefault();
          page = page - 1;
          genreContent = " ";

          moviePage = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page + '&with_genres=' + movieId;

          $.getJSON(moviePage, function(data) {
            var movieLoad = data.results;

            for (var i = 0; i < movieLoad.length; i++) {

              movieContent += '<div class="col s6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster" src="' + imageUrl + '' + movieLoad[i].backdrop_path + '" />\
                                </div>\
                              </div>\
                                <ul class="collapsible" data-collapsible="accordion">\
                                  <li>\
                                    <div class="collapsible-header">' + movieLoad[i].title + ' <span class="tv-plot right align">' + movieLoad[i].vote_average + '<i class="tiny material-icons">grade</i></span></div>\
                                    <div class="collapsible-body"><p>' + movieLoad[i].overview + '</p></div>\
                                  </li>\
                                </ul>\
                          </div>';
            }
            $('.content').html(movieContent).hide().fadeIn(400);
        });
      });

















$('.content').on('click','.poster',function(){
    $('#modal1').openModal();
  });




<div id="modal1" class="modal">\
                                    <div class="modal-content">\
                                      <h4>' + release[i].title + '</h4>\
                                      <p>'+ release[i].overview + '/p>\
                                      <p>'+ release[i].vote_average + '/p>\
                                    </div>\
                                  </div>\
                              </div>'