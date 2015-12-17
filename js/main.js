$(document).ready(function(){

//ajax OMDB Search Movies
function searchCatalog(){
  $("#search-input").keyup(function(){
  var input = $('#search-input').val();
  var omdbUrl = 'http://www.omdbapi.com/?s='+input+'&format=json';
  var images;
  


    $.getJSON(omdbUrl, function(data){ 
      images = data.Search;
      var grid = " ";

      for (var i = 0; i < images.length; i++) {
        console.log(images[i].Poster);
        grid+='<div class="col s3"><img class="responsive-img" src='+images[i].Poster+' /></div>';
      };
      
      $('.content').html(grid);

      
      });
         //Movie Grid
   
     
    })
  }


searchCatalog();



});