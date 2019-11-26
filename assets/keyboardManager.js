var kbd={
 buffer: [],
 handleEvent: function(event){
    event.preventDefault();
    this.execute(event.key, event.ctrlKey || event.metakey);
 },

 key: function(keyName){
    this.buffer.push(keyName);
    console.log(this.buffer);
 },

 isKeyCombo: function(keyName, modifierKey){
     return modifierKey;
 },

 execute: function(keyName, modifierKey){
     if(this.isKeyCombo(keyName, modifierKey)){
         //app needs to run register command
         new shortcutEvent(keyName);
         document.triggerEvent(shortcutEvent);
     }
     this.key(keyName);
 }
}



kbd.key("a");
    
//      this
//      this.app.hasCommand(keyCombo);// determines if a command matching this keycombo has been registered on the app

// this.app.executeCommand(keyCombo);
   

//var kbd = new KeyboardManager(); 


// 

//    ,
//     keyCombo: [],

// renderSearch: function(){ 
//     document.addEventListener('keydown', (event) => {
//     event.preventDefault();
//     const keyName = event.key;
  
//     this.buffer.push(keyName);
//     console.log(this.buffer);
    
//      this
//      this.app.hasCommand(keyCombo);// determines if a command matching this keycombo has been registered on the app

// this.app.executeCommand(keyCombo);
//     } else { //all other commands
    
//     }
//     // store keystorkes in internal buffer (array)
// }

//callback that listens for keydown events

// app.registerCommand('keydown',function(e){},

//      var stage = document.getElementById("stage");
//      my_form=document.createElement('FORM');
//      my_form.name='myForm';
//      my_form.method='GET';
//      //my_form.action='http://www.another_page.com/index.htm';
     
//      my_tb=document.createElement('INPUT');
//      my_tb.type='TEXT';
//      my_tb.name='myInput';
//      my_form.appendChild(my_tb);

//      my_button = document.createElement('button');
//      my_button.type='submit';
//      my_button.text='Submit';

//      my_form.appendChild(my_button);
     
     
//      stage.appendChild(my_form);
//      //my_form.submit();
//     } 
//   }, false);

