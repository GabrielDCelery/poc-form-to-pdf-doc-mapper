import {
  REMOVE_PDF_START,
  REMOVE_PDF_FAIL,
  REMOVE_PDF_SUCCESS
} from '../constants';

const initialState = {
  inProgress: false,
  success: false,
  fail: false
};

export default function removePdf(state = initialState, { type }) {
  switch (type) {
    case REMOVE_PDF_START:
      return {
        inProgress: true,
        success: false,
        fail: false
      };
    case REMOVE_PDF_SUCCESS:
      return {
        inProgress: false,
        success: true,
        fail: false
      };
    case REMOVE_PDF_FAIL:
      return {
        inProgress: false,
        success: false,
        fail: true
      };
    default:
      return state;
  }
}