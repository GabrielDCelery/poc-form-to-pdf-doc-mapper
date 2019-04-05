import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PdfConfig extends Component {
  componentDidMount() {
    console.log(this.props.history)
  }

  render() {
    return (
      <React.Fragment>
        PdfConfig
      </React.Fragment>
    )
  }
}

const connected = withRouter((PdfConfig));

export { connected as PdfConfig };