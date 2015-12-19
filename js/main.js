$(document).ready(function(){
$(".dropdown-button").dropdown();
var discoverImage = 'http://image.tmdb.org/t/p/w500';
var m


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
        grid+='<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+movie[i].backdrop_path+'" /><span class="card-title">'+movie[i].title+'</span></div></div></div>';
        //console.log(movie[i]);
      };

      $('.content').html(grid);
  
    })
}
  })

}
tmdbApi();


//Movie Genre
function popularList(){
  var genreList = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695';
  var genre;
  var genreContent = " ";
  $('#searchDropdown').on('click', function(){

    $.getJSON(genreList, function(data){
      //console.log('data');
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {
        //console.log(genre[i].name);
        genreContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+genre[i].backdrop_path+'" /><span class="card-title">'+genre[i].title+'</span></div></div></div>';
      };
      $('.content').html(genreContent);
      
    })
  })
}
popularList();

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
      releaseContent+='<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+release[i].backdrop_path+'" /><span class="card-title">'+release[i].title+'</span></div></div></div>';
    };
    $('.content').html(releaseContent);
   
  })

})

}
moviesOut();

//discover new content

function discoverContent(){
  var discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
  var page= 1;
  var discover;
  var discoverContent = " ";
  var discoverImage = 'http://image.tmdb.org/t/p/w500';



  $('#discover').on('click',function(e){
    e.preventDefault();
    $.getJSON(discoverUrl,function(data){
      discover = data.results;
     
      for (var i = 0; i < discover.length; i++) {
         
        discoverContent+= '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+discover[i].backdrop_path+'" /><span class="card-title">'+discover[i].title+'</span></div></div></div>';
      };
      $('.content').html(discoverContent);
      $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="back"><i class="material-icons">skip_previous</i></a>');
      $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="add"><i class="material-icons">skip_next</i></a>')
    })
  })
//next page
  $('#next-btn').on('click','#add', function(e){
    e.preventDefault();
    page = page+1;
    discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page;

    $.getJSON(discoverUrl,function(data){
      discover = data.results;

      for (var i = 0; i < discover.length; i++) {
         
        discoverContent+= '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+discover[i].backdrop_path+'" /><span class="card-title">'+discover[i].title+'</span></div></div></div>';
      };
      $('.content').html(discoverContent);


  })

})
//Previous Button
$('#previous-btn').on('click','#back', function(e){
    e.preventDefault();
    page = page-1;

    discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page;

    $.getJSON(discoverUrl,function(data){
      discover = data.results;

      for (var i = 0; i < discover.length; i++) {
         
        discoverContent+= '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+discover[i].backdrop_path+'" /><span class="card-title">'+discover[i].title+'</span></div></div></div>';
      };
      $('.content').html(discoverContent);
    })

})
}
discoverContent();





});