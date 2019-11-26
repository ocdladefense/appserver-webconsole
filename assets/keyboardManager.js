var kbd={


 buffer: [],
 handleEvent: function(event){
    event.preventDefault();
    this.execute(event.key, event.ctrlKey || event.metakey);
 },

 key: function(keyName){
    this.buffer.push(keyName);
 },

 isKeyCombo: function(keyName, modifierKey){
     return keyName != "Control" && modifierKey;
 },

 execute: function(keyName, modifierKey){

     if(this.isKeyCombo(keyName, modifierKey)){
        var shortcutEvent = new CustomEvent("ShortcutEvent", {
            detail: {
                keyName: keyName
            }
        });
        document.dispatchEvent(shortcutEvent);
        console.log(shortcutEvent.detail);
        }
    this.key(keyName);
    }
   

}

kbd.key("a");
