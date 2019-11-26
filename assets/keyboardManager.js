var kbd={
 buffer: [],
 handleEvent: function(event){
    event.preventDefault();
    this.execute(event.key, event.ctrlKey || event.metakey);
    console.log("handleEvent");
 },

 key: function(keyName){
    this.buffer.push(keyName);
    console.log("key");
 },

 isKeyCombo: function(keyName, modifierKey){
    console.log("isKeyCombo");
     return modifierKey;
 },

 execute: function(keyName, modifierKey){
    console.log("execute");
     if(this.isKeyCombo(keyName, modifierKey)){
         //app needs to run register command
         //new shortcutEvent(keyName);

        // create and dispatch the event
        var shorcutEvent = new CustomEvent("shortcutEvent", {
        detail: {
            keyname :event.key
        }
        });
        document.dispatchEvent(event);
                document.triggerEvent(shortcutEvent);
            }
     this.key(keyName);
     console.log(shortcutEvent);
 }
};



kbd.key("a");
