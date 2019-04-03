import React, { Component } from 'react';
import * as PIXI from 'pixi.js';

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