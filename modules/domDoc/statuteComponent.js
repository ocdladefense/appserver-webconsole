let node = vNode("div",{},text);
let button = vNode("button", { "onclick":"clearElement('container-right')" }, []);
let elem = createElement(node);
let buttonElem = createElement(button);
let container = document.getElementById("container-right");
container.setAttribute("style", "display: inline-block");
container.appendChild(elem);
container.appendChild(buttonElem);

function statute(props){
    return (
        <div id= "statute" >{props.text}</div>
        <button onclick= "clearElement()" ></button>
    )
}