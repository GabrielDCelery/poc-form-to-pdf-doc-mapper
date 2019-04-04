import {
  REMOVE_PDF_START,
  REMOVE_PDF_SUCCESS,
  REMOVE_PDF_FAIL
} from '../constants';

import { pdf } from 'services';

export function removePdf(_fileName) {
  return async dispatch => {
    dispatch({ type: REMOVE_PDF_START });

    const _result = await pdf.remove(_fileName);

    if (_result.success === true) {
      return dispatch({ type: REMOVE_PDF_SUCCESS });
    }

    return dispatch({ type: REMOVE_PDF_FAIL });
  };
}