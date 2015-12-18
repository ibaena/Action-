$(document).ready(function(){
$(".dropdown-button").dropdown();


//tmdb
function tmdbApi(){
  $('#search-input').keypress(function(e){
      var input = $('#search-input').val();
      var plotUrl= 'http://api.themoviedb.org/3/search/multi?api_key=3729ffa22dfa780e9abb43dee3074695&query='+input;
      var movie;
      var grid = " ";


    if(e.which == 13) {
    $.getJSON(plotUrl, function(data){
      movie = data.results;

      

      for (var i = 0; i < movie.length; i++) {
        grid+='<div class="col s2"><img class="responsive-img poster" src="http://image.tmdb.org/t/p/w500'+movie[i].poster_path+'" /></div>';
        //console.log(movie[i]);
      };

      $('.content').html(grid);

      
    })
}
  })

}
tmdbApi();


//Movie Genre
function genreList(){
  var genreList = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3729ffa22dfa780e9abb43dee3074695';
  var genre;
  var genreContent = " ";
  $('#searchDropdown').on('click', function(){

    $.getJSON(genreList, function(data){
      console.log('data');
      genre = data.genres;

      for (var i = 0; i < genre.length; i++) {
        console.log(genre[i].name);
        genreContent += ' <li><a href="#!" class="genre-list">'+genre[i].name+'</a></li>';
      };
      $('#dropdown1').html(genreContent);
      
    })
  })
}
genreList();

//create Theatre list
function moviesOut(){

  var movieList = 'http://api.themoviedb.org/3/movie/now_playing?api_key=3729ffa22dfa780e9abb43dee3074695&query'
  var release;
  var releaseContent = " ";
$('#release').on('click', function(e){
  e.preventDefault();
  $.getJSON(movieList, function(data){
    release = data.results;

    for (var i = 0; i < release.length; i++) {
      //console.log(release[i].title);
      releaseContent+='<div class="col s2"><img class="responsive-img poster" src="http://image.tmdb.org/t/p/w500'+release[i].poster_path+'" /></div>';
    };
    $('.content').html(releaseContent);
   
  })

})

}
moviesOut();

//discover new content

function discoverContent(){
  var discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695';
  var discover;
  var discoverContent = " ";

  $('#discover').on('click',function(){
    $.getJSON(discoverUrl,function(data){
      discover = data.results;
      
      for (var i = 0; i < discover.length; i++) {
        discoverContent+= '<div class="col s2"><img class="responsive-img poster" src="http://image.tmdb.org/t/p/w500'+discover[i].poster_path+'" /></div>';
      };
      $('.content').html(discoverContent);
    })
  })
}
discoverContent();

});