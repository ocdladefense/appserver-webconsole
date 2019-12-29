const DomAudio = (function(){

const TIME_INCREMENT = 5;
function DomAudio(init){
	this.url = init;
	this.audioCellLink = new Audio(this.url);
	this.audioCellLink.setAttribute("controls",true);
	this.duration = this.audioCellLink.duration;
}
DomAudio.many = function(url,count,title,summary){
    var audios = [];
    for(var i = 0; i < count; i++)
    {
        var newAudio = new DomAudio(url);
        newAudio.render(title,summary);
    }
    return audios;

};

DomAudio.prototype = {
	play:function(){
		var promise = this.audioCellLink.play();
		return promise;
	},
	pause:function(){
	},
	stop:function(){},
	seek:function(seconds){
		seconds = seconds || TIME_INCREMENT;
		this.currentTime = this.audioCellLink.currentTime + seconds;
		console.log(this.currentTime);
		this.audioCellLink.currentTime = this.currentTime;
	},
	back:function(seconds){
		seconds = -seconds || -TIME_INCREMENT;

		console.log(seconds);
		if(Math.abs(seconds) > this.currentTime){
			throw new Error("can not go back further than 0" + "current time:" + this.currentTime);
		}
		this.seek(seconds);
	},
	forward:function(seconds){
		if(seconds < 0){
			throw new Error("must be a positive number");
		}
		this.seek(seconds);
	},
	url:function(){},
	render:function(title,summary){
		var audioElement = this.audioCellLink;
		var container = tree(
			 div("className=audio-container"),
				 div("className=title",title),
					 div("className=summary",summary)
		);

		var audioContainerElement = createElement(container);
		var stage = document.getElementById("stage");
		stage.appendChild(audioContainerElement).appendChild(audioElement);
	},
	volume:function(){},
	currentTime:0,
	duration:0


};


return DomAudio;

})();