import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './PdfConfig.scss';
import { PdfPixiConfigurer } from 'services';

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
    this.pdfPixiConfigurer.setActivePage(_activePage);
  }

  componentDidMount() {
    const { numOfPages, fileName } = this.props.location.state;
    const resourceConfigs = new Array(numOfPages).fill(null).map((_value, _index) => {
      const _page = _index + 1;
      return {
        page: _page,
        url: `${process.env.REACT_APP_BACKEND_API_URL}/pdf/page/${fileName}.pdf/${_page}`
      };
    });
    this.pdfPixiConfigurer = new PdfPixiConfigurer(this.canvasContainerRef, resourceConfigs);
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