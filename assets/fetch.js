function fetchJson(url){
    return fetch(url, {
     headers:{'Accept': 'application/json'}, 
   })
   .then(function(response) {
       return response.json();
   })
   .then(function(myJson){
       return myJson;
   });
   }