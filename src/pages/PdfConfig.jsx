import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './PdfConfig.scss';
import * as PIXI from "pixi.js";

class PdfConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1
    }
    this.canvasContainerRef = React.createRef();
    this.setActivePage = this.setActivePage.bind(this);
  }

  setActivePage(_activePage) {
    this.setState({
      ...this.state,
      ...{ activePage: _activePage }
    });
  }

  componentDidMount() {
    //this.canvasContainerRef.current.offsetWidth
    const _canvasWidth = this.canvasContainerRef.current.offsetWidth * 0.9;
    const _canvasHeight = Math.round(_canvasWidth / 2480 * 3508);
    this.pixiApp = new PIXI.Application({ width: _canvasWidth, height: _canvasHeight, transparent: false });
    this.canvasContainerRef.current.appendChild(this.pixiApp.view);
    const baseTexture = PIXI.Texture.fromImage(`${process.env.REACT_APP_BACKEND_API_URL}/pdf/page/1554476344442_OoPdfFormExample.pdf/1`);
    const texture = new PIXI.Texture(baseTexture);
    const sprite = new PIXI.Sprite(texture);
    this.pixiApp.stage.addChild(sprite);
    setTimeout(() => {
      const _scale = _canvasWidth / sprite.width;

      sprite.scale.x *= _scale;
      sprite.scale.y *= _scale;
    }, 100)
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid mt-5 mb-5">
          <div className="row">
            <div className="col-sm-1">
              <ul className="list-group">
                {_.times(_.get(this.props, ['history', 'location', 'state', 'numOfPages']) || 0, index => (
                  <li
                    key={`page-${index + 1}`}
                    className={`${[
                      'cursor-pointer',
                      'list-group-item',
                      'text-center',
                      this.state.activePage === index + 1 ? 'bg-primary text-white' : ''
                    ].join(' ')}`}
                    onClick={() => {
                      return this.setActivePage(index + 1);
                    }}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
            <div ref={this.canvasContainerRef} className="col-sm-9 border text-center">
            </div>
            <div className="col-sm-2">
              Configuration menu
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const connected = withRouter((PdfConfig));

export { connected as PdfConfig };