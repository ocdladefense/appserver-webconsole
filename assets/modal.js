var modal = {

    show : function(){
        $('body').toggleClass('hasModal');
    },
    hide : function(){
        $('body').removeClass('hasModal');
    },
    render : function(vNode){
        document.getElementById('content').appendChild(createElement(vNode));
        //document.getElementById('content').innerHTML = "somehtml";
    },
}