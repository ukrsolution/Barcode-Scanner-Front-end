import React from "react";
import ReactDOM from "react-dom";

class WidgetInjector extends React.Component<any, any> {
  el: any;
  container: any;
  constructor(props: any) {
    super(props);

    this.el = document.createElement(props.tag);

    if (props.class) this.el.classList.add(props.class);

    if (props.parent) {
      const container = document.querySelector(props.container);
      this.container = container.parentNode;
    } else {
      this.container = document.querySelector(props.container);
    }
  }

  componentDidMount() {
    if (this.container) {
      this.container.append(this.el);

      if (this.props.parent) {
        const container = document.querySelector(this.props.container);
        container.remove();
      }
    }
  }

  componentWillUnmount() {
    this.el.remove();
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default WidgetInjector;
