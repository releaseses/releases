import {
    REQUEST_TAGS,
    RECEIVE_TAGS
} from '../constants/ActionTypes'

const initialState = {
    "isFetching": false,
    "items": []
}

export const tags = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TAGS:
            return {
                ...state,
                isFetching: true
            }

        case RECEIVE_TAGS:
            return {
                ...state,
                isFetching: false,
                items: action.tags,
            }

        default:
            return state
    }
}
