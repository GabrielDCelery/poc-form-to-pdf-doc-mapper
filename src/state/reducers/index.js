import { combineReducers } from 'redux';

import pdfconfig from './pdfconfig.reducer';
import ajax from './ajax.reducer';

const combinedReducers = combineReducers({
  pdfconfig: pdfconfig,
  ajax: ajax
});

export default combinedReducers;