import {
    REQUEST_RELEASES,
    RECEIVE_RELEASES,
    REQUEST_RELEASE,
    RECEIVE_RELEASE,
    REQUEST_RELEASE_EDIT,
    REQUEST_RELEASE_EDIT_FAILED,
    RECEIVE_RELEASE_EDIT,
    REQUEST_RELEASE_CREATE,
    REQUEST_RELEASE_CREATE_FAILED,
    RECEIVE_RELEASE_CREATE,
} from '../constants/ActionTypes'

import { SubmissionError } from 'redux-form'

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

        return fetch('/builder/releases', {
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
            .then(response => dispatch(receiveReleases(response.releases)))
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

export function fetchRelease(id) {
    return (dispatch) => {
        dispatch(requestRelease())

        return fetch(`/builder/releases/${id}`, {
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
            .then(response => dispatch(receiveRelease(response)))
    }
}

/*
 *
 */

function requestReleaseEdit() {
    return {
        type: REQUEST_RELEASE_EDIT
    }
}

function requestReleaseEditFailed(errors) {
    return {
        type: REQUEST_RELEASE_EDIT_FAILED,
        ...errors
    }
}

function receiveReleaseEdit(release) {
    return {
        type: RECEIVE_RELEASE_EDIT,
        ...release
    }
}

export function updateRelease(id, properties) {
    return (dispatch) => {
        dispatch(requestReleaseEdit())
        return fetch(`/builder/releases/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ release: properties })
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw response.json()
            }
        })
            .then((response) => { dispatch(receiveReleaseEdit(response)) })
            .catch((response) => {
                return response.then((content) => {
                    dispatch(requestReleaseEditFailed(content))
                    throw new SubmissionError(content.errors.release)
                })
            });
    }
}

/*
 *
 */

function requestReleaseCreate() {
    return {
        type: REQUEST_RELEASE_CREATE
    }
}

function requestReleaseCreateFailed(errors) {
    return {
        type: REQUEST_RELEASE_CREATE_FAILED,
        ...errors
    }
}

function receiveReleaseCreate(release) {
    return {
        type: RECEIVE_RELEASE_CREATE,
        ...release
    }
}

export function storeRelease(properties) {
    return (dispatch) => {
        dispatch(requestReleaseCreate())

        return fetch('/builder/releases', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({release: properties})
        }).then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                throw response.json()
            }
        })
            .then((response) => { return dispatch(receiveReleaseCreate(response)) })
            .catch((response) => {
                return response.then((content) => {
                    dispatch(requestReleaseCreateFailed(content))
                    throw new SubmissionError(content.errors.release)
                })
            });
    }
}
