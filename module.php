<?php

use \Html\HtmlLink;


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
		),
		"doc" => array(
			"callback" => "loadDocument"
		)
	);
}



function loadDocument($docId) {
	if($docId == null) {
		throw new Exception("Path expects a document id parameter.");
	}
	$path = BASE_PATH . "/content/static/bon/sex-cases/chapter-".$docId.".html";
	return file_get_contents($path);
}








function doAdminPage() {
	$template = Template::loadTemplate("webconsole");

	
	$content = file_get_contents(BASE_PATH ."/content/static/sample.html");
	return $template->render(array(
		"defaultStageClass" 	=> "not-home", //home
		"content" 						=> $content
	));

}








