import { combineReducers } from 'redux';

import uploadPdf from './uploadPdf.reducer';
import getPdfList from './getPdfList.reducer';
import removePdf from './removePdf.reducer';

const combinedReducers = combineReducers({
  uploadPdf: uploadPdf,
  getPdfList: getPdfList,
  removePdf: removePdf
});

export default combinedReducers;