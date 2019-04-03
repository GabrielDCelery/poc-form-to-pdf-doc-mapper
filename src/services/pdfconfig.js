import axios from 'axios';

class PdfConfig {
  async saveDocument(_name, _document) {
    const _payload = new FormData();

    _payload.append('name', _name);
    _payload.append('file', _document);

    const _result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/pdfconfig/save`, _payload);

    return _result['data'];
  }
}

export default new PdfConfig();