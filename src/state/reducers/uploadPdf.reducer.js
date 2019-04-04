import {
  UPLOAD_PDF_START,
  UPLOAD_PDF_FAIL,
  UPLOAD_PDF_SUCCESS
} from '../constants';

const initialState = {
  inProgress: false,
  success: false,
  fail: false
};

export default function uploadPdf(state = initialState, { type }) {
  switch (type) {
    case UPLOAD_PDF_START:
      return {
        inProgress: true,
        success: false,
        fail: false
      };
    case UPLOAD_PDF_SUCCESS:
      return {
        inProgress: false,
        success: true,
        fail: false
      };
    case UPLOAD_PDF_FAIL:
      return {
        inProgress: false,
        success: false,
        fail: true
      };
    default:
      return state;
  }
}