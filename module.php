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
		"modules/audio/audio.js",
		"lib/datetime.js",
		"lib/modal.js",
		"lib/view.js",
		"lib/http/http.js",
		"lib/http/HttpCache.js",
		"lib/event.js",
		"lib/Client.js",
		"menu.js",
		"event/KeyboardManager.js",
		"modules/editable/Dom.js",
		"lib/database/Database.js",
		"lib/database/DatabaseArray.js",
		"lib/database/DatabaseIndexedDb.js",
		"modules/documents/TableOfContents.js",
		"modules/editable/DomEditableEvent.js",
		"modules/editable/DomDataEvent.js",
		"modules/editable/DomLayoutEvent.js",
		"modules/editable/DomHighlightEvent.js",
		"modules/editable/DomContextMenuEvent.js",
		"modules/note/component.js",
		"modules/note/note.js",
		"routes.js",
		"ui.js",
		"settings.js",
		"app.js"
	));
	
	$content = file_get_contents(BASE_PATH ."/content/static/sample.html");
	return $template->render(array(
		"defaultStageClass" => "not-home", //home
		"content"=> $content,
		"scripts"=>implode($scripts,"\n")
	));

}