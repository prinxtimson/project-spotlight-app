import {
    CLEAR_LIVECALL,
    DELETE_LIVECALL,
    LIVECALL_ERROR,
    LIVECALL_LOADING,
    SET_LIVECALL,
    SET_LIVECALLS,
    UPDATE_LIVECALL,
    UPDATE_LIVECALL_ADMIN,
} from "../actions/types";

const initialState = {
    loading: true,
    livecalls: null,
    livecall: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LIVECALL_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
        case SET_LIVECALLS:
            return {
                ...state,
                loading: false,
                livecalls: payload,
            };
        case SET_LIVECALL:
            return {
                ...state,
                loading: false,
                livecall: payload,
            };
        case UPDATE_LIVECALL_ADMIN:
            let i = state.livecalls.data.findIndex(
                (item) => item.id === payload.id
            );
            if (i > -1) state.livecalls.data[i] = payload;
            else state.livecalls.data.unshift(payload);
            return {
                ...state,
                loading: false,
                livecalls: { ...state.livecalls },
            };
        case UPDATE_LIVECALL:
            let ind = state.livecalls?.findIndex(
                (item) => item.id === payload.id
            );
            if (ind > -1) state.livecalls[ind] = payload;
            return {
                ...state,
                loading: false,
                livecalls: [...state.livecalls],
            };
        case DELETE_LIVECALL:
            let data = state.livecalls.data.filter((val) => val.id !== payload);
            return {
                ...state,
                loading: false,
                livecalls: { ...state.livecalls, data },
            };
        case CLEAR_LIVECALL:
            return {
                loading: true,
                livecalls: null,
                livecall: null,
            };
        case LIVECALL_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
