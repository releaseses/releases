import {
    REQUEST_RELEASE_CREATE,
    REQUEST_RELEASE_CREATE_FAILED,
    RECEIVE_RELEASE_CREATE,
} from '../constants/ActionTypes'

const initialState = {
    isFetching: false,
    validationErrors: {
        version: [],
        title: [],
        released_at: [],
        summary_raw: [],
        summary_html: [],
    },
    lastCreatedId: null,
    item: {
        version: '',
        title: '',
        released_at: '',
        summary_raw: '',
        summary_html: '',
    }
}

export const create_release = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_RELEASE_CREATE:
            return {
                ...state,
                isFetching: true
            }
        case REQUEST_RELEASE_CREATE_FAILED:
            return {
                ...state,
                isFetching: false,
                validationErrors: {...initialState.validationErrors, ...action.errors.release}
            }
        case RECEIVE_RELEASE_CREATE:
            return {
                ...state,
                isFetching: false,
                validationErrors: initialState.validationErrors,
                lastCreatedId: action.release.id,
                item: action.release
            }

        default:
            return state
    }
}
