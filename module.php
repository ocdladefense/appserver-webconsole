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
		
	$scripts = array_map(function($script){ return "<script type='text/javascript' src='/modules/webconsole/assets/{$script}'>\n</script>";},array(
		"components/materials.js",
		"lib/datetime.js",
		"lib/modal.js",
		"lib/view.js",
		"lib/http.js",
		"menu.js",
		"event/KeyboardManager.js",
		"modules/editable/Dom.js",
		"modules/editable/DomEditableEvent.js",
		"modules/editable/DomDataEvent.js",
		"modules/editable/DomLayoutEvent.js",
		"modules/note/component.js",
		"modules/note/note.js",
		"routes.js",
		"ui.js",
		"settings.js",
		"app.js"
	));
	
	$content = file_get_contents(BASE_PATH ."/content/static/sample.html");
	return $template->render(array("content"=> $content,"scripts"=>implode($scripts,"\n")));

}