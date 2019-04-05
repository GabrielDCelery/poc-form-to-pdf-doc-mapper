import _ from 'lodash';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { uploadPdf, getPdfList, removePdf } from 'state/actions';
import './PdfUpload.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter } from 'react-router';

class PdfUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      fileData: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToPath = this.navigateToPath.bind(this);
  }

  componentDidMount() {
    return this.props.onGetPdfList();
  }

  navigateToPath (_path, _state) {
    this.props.history.push(_path, _state);
  }

  handleFile(event) {
    return this.setState({
      fileName: event.target.value,
      fileData: event.target.files[0]
    });
  }

  handleSubmit() {
    return this.props.onUploadPdf(this.state.fileName, this.state.fileData);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container mt-3">

          <div className="card shadow-sm mb-5">
            <div className="card-header text-center">
              PDF UPLOAD
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="alert alert-primary" role="alert">
                    Please select a PDF for processing!
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
            </div>

            <div className="card-footer text-muted">
              <button
                type="button"
                className="btn btn-primary btn-block"
                disabled={this.props.bUploadInProgress}
                onClick={this.handleSubmit}
              >
                {this.props.bUploadInProgress ? (<FontAwesomeIcon className="fas fa-spinner fa-spin" icon='spinner' />) : 'Submit Document'}
              </button>
            </div>

          </div>


          <div className="card shadow-sm mb-5">
            <div className="card-header text-center">
              UPLOADED PDF FILES
          </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">File Name</th>
                    <th scope="col" className="text-center">Number of Pages</th>
                    <th scope="col" className="text-center">Config</th>
                    <th scope="col" className="text-center">Form</th>
                    <th scope="col" className="text-center">Remove</th>
                  </tr>
                </thead>
                <ReactCSSTransitionGroup
                  component="tbody"
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                  {this.props.pdfList.map((pdf, index) => (
                    <tr key={`pdf-${index}`}>
                      <td>{pdf.fileName}{pdf.extension}</td>
                      <td className="text-center">{pdf.numOfPages}</td>
                      <td className="text-center">
                        <FontAwesomeIcon
                          className="fas fa-2x cursor-pointer"
                          icon='tools'
                          onClick={() => {
                            return this.navigateToPath('/configure', { fileName: pdf.fileName });
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon
                          className="fas fa-2x cursor-pointer"
                          icon='file-alt'
                          onClick={() => {
                            return this.navigateToPath('/form', { fileName: pdf.fileName });
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon
                          className="fas fa-2x cursor-pointer fa-red"
                          icon='window-close'
                          onClick={() => {
                            return this.props.onRemovePdf(pdf.fileName);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </ReactCSSTransitionGroup>
              </table>
            </div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    pdfList: _.get(state, ['getPdfList', 'data']) || [],
    bUploadInProgress: _.get(state, ['uploadPdf', 'inProgress']) || false
  }
}

const mapActionsToProps = {
  onUploadPdf: uploadPdf,
  onGetPdfList: getPdfList,
  onRemovePdf: removePdf
};

const connected = withRouter(connect(mapStateToProps, mapActionsToProps)(PdfUpload));

export { connected as PdfUpload };