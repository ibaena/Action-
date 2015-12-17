$(document).ready(function(){

//ajax OMDB Search Movies
function searchCatalog(){
  $("#search-btn").on('click',function(){
  var input = $('#search-input').val();
  var omdbUrl = 'http://www.omdbapi.com/?s='+input+'&format=json';
  var omdbPlot = 'http://www.omdbapi.com/?t='+input+'&format=json';
  var images;
  var plot;
  
    $.getJSON(omdbUrl, function(data){ 
      images = data.Search;
      var grid = " ";
      var title = " ";

      for (var i = 0; i < images.length; i++) {
        console.log(images[i].Poster);
        grid+='<div class="col s3"><img class="responsive-img" src='+images[i].Poster+' /></div>';

      };
      //Movie Grid
      $('.content').html(grid);
      });

    $.getJSON(omdbPlot, function(data){
      plot = data.Title;
      console.log(data.Plot);

    });
  })
}


searchCatalog();



});