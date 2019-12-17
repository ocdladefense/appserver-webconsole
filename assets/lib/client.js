function clientFetchJson(url){
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

   function Client(opts){
       this.isMobile = true;
       this.hasScreen = true;
       this.isSpa = true; //spa = single page app
       this.machineName = "some machine";
       this.macAddress = "74773685";
       this.IpAddress = "847q090952";
       this.features = array();
   }
   var networkStatus = true;
   window.addEventListener('offline', function(){networkStatus = false});
   window.addEventListener('online', function(){networkStatus = true});

// function goOffline(){
//     Object.defineProperty(navigator, "onLine", {value:false});
// }
// function goOnline(){
//  Object.defineProperty(navigator, "online", {value:true});
// }
   //$cient = new Client();
//$cient->machineName;
//#client->deviceName;
//#client->macAddress;
//#client->IpAddress;
//#client->features;
//$client2 = new TerminalClient;
//client2->hasFeatureScreen = false;