import {
    REQUEST_RELEASES,
    RECEIVE_RELEASES,
    REQUEST_RELEASE,
    RECEIVE_RELEASE,
    RELEASE_NOT_FOUND,
    RESET_RELEASE,
} from '../constants/ActionTypes'

/*
 *
 */

function requestReleases() {
    return {
        type: REQUEST_RELEASES
    }
}

function receiveReleases(releases) {
    return {
        type: RECEIVE_RELEASES,
        releases
    }
}

export function fetchReleases() {
    return (dispatch) => {
        dispatch(requestReleases())

        return fetch('/viewer/releases', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw response.json()
            }
        })
            .then(response => dispatch(receiveReleases(response.releases)));
    }
}

/*
 *
 */

function requestRelease() {
    return {
        type: REQUEST_RELEASE
    }
}

function receiveRelease(release) {
    return {
        type: RECEIVE_RELEASE,
        release
    }
}

function releaseNotFound(response) {
    return {
        type: RELEASE_NOT_FOUND,
        response
    }
}

export function fetchRelease(id) {
    return (dispatch) => {
        dispatch(requestRelease())

        return fetch(`/viewer/releases/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw response
            }
        })
            .then(response => dispatch(receiveRelease(response)))
            .catch((response) => {
                if(response.status === 404) {
                    return dispatch(releaseNotFound(response))
                }
                return dispatch(releaseNotFound(response))
            })
    }
}

export function resetRelease() {
    return {
        type: RESET_RELEASE
    }
}
