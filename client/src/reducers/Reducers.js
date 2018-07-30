import { SEARCH_VALUE, SEARCH_MATCHES } from '../constants/Constants';

const initialState = {
    search: '',
    matches: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_VALUE:
            return { ...state, search: action.payload };
        case SEARCH_MATCHES:
            return { ...state, matches: action.payload };
        default:
            return state;
    }
};

export default rootReducer;