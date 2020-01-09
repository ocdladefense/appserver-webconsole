const EXTERNAL_CONTENT_URL = "../external/";
	
const HANDLE_URLS = ["oregonlaws.org/ors"];

var statute = url.getLastPathPart();

var ors = {

    getExternalContentUrl:function(){
        return "../external/";
    },

    getHandleUrls:function(){
        return ["oregonlaws.org/ors"];
    },

    getStatute:function(){
        return "here is your statute"
    }    
}