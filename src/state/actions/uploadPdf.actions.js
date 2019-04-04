import {
  UPLOAD_PDF_START,
  UPLOAD_PDF_SUCCESS,
  UPLOAD_PDF_FAIL
} from '../constants';

import { pdf } from 'services';

export function uploadPdf(_name, _document) {
  return async dispatch => {
    dispatch({ type: UPLOAD_PDF_START });

    const _result = await pdf.upload(_name, _document);

    if (_result.success === true) {
      return dispatch({ type: UPLOAD_PDF_SUCCESS });
    }

    return dispatch({ type: UPLOAD_PDF_FAIL });
  };
}