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
   

window.addEventListener('offline', function(){
	tellWorker("connected",false);
});

window.addEventListener('online', function(){
	tellWorker("connected",true);
});



function tellWorker(command,value) {
	if (navigator.serviceWorker.controller) {
		console.log("Sending message to service worker");
		navigator.serviceWorker.controller.postMessage({
				"command": command,
				"message": value
		});
	} else {
		console.log("No Service Worker");
	}
}

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