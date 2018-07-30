import {
    SEARCH_VALUE,
    SEARCH_MATCHES,
    UPDATE_END_INDEX,
    UPDATE_USERNAME
} from '../constants/Constants';

const initialState = {
    search: '',
    matches: [],
    endIndex: 10,
    username: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_VALUE:
            return { ...state, search: action.payload };
        case SEARCH_MATCHES:
            return { ...state, matches: action.payload };
        case UPDATE_END_INDEX:
            return { ...state, endIndex: action.payload };
        case UPDATE_USERNAME:
            return { ...state, username: action.payload };
        default:
            return state;
    }
};

export default rootReducer;