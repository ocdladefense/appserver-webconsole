/*
Service worker
 */ 

const SCRIPT_PATH = "modules/webconsole/assets";


self.importScripts(SCRIPT_PATH + "/lib/Server.js");


const myServer = new Server();
