import {
  SAVE_DOCUMENT
} from '../constants';

export default function pdfconfig(state = {}, { type, payload }) {
  switch (type) {
    case SAVE_DOCUMENT:
      return state;
    default:
      return state;
  }
}