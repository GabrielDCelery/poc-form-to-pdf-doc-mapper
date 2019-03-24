import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import { Stage, Text, Sprite, AppConsumer, Container, SCALE_MODES } from '@inlet/react-pixi';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { MyForm } from './components';
import mainImage from './form/test.png';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.pixi_cnt = null;
    this.app = new PIXI.Application({ width: 600, height: 600, transparent: false });
    this.updatePixiCnt = this.updatePixiCnt.bind(this);
  }

  updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixi_cnt = element;
    //now we are adding the application to the DOM element which we got from the Ref.
    this.app.renderer.backgroundColor = 0xffffff;
    let message = new PIXI.Text("Hello Pixi!");
    this.app.stage.addChild(message);
    console.log(this.app.renderer.plugins.extract)
    this.pixi_cnt.appendChild(this.app.view);
  };

  render() {
    return <div ref={this.updatePixiCnt} />;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: 'Gabriel Zeller' };
    this.handleFirstName = this.handleFirstName.bind(this);
  }

  handleFirstName(_firstName) {
    this.setState({ firstName: _firstName });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col s6">
            <MyForm onHandleFirstName={this.handleFirstName} firstName={this.state.firstName} />
          </div>
          <div className="col s6">
          <MyComponent />

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
