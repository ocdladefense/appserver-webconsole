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
	$template = new Template("webconsole");

	$jquery = array(
		array(
			"src" => "/modules/webconsole/assets/jquery/jquery-1.11.0-min.js"
		)
	);

	
	$react = array(
		array(
			"src" => "/modules/webconsole/assets/react/react-16.12.0-development.js"
		),
		array(
			"src" => "/modules/webconsole/assets/react/react-16.12.0-dom-development.js"
		),
		array(
			"src" => "/modules/webconsole/assets/react/babel-6.26.0-standalone.js"
		)
	);

	
	$template->addScripts($react);
	$template->addScripts(moduleGetScripts());
	$template->addStyles(moduleGetStyles());

	
	$content = file_get_contents(BASE_PATH ."/content/static/sample.html");
	return $template->render(array(
		"defaultStageClass" 	=> "not-home", //home
		"content" 						=> $content
	));

}









function moduleGetStyles() {
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
			"active" => false,
			"href=" => "/modules/webconsole/modules/material/style.css"
		),
		array(
			"active" => false,
			"href" => "/modules/webconsole/assets/css/KeyboardManager.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/modules/note/style.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/assets/css/siteStatus.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/modules/modal/style.css"
		),
		array(
			"active" => true,
			"href" => "/modules/webconsole/modules/ors/style.css"
		)
	);
	
	return $styles;
}


function moduleGetScripts() {
	$module_path = "/modules/webconsole";

	$scripts = array(
		"$module_path/assets/lib/event.js",
		"$module_path/assets/lib/datetime.js",
		"$module_path/assets/lib/modal.js",
		"$module_path/assets/lib/view.js",
		"$module_path/assets/lib/Dom.js",
		"$module_path/assets/lib/http/http.js",
		"$module_path/assets/lib/http/HttpCache.js",
		"$module_path/assets/lib/KeyboardManager.js",
		"$module_path/assets/lib/database/Database.js",
		"$module_path/assets/lib/database/DatabaseArray.js",
		"$module_path/assets/lib/database/DatabaseIndexedDb.js",
		"$module_path/assets/lib/Client.js",
		"$module_path/assets/lib/UrlParser.js",

		"$module_path/assets/event/DomDataEvent.js",
		"$module_path/assets/event/DomLayoutEvent.js",
		"$module_path/assets/event/DomHighlightEvent.js",
		"$module_path/assets/event/DomMobileContextMenuEvent.js",


		
		/*
		"modules/document/src/TableOfContents.js",
		"modules/document/src/Doc.js",
		"modules/document/route.js",
		*/
		
		"$module_path/modules/editable/DomEditableEvent.js",
		"$module_path/modules/editable/DomContextMenuEvent.js",

		
		"$module_path/modules/linkHandler/src/LinkHandler.js",

		"$module_path/modules/modal/component/ModalComponent.js",
		"$module_path/modules/modal/src/Modal.js",
		"$module_path/modules/modal/src/PositionedModal.js",

		"$module_path/modules/note/component.js",
		"$module_path/modules/note/route.js",
		"$module_path/modules/note/src/Note.js",
		
		"$module_path/modules/material/component.js",

		"$module_path/modules/audio/src/DomAudio.js",

		"$module_path/routes.js",
		"$module_path/assets/ux/ui.js",
		"$module_path/assets/ux/menu.js",
		
		"$module_path/settings.js",
		"$module_path/public/app.js"
	);
	
	return $scripts;
}