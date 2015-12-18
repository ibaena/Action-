$(document).ready(function(){

//ajax OMDB Search Movies
function searchCatalog(){
  $("#search-input").keyup(function(){
  var input = $('#search-input').val();
  var omdbUrl = 'http://www.omdbapi.com/?s='+input+'&format=json';
  var omdbPlot = 'http://www.omdbapi.com/?t='+input+'&format=json';
  var images;
  var details;
  
    $.getJSON(omdbUrl, function(data){ 
      images = data.Search;
      var grid = " ";
      var title = " ";

      for (var i = 0; i < images.length; i++) {
        console.log(images[i].Poster);
        grid+='<div class="col s3"><a href="http://www.omdbapi.com/?t='+images[i].Title+'&format=json" src=""><img class="responsive-img" src='+images[i].Poster+' /></a></div>';

      };
      //Movie Grid
      $('.content').html(grid);
      });

    $.getJSON(omdbPlot, function(data){
      
      console.log(data.Plot);

    });
  })
}


searchCatalog();



});