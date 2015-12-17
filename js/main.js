$(document).ready(function(){



//ajax OMDB Search Movies
function searchCatalog(){
  $("#search-btn").on('click',function(){
  var input = $('#search-input').val();
  var omdbUrl = 'http://www.omdbapi.com/?s='+input+'&format=json';
  $( "input" ).submit();


    $.getJSON(omdbUrl, function(data){ 
      images = data.Search;
      for (var i = 0; i < images.length; i++) {
        console.log(data.Search[i].Poster);

      //Movie Grid
        $('.image').append('<div class="col s3"><img class="responsive-img" src='+data.Search[i].Poster+'/></div>');
      };
    })
  })
}

searchCatalog();
resetSearch();


//submit button reset ajax portion
function resetSearch(){
  $( "#remove-btn").bind( "click",function(){
  $('.image').hide();
  searchCatalog();searchCatalog();
  });
}



});
