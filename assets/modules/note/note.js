const notes = (function(){

	return {
		name: "new-note",
	
		hasParams: true,
	
		headers: {
			accept: "application/json",
			contentType: "application/json"
			},
			targetNodeName:null,
			targetClassName:null,
			dataStore: "notes",

			handler: new Editable(),

		// Let's not have to call out to external server, will be nice for tesitng, too.
		url: function(params) {

			return {id:"foobar",time:2000, title:params.noteTitle, body:params.noteBody};
		},
	
		// Gets passed the body of the Response.
		render:  function(note){
			var date = getTimeStamp();
			document.addEventListener("click",this.handler);
			document.addEventListener("keyup",this.handler);
			var container = vNode("div",{className:"note-container"},[]);
			container.children.push(vNode("label",{className:"label"},"Title: "));
			container.children.push(vNode("h3",{className:"note-title editable",id:"title"},note.title));
			container.children.push(vNode("label",{className:"label"},"Body: "));
			container.children.push(vNode("div",{className:"note-body editable",id:"body"},note.body));
			container.children.push(vNode("label",{className:"label"},"Date: "));
			container.children.push(vNode("div",{className:"note-timestamp",id:"stamp"},date));
			return container;
		},
	
		form: function() {
					return vNode("div",{"id":"modalContainer"},
					[
							vNode("input",{name:"noteTitle",id:"noteTitle"}, []),
							vNode("input",{name:"noteBody",id:"noteBody"},[])
					]);
		},
	
		formCallback:function(){
					var title = document.getElementById("noteTitle").value;
					var body = document.getElementById("noteBody").value;
			return JSON.stringify({"noteTitle":title,"noteBody":body});
		}
	};
	

})();

function getTimeStamp(){
	var today = new Date();
	var ampm = "am";
	if(today.getHours() >= 12){
		ampm = "pm";
	}
	var seconds = today.getSeconds();
	if(seconds<= 9){
		seconds = "0"+seconds;
	}
	var minutes = today.getMinutes();
	if(minutes <= 9){
		minutes = "0"+minutes;
	}
	var hours = today.getHours();
	if(hours > 12){
		hours = hours-12;
	}

	var time = hours+":"+minutes+ampm;

	var stringDate = today.getMonth()+"/"+today.getDate()+"/"+today.getFullYear()+" @"+time;
	return stringDate.toString();
}