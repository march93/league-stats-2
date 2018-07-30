import { SEARCH_VALUE, SEARCH_MATCHES } from '../constants/Constants';

export const searchValue = search => ({ type: SEARCH_VALUE, payload: search });
export const searchMatches = matches => ({ type: SEARCH_MATCHES, payload: matches });