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

export default function getPdfList(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PDF_LIST_START:
      return {
        inProgress: true,
        success: false,
        fail: false,
        data: null,
        error: null
      };
    case GET_PDF_LIST_SUCCESS:
      return {
        inProgress: false,
        success: true,
        fail: false,
        data: payload,
        error: null
      };
    case GET_PDF_LIST_FAIL:
      return {
        inProgress: false,
        success: false,
        fail: true,
        data: null,
        error: null
      };
    default:
      return state;
  }
}