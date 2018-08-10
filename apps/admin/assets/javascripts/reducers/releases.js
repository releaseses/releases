import {
    REQUEST_RELEASES,
    RECEIVE_RELEASES
} from '../constants/ActionTypes'

const initialState = {
    "isFetching": false,
    "items": []
}

export const releases = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_RELEASES:
            return {
                ...state,
                isFetching: true
            }

        case RECEIVE_RELEASES:
            return {
                ...state,
                // ...action.releases.reduce((obj, release) => {
                //     obj[release.id] = release
                //     return obj
                // }, {}),
                isFetching: false,
                items: action.releases,
            }

        default:
            return state
    }
}
