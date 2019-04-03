import {
  AJAX_START,
  AJAX_SUCCESS,
  AJAX_FAIL
} from '../constants';

import { pdfconfig } from 'services';

export function saveDocument(_name, _document) {
  return async dispatch => {
    dispatch({ type: AJAX_START });

    const _result = await pdfconfig.saveDocument(_name, _document);

    if (_result.success === true) {
      return dispatch({ type: AJAX_SUCCESS });
    }

    return dispatch({ type: AJAX_FAIL });
  };
}