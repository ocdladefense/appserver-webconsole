<?php

class WebConsole extends Module {
    private $deps = array();

    public function __construct() {
        parent::__construct();

        $this->name = "webconsole";
        $this->routes = webconsoleModRoutes();
        $this->dependencies = $this->deps;
        $this->files = webconsoleModRoutes()["files"];
    }
}

function webconsoleModRoutes() {
    $webconsoleModRoutes = array(
        "webconsole-test" => array(
            "callback" => "webconsoleTests",
            "files" => array()
        )
    );
    return $webconsoleModRoutes;    
}
function webconsoleTests() {
    return "Hello from the webconsole!";
}