import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { uploadPdf, getPdfList, removePdf } from 'state/actions';
import './PdfUpload.scss';

class PdfUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      fileData: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    return this.props.onGetPdfList();
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
                className="btn btn-primary float-right"
                disabled={this.props.uploadPdf.inProgress}
                onClick={this.handleSubmit}
              >
                {this.props.uploadPdf.inProgress ? (<FontAwesomeIcon className="fas fa-spinner fa-spin" icon='spinner' />) : 'Submit Document'}
              </button>
            </div>

          </div>


          <div className="card shadow-sm mb-5">
            <div className="card-header text-center">
              UPLOADED PDF FILES
          </div>
            <div className="card-body">
              {this.props.getPdfList.data ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">File Name</th>
                      <th scope="col" className="text-center">Number of Pages</th>
                      <th scope="col" className="text-center">Config</th>
                      <th scope="col" className="text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.getPdfList.data.map((pdf, index) => (
                      <tr key={`pdf-${index}`}>
                        <td>{pdf.fileName}{pdf.extension}</td>
                        <td className="text-center">{pdf.numOfPages}</td>
                        <td className="text-center"><FontAwesomeIcon className="fas fa-2x cursor-pointer" icon='cog' /></td>
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
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    getPdfList: state.getPdfList,
    uploadPdf: state.uploadPdf,
    removePdf: state.removePdf
  }
}

const mapActionsToProps = {
  onUploadPdf: uploadPdf,
  onGetPdfList: getPdfList,
  onRemovePdf: removePdf
};

const connected = connect(mapStateToProps, mapActionsToProps)(PdfUpload);

export { connected as PdfUpload };