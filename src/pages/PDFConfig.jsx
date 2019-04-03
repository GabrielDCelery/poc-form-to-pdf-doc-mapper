import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { saveDocument } from 'state/actions';

class PDFConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      fileData: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFile(event) {
    return this.setState({
      fileName: event.target.value,
      fileData: event.target.files[0]
    });
  }

  handleSubmit() {
    return this.props.onSaveDocument(this.state.fileName, this.state.fileData);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="alert alert-primary" role="alert">
                Please upload a PDF for processing!
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="documentUpload">Upload</span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="documentUpload"
                    onChange={this.handleFile}
                  />
                  <label className="custom-file-label" htmlFor="documentUpload">{this.state.fileName}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary btn-sm btn-block"
                disabled={this.props.ajax.inProgress}
                onClick={this.handleSubmit}
              >
                {this.props.ajax.inProgress ? (<FontAwesomeIcon className="fas fa-spinner fa-spin" icon='spinner' />) : 'Submit Document'}
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ajax: state.ajax
  }
}

const mapActionsToProps = {
	onSaveDocument: saveDocument
};


const connected = connect(mapStateToProps, mapActionsToProps)(PDFConfig);

export { connected as PDFConfig };