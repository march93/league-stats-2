import { SEARCH_MATCHES } from '../constants/Constants';

export const searchMatches = matches => ({ type: SEARCH_MATCHES, payload: matches });