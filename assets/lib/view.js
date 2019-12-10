function elem(elementName, attributes, text)
{
    var element = document.createElement(elementName);
    
    if(text != null)
    {
        element.appendChild(document.createTextNode(text));
    }

    for(var prop in attributes)
    {
        var propName = prop == "className" ? "class" : prop;
        
        element.setAttribute(propName, attributes[prop]);
    }

    return element;
}

function createElement(vnode)
{
    if(typeof vnode === "string") {
        return document.createTextNode(vnode);
    }
    if(vnode.type == "text") {
        return document.createTextNode(vnode.children);
    }

    var $el = document.createElement(vnode.type);
    

    for(var prop in vnode.props) {
        var html5 = "className" == prop ? "class" : prop;
        $el.setAttribute(html5,vnode.props[prop]);
    }
    
    if(null != vnode.children) {
        vnode.children.map(createElement)
            .forEach($el.appendChild.bind($el));
    }
    
    return $el;


}

function div(attributes, text)
{
    return elem("div", attributes, text);
}

function linkContainer(link){
    var tableCellLink = vNode("a", {href:link},"View/download material");
    var tableCellLinkContainer = vNode("div",{className:"Rtable-cell link"},[tableCellLink]);

    return tableCellLinkContainer;
}

function vNode(name,attributes,children){
		if(null == children || typeof children == "undefined") {
			children = [];
		} else if(typeof children == "string" ) {
			children = [children];
		} else {
			children = Array.isArray(children) ? children : [children];
		}
		
    var vnode =  {    
			type: name,
			props: attributes,
			children: children
    };
    
    return vnode;
}