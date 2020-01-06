'use strict';

// const e = React.createElement;


class StatuteComponent extends React.Component {
  constructor(reactProps) {
    super(reactProps);

    this.state = { text: reactProps.text}
  }

  unMount() {
      console.log(this.state);
    //   this.state.text = "";
      const domContainer = document.querySelector('#container-right');
      domContainer.classList.remove("show");
    //   ReactDOM.render(
    //     e(this.render),
    //     domContainer
    //   );


    //   ReactDOM.render(
    //     React.createElement(StatuteComponent, { text: ""}),
    //     domContainer
    //   );
    // let container = ReactDOM.findDOMNode(this);
    ReactDOM.unmountComponentAtNode(domContainer);
  }


  render() {
    var theText = this.state.text;
    
    // There's a way to make this work now, even though we're using the "standalone" babel.
    // We'll move to webpack, etc. on Thursday.
		// return <h1>Hello, world!</h1>;

    return React.createElement(
        "div", 
        { id: "statuteContainer"}, 
        React.createElement("div", null, theText),
        React.createElement("button", { onClick: () => { this.unMount() } }, 
        " Close ")
    );

    // return React.createElement(
    //     "div", 
    //     { id: "statuteContainer"}, 
    //     React.createElement("div", null, theText),
    //     React.createElement("button", { onClick: () => { this.setState( { text: "" }) } }, 
    //     " Close ")
    // );
  }
}

