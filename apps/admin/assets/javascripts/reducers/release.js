import {
    REQUEST_RELEASE,
    RECEIVE_RELEASE,
    REQUEST_RELEASE_EDIT,
    REQUEST_RELEASE_EDIT_FAILED,
    RECEIVE_RELEASE_EDIT
} from '../constants/ActionTypes'

const initialState = {
    isFetching: false,
    successfullyUpdated: false,
    validationErrors: {
        version: [],
        title: [],
        released_at: [],
        summary_raw: [],
        summary_html: [],
    },
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

        case REQUEST_RELEASE_EDIT:
            return {
                ...state,
                isFetching: true,
                successfullyUpdated: false
            }
        case REQUEST_RELEASE_EDIT_FAILED:
            return {
                ...state,
                isFetching: false,
                successfullyUpdated: false,
                validationErrors: {...initialState.validationErrors, ...action.errors.release}
            }
        case RECEIVE_RELEASE_EDIT:
            return {
                ...state,
                isFetching: false,
                successfullyUpdated: true,
                validationErrors: initialState.validationErrors,
                item: action.release
            }

        default:
            return state
    }
}
