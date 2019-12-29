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


function pageStyles($styles = array() ) {

	return array_map(function($style) {
		if(!$style["active"]) return "";
		$elem = "<link rel='stylesheet' type='text/css'";
		foreach($style as $prop => $val) {
			$elem .= ($prop."='{$val}'");
		}
		return $elem .= " />";
	},$styles);
}


function pageScripts($scripts = array() ) {
	return array_map(function($script){
		return "<script type='text/javascript' src='/modules/webconsole/assets/{$script}'>\n</script>";
	},$scripts);
}

function doAdminPage() {
	//array("style");
	//array("scripts");
	$template = new Template("webconsole");
	//$template -> addStyles();
	//$template -> addScript("path to js file");
		

	$styles = array(
		array(
			"active" => false,
			"rel" => "stylesheet",
			"href" => "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
			"integrity" => "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh",
			"crossorigin" => "anonymous"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/assets/ux/ux.css"
		),
		array(
			"active" => true,
			"href=" => "/modules/webconsole/assets/modules/material/style.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/assets/css/KeyboardManager.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/assets/modules/note/style.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/assets/css/siteStatus.css"
		)
	);
		
	$scripts = array(
		"lib/event.js",
		"lib/datetime.js",
		"lib/modal.js",
		"lib/view.js",
		"lib/Dom.js",
		"lib/http/http.js",
		"lib/http/HttpCache.js",
		"lib/KeyboardManager.js",
		"lib/database/Database.js",
		"lib/database/DatabaseArray.js",
		"lib/database/DatabaseIndexedDb.js",
		"lib/Client.js",

		"event/DomDataEvent.js",
		"event/DomLayoutEvent.js",
		"event/DomHighlightEvent.js",
		"event/DomMobileContextMenuEvent.js",
		
		"modules/document/src/TableOfContents.js",
		"modules/document/src/Doc.js",
		"modules/document/route.js",
		
		"modules/editable/DomEditableEvent.js",
		"modules/editable/DomContextMenuEvent.js",

		"modules/note/component.js",
		"modules/note/route.js",
		"modules/note/src/Note.js",
		
		"modules/material/component.js",
		// "modules/material/style.css",
		"modules/audio/src/DomAudio.js",

		"routes.js",
		"ux/ui.js",
		"ux/menu.js",
		
		"settings.js",
		"../public/app.js"
	);
	
	$content = file_get_contents(BASE_PATH ."/content/static/sample.html");
	return $template->render(array(
		"defaultStageClass" 	=> "not-home", //home
		"content" 						=> $content,
		"styles" 							=> implode(pageStyles($styles),"\n"),
		"scripts"							=> implode(pageScripts($scripts),"\n")
	));

}