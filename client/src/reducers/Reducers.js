import { SEARCH_MATCHES } from '../constants/Constants';

const initialState = {
    matches: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_MATCHES:
            return { ...state, matches: action.payload };
        default:
            return state;
    }
};

export default rootReducer;