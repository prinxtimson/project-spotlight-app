import {
    CLEAR_CALLBACK,
    DELETE_CALLBACK,
    CALLBACK_ERROR,
    CALLBACK_LOADING,
    SET_CALLBACK,
    SET_CALLBACKS,
} from "../actions/types";

const initialState = {
    loading: true,
    callbacks: null,
    callback: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CALLBACK_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_CALLBACKS:
            return {
                ...state,
                loading: false,
                callbacks: payload,
            };
        case SET_CALLBACK:
            return {
                ...state,
                loading: false,
                callback: payload,
            };
        case DELETE_CALLBACK:
            let callbacks = state.callbacks.filter((val) => val.id !== payload);
            return {
                ...state,
                loading: false,
                callbacks,
            };
        case CLEAR_CALLBACK:
            return {
                loading: true,
                callbacks: null,
                callback: null,
            };
        case CALLBACK_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
