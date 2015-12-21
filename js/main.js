<<<<<<< HEAD
var discoverContent;
var releaseContent = " ";
 var genreContent = " ";

$(document).ready(function() {
  
  var discoverImage = 'https://image.tmdb.org/t/p/w500';
=======
$(document).ready(function(){
$(".dropdown-button").dropdown();
var discoverImage = 'https://image.tmdb.org/t/p/w500';
>>>>>>> 69765501f2ba6da1a107bf4bd6186faed89aa55e



  //tmdb
  function tmdbApi() {
    $('#search-input').keypress(function(e) {
      var input = $('#search-input').val();
<<<<<<< HEAD
      var plotUrl = 'https://api.themoviedb.org/3/search/multi?api_key=3729ffa22dfa780e9abb43dee3074695&query=' + input;
=======
      var plotUrl= 'https://api.themoviedb.org/3/search/multi?api_key=3729ffa22dfa780e9abb43dee3074695&query='+input;
>>>>>>> 69765501f2ba6da1a107bf4bd6186faed89aa55e
      var movie;
      var grid = " ";

      if (e.which == 13) {
        $.getJSON(plotUrl, function(data) {
          movie = data.results;

          for (var i = 0; i < movie.length; i++) {
            grid += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + movie[i].backdrop_path + '" /><span class="card-title">' + movie[i].title + '</span></div></div></div>';
            //console.log(movie[i]);
          }

          $('.content').html(grid).hide().fadeIn(400);;

        });
      }
    });

  }
  tmdbApi();


  //Movie Genre
  function televisonList() {
    var genreList = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
    var page = 1;
    var genre;

    $('#searchDropdown').on('click', function() {

      $.getJSON(genreList, function(data) {
        console.log('data');
        genre = data.results;



        for (var i = 0; i < genre.length; i++) {
          // console.log(genre[i].name);
          genreContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" /><span class="card-title">' + genre[i].name + '</span></div></div></div>';
        }
        $('.content').html(genreContent).hide().fadeIn(400);
        $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="popular-backbtn"><i class="material-icons">skip_previous</i></a>');
        $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="popular-addbtn"><i class="material-icons">skip_next</i></a>');
      });
    });

    //next page
    $('#next-btn').on('click', '#popular-addbtn', function(e) {
      e.preventDefault();
      page = page + 1;
      genreList = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page='+ page;
      genreContent = " "

      $.getJSON(genreList, function(data) {
        genre = data.results;

        for (var i = 0; i < genre.length; i++) {

          genreContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" /><span class="card-title">' + genre[i].title + '</span></div></div></div>';
        }
        $('.content').html(genreContent).hide().fadeIn(400);


      });

    });
    //Previous Button
    $('#previous-btn').on('click', '#popular-backbtn', function(e) {
      e.preventDefault();
      page = page - 1;
      genreContent = " ";

      genreUrl = 'https://api.themoviedb.org/3/discover/tv?api_key=3729ffa22dfa780e9abb43dee3074695&page=' + page;

      $.getJSON(genreUrl, function(data) {
        genre = data.results;

        for (var i = 0; i < genre.length; i++) {

          genreContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + genre[i].backdrop_path + '" /><span class="card-title">' + genre[i].title + '</span></div></div></div>';
        }
        $('.content').html(genreContent).hide().fadeIn(400);
      });

    });

  }
  televisonList();

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

        for (var i = 0; i < discover.length; i++) {
          if (typeof(discoverContent) != 'undefined') {
            discoverContent += '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="' + discoverImage + '' + discover[i].backdrop_path + '" /><span class="card-title">' + discover[i].title + '</span></div></div></div>';
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

<<<<<<< HEAD
    });
  }
  discoverContentCall();
=======
//Movie Genre
function popularList(){
  var genreList = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page=';
  var page =1;
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
      $('#previous-btn').html('<a class="waves-effect waves-black btn-flat" id="back"><i class="material-icons">skip_previous</i></a>');
      $('#next-btn').html('<a class="waves-effect waves-black btn-flat" id="add"><i class="material-icons">skip_next</i></a>')
    })
  })

//next page
  $('#next-btn').on('click','#add', function(e){
    e.preventDefault();
    page = page+1;
    genreList = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page;

    $.getJSON(genreList,function(data){
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {
         
        genreContent+= '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+genre[i].backdrop_path+'" /><span class="card-title">'+genre[i].title+'</span></div></div></div>';
      };
      $('.content').html(genreContent);


  })

})
//Previous Button
$('#previous-btn').on('click','#back', function(e){
    e.preventDefault();
    page = page-1;

    genreUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=3729ffa22dfa780e9abb43dee3074695&page='+page;

    $.getJSON(genreUrl,function(data){
      genre = data.results;

      for (var i = 0; i < genre.length; i++) {
         
        genreContent+= '<div class="col s6"><div class="card"><div class="card-image"><img class="responsive-img poster" src="'+discoverImage+''+genre[i].backdrop_path+'" /><span class="card-title">'+genre[i].title+'</span></div></div></div>';
      };
      $('.content').html(genreContent);
    })

})

}
popularList();

//create Theatre list
function moviesOut(){

  var movieList = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3729ffa22dfa780e9abb43dee3074695&query'
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
      $('.content').empty();
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
       $('.content').empty();
      $('.content').html(discoverContent);
    })

})
}
discoverContent();

>>>>>>> 69765501f2ba6da1a107bf4bd6186faed89aa55e




});