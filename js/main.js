$(document).ready(function(){



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
        grid+='<div class="col s3"><img class="responsive-img poster" src="http://image.tmdb.org/t/p/w500'+movie[i].poster_path+'" /></div>';
        console.log(movie[i]);
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
});