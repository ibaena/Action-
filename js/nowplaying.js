$(document).ready(function(){
//Image Error check and replacement with selected image  
function replaceBrokenImages(){
  $("img").error(function () {
    $(this).unbind("error").attr("src", "images/no-poster.png");
  });
};

//generate trailer videos on button click
function loadTrailers(){
  $('.content').on('click','.trailers', function(){
      trailerMovieId = $(this).attr('value');
       $.getJSON('https://api.themoviedb.org/3/movie/'+trailerMovieId+'/videos?api_key=3729ffa22dfa780e9abb43dee3074695',function(data){
        var trailerMovies = data.results;
        modalContent = ' ';
        for (var i = 0; i < trailerMovies.length; i++){
          console.log(trailerMovies[i].key);

          modalContent += '<div id="modal1" class="modal">\
                            <div class="modal-content">\
                              <div class="video-container">\
                                <iframe class="player" width="853" height="520" src="https://www.youtube.com/embed/'+trailerMovies[i].key+'?rel=0" frameborder="0" allowfullscreen></iframe>\
                              </div>\
                            </div>\
                          </div>';             
        }; 
        $('.modal-display').html(modalContent);
        $('#modal1').openModal();
      });
});
};
//Generate a List of movies currently out in theatre this list will update daily
  function moviesOut() {
    var movieList = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3729ffa22dfa780e9abb43dee3074695&query';
    var release;
    var line;
    $('#release').on('click', function(e) {
      e.preventDefault();
      $.getJSON(movieList, function(data) {
        release = data.results;
        releaseContent = " ";

        for (var i = 0; i < release.length; i++) {
          releaseContent += '<div class="col s12 m6">\
                              <div class="card">\
                                <div class="card-image">\
                                  <img class="responsive-img poster activator" src="' + imageUrl + '' + release[i].backdrop_path + '" />\
                                </div>\
                                <div class="card-content">\
                                  <span class="card-title activator grey-text text-darken-4 truncate flow-text">' + release[i].title + '<span class="tv-plot right align">' + release[i].vote_average + '<i class="tiny material-icons">grade</i></span></span>\
                                </div>\
                                  <div class="card-reveal">\
                                    <span class="card-title activator grey-text text-darken-4 flow-text">' + release[i].title + '<i class="material-icons right">close</i></span>\</span>\
                                      <p class="plot">' + release[i].overview + '</p>\
                                      <p class="rating">IMDB rating: '+release[i].vote_average+',</p>\
                                      <p class="date pull right"><i class="material-icons left">today</i> ' + release[i].release_date + '</p>\
                                      <p class="waves-effect waves-light white btn modal-trigger trailers black-text" href="#modal1" value="'+release[i].id+'">\
                                      <i class="material-icons right">videocam</i>Launch Trailer</p>\
                                    </div>\
                                </div>\
                              </div>\
                          </div>';
        };
        $('.content').html(releaseContent).hide().fadeIn(400);
        replaceBrokenImages();
        loadTrailers();
      });
    });
  }
  moviesOut();





});