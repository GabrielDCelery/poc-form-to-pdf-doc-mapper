import {
  REMOVE_PDF_START,
  REMOVE_PDF_SUCCESS,
  REMOVE_PDF_FAIL
} from '../constants';

import { pdf } from 'services';
import { getPdfList } from './getPdfList.actions';

export function removePdf(_fileName) {
  return async dispatch => {
    dispatch({ type: REMOVE_PDF_START });

    const _result = await pdf.remove(_fileName);

    if (_result.success === true) {
      dispatch({ type: REMOVE_PDF_SUCCESS });
      return dispatch(getPdfList());
    }

    return dispatch({ type: REMOVE_PDF_FAIL });
  };
}