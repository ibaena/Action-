$(document).ready(function(){


//ajax OMDB
$("#search-btn").on('click',function(){
  var input = $('#search-input').val();
  var omdbUrl = 'http://www.omdbapi.com/?s='+input+'&format=json';

    $.getJSON(omdbUrl, function(data){ 
      images = data.Search;
      for (var i = 0; i < images.length; i++) {
        console.log(data.Search[i].Poster);
      //Movie Grid
        $('.images').append('<img src='+data.Search[i].Poster+'/>')
        $('.images').append('<h3>'+data.Search[i].Title+'</h3>')

    };

    })

})

});
