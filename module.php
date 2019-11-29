<?php


class WebConsoleModule extends Module {


	public function __construct(){
		parent::__construct();
		$this->routes = modWebconsoleRoutes();
		$this->name = "webconsole";
	}

}


function modWebconsoleRoutes() {
	return array(
		"webconsole" => array(
			"callback" => "doAdminPage"
		)
	);
}


function doAdminPage() {
	//array("style");
	//array("scripts");
	$template = new Template("webconsole");
	//$template -> addStyles();
	//$template -> addScript("path to js file");
	return $template->render(array("content"=> "This is what the page looks like when it is first loaded"));

}