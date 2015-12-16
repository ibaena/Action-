$(document).ready(function(){

//ajax OMDB
$("#search-btn").on('click',function(){
  var input = $('#search-input').val();
 
  $.ajax({
    type:'GET',
    url: 'http://www.omdbapi.com/?s='+input+'',
    dataType: 'json',
    success: function(data){
      $.each(data, function(index,item){
        $.each(item, function(number,obj){
          $.each(obj, function(key,value){
            $('#movies').append('<p>'+key+' : '+value+'</p>');
           
          })
          
        })
        
      })
      console.log('success',data);
    }

  })



  })

});
