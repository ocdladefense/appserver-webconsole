var modal = {

    show : function(){
        $('body').toggleClass('hasModal');
    },
    hide : function(){
        $('body').toggleClass('hasModal');
        console.log("hide function");
    },
    render : function(vNode){
        document.getElementById('content').appendChild(createElement(vNode));
        //document.getElementById('content').innerHTML = "somehtml";
    },
}