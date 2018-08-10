import {
    REQUEST_RELEASE,
    RECEIVE_RELEASE,
    RELEASE_NOT_FOUND,
    RESET_RELEASE
} from '../constants/ActionTypes'

const initialState = {
    isFetching: false,
    notFound: false,
    item: {
        version: '',
        title: '',
        released_at: '',
        summary_raw: '',
        summary_html: '',
    }
}

export const release = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_RELEASE:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_RELEASE:
            return {
                ...state,
                isFetching: false,
                item: action.release
            }
        case RELEASE_NOT_FOUND:
            return {
                ...state,
                isFetching: false,
                notFound: true
            }
        case RESET_RELEASE:
            return initialState

        default:
            return state
    }
}
