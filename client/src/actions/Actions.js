import {
    SEARCH_VALUE,
    SEARCH_MATCHES,
    UPDATE_ID,
    ADD_MATCHES,
    UPDATE_END_INDEX
} from '../constants/Constants';

export const searchValue = search => ({ type: SEARCH_VALUE, payload: search });
export const searchMatches = matches => ({ type: SEARCH_MATCHES, payload: matches });
export const updateID = id => ({ type: UPDATE_ID, payload: id });
export const addMatches = matches => ({ type: ADD_MATCHES, payload: matches });
export const updateEndIndex = index => ({ type: UPDATE_END_INDEX, payload: index });