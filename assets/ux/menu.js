
function menuItem(obj,routeName){
	if(typeof obj === "string")
	{
		obj = {
			name: obj,
			route: routeName || null
		};
	}
	var name = obj.name;
	var routeName = obj.route;
		if(routeName == null){
			routeName ="";
		}
	var name = vnode("a",{href:"#",id:name,"data-route":routeName},name);
	return vnode("li",{},[name]);
}
	

function subMenu(name,submenu){

	var children = submenu.map(menuItem);
	var sub = vnode("ul",{className:"sub-menu"},children);
	var top = vnode("li",{},[vnode("a",{href:"#"},name)]);
	top.children.push(sub);
	return top;
}

function createMenu() {

	var children = [
		subMenu("file",[{name:"save"},{name:"save-as"},{name:"export"}]),
		menuItem("salesforce"),
		menuItem("about","about"),
		menuItem("materials", "materials"),
		subMenu("Notes",[{name:"show all",route:"database"},{name:"New..",route:"new-note"}]),
		subMenu("SiteStatus",[{name:"show-all", route:"all-site-statuses"},{name:"checksite...",route:"site-status-check-site"},
							{name:"Load Sites", route:"site-status-load-sites"}])
	];
	
	return vnode("ul",{className:"main-menu"},children);
}