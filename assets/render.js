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


    function vNode(name,attributes,children){
        return {    
            type: name,
            props: attributes,
            children: typeof children == "string" ? [children] : children
        };

    }