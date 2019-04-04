import axios from 'axios';

class Pdf {
  async upload(_name, _document) {
    const _payload = new FormData();

    _payload.append('name', _name);
    _payload.append('file', _document);

    const _result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/pdf/save`, _payload);

    return _result['data'];
  }

  async getList() {
    const _result = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/pdf/getlist`);

    return _result['data'];
  }

  async remove(_fileName) {
    const _result = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/pdf/remove`, {
      fileName: _fileName
    });

    return _result['data'];
  }
}

export default new Pdf();