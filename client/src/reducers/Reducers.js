import {
    SEARCH_VALUE,
    SEARCH_MATCHES,
    UPDATE_END_INDEX
} from '../constants/Constants';

const initialState = {
    search: '',
    matches: [],
    endIndex: 5
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_VALUE:
            return { ...state, search: action.payload };
        case SEARCH_MATCHES:
            return { ...state, matches: action.payload };
        case UPDATE_END_INDEX:
            return { ...state, endIndex: action.payload };
        default:
            return state;
    }
};

export default rootReducer;