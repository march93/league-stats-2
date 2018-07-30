import {
    SEARCH_VALUE,
    SEARCH_MATCHES,
    UPDATE_END_INDEX,
    UPDATE_USERNAME
} from '../constants/Constants';

export const searchValue = search => ({ type: SEARCH_VALUE, payload: search });
export const searchMatches = matches => ({ type: SEARCH_MATCHES, payload: matches });
export const updateEndIndex = index => ({ type: UPDATE_END_INDEX, payload: index });
export const updateUsername = name => ({ type: UPDATE_USERNAME, payload: name });