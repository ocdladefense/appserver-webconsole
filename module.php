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
		return "<script type='text/javascript' src='/modules/webconsole/{$script}'>\n</script>";
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
			"href=" => "/modules/webconsole/modules/material/style.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/assets/css/KeyboardManager.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/modules/note/style.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/assets/css/siteStatus.css"
		)
	);
		
	$scripts = array(
		"assets/lib/event.js",
		"assets/lib/datetime.js",
		"assets/lib/modal.js",
		"assets/lib/view.js",
		"assets/lib/Dom.js",
		"assets/lib/http/http.js",
		"assets/lib/http/HttpCache.js",
		"assets/lib/KeyboardManager.js",
		"assets/lib/database/Database.js",
		"assets/lib/database/DatabaseArray.js",
		"assets/lib/database/DatabaseIndexedDb.js",
		"assets/lib/Client.js",

		"assets/event/DomDataEvent.js",
		"assets/event/DomLayoutEvent.js",
		"assets/event/DomHighlightEvent.js",
		"assets/event/DomMobileContextMenuEvent.js",
		
		/*
		"modules/document/src/TableOfContents.js",
		"modules/document/src/Doc.js",
		"modules/document/route.js",
		*/
		
		"modules/editable/DomEditableEvent.js",
		"modules/editable/DomContextMenuEvent.js",

		"modules/note/component.js",
		"modules/note/route.js",
		"modules/note/src/Note.js",
		
		"modules/material/component.js",
		// "modules/material/style.css",
		"modules/audio/src/DomAudio.js",

		"routes.js",
		"assets/ux/ui.js",
		"assets/ux/menu.js",
		
		"settings.js",
		"public/app.js"
	);
	
	$content = file_get_contents(BASE_PATH ."/content/static/sample.html");
	return $template->render(array(
		"defaultStageClass" 	=> "not-home", //home
		"content" 						=> $content,
		"styles" 							=> implode(pageStyles($styles),"\n"),
		"scripts"							=> implode(pageScripts($scripts),"\n")
	));

}