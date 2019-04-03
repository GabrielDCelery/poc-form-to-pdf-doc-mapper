import {
  AJAX_START,
  AJAX_SUCCESS,
  AJAX_FAIL,
  AJAX_RESET
} from '../constants';

const initialState = {
  inProgress: false,
  success: false,
  fail: false
};

export default function ajax(state = initialState, { type }) {
  switch (type) {
    case AJAX_RESET:
      return {
        inProgress: false,
        success: false,
        fail: false
      };
    case AJAX_START:
      return {
        inProgress: true,
        success: false,
        fail: false
      };
    case AJAX_SUCCESS:
      return {
        inProgress: false,
        success: true,
        fail: false
      };
    case AJAX_FAIL:
      return {
        inProgress: false,
        success: false,
        fail: true
      };
    default:
      return state;
  }
}