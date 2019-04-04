import {
  GET_PDF_LIST_START,
  GET_PDF_LIST_SUCCESS,
  GET_PDF_LIST_FAIL
} from '../constants';

import { pdf } from 'services';

export function getPdfList(_name, _document) {
  return async dispatch => {
    dispatch({ type: GET_PDF_LIST_START });

    const _result = await pdf.getList(_name);

    if (_result.success === true) {
      return dispatch({ type: GET_PDF_LIST_SUCCESS, payload: _result['payload'] });
    }

    return dispatch({ type: GET_PDF_LIST_FAIL });
  };
}