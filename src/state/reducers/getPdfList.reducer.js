import {
  GET_PDF_LIST_START,
  GET_PDF_LIST_SUCCESS,
  GET_PDF_LIST_FAIL
} from '../constants';

const initialState = {
  inProgress: false,
  success: false,
  fail: false,
  data: null,
  error: null
};

export default function getPdfList(state = initialState, { type, pdfs, errorMessage }) {
  switch (type) {
    case GET_PDF_LIST_START:
      return {
        ...state,
        ...{
          inProgress: true,
          success: false,
          fail: false,
          error: null
        }
      }
    case GET_PDF_LIST_SUCCESS:
      return {
        ...state,
        ...{
          inProgress: false,
          success: true,
          fail: false,
          data: pdfs,
          error: null
        }
      }
    case GET_PDF_LIST_FAIL:
      return {
        ...state,
        ...{
          inProgress: false,
          success: false,
          fail: true,
          error: errorMessage
        }
      }
    default:
      return state;
  }
}