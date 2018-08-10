import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import ReleaseForm from '../components/ReleaseForm'
import { storeRelease } from '../actions/index'
import { push } from 'connected-react-router'
const showdown = require('showdown')

const validate = (values) => {
    const errors = {}
    if (!values.version) {
        errors.version = 'Required'
    }
    if (!values.title) {
        errors.title = 'Required'
    }
    if (!values.released_at) {
        errors.released_at = 'Required'
    }
    return errors
}

const mapStateToProps = (state) => ({
    isFetching: state.create_release.isFetching,
    validationErrors: state.create_release.validationErrors,
    release: state.create_release.item,
    buttonClass: 'is-success',
    buttonText: 'Create'
})

const mapDispatchToEvents = (dispatch) => {
    return {
        fetchInitialState: () => { },
        submitSuccessfully: (properties) => {
            const release = {
                ...properties,
                summary_html: new showdown.Converter().makeHtml(properties.summary_raw)
            }
            return dispatch(storeRelease(release))
                .then((action) => dispatch(push(`/admin/releases/${action.release.id}/edit`)))
        }
    }
}

const Form = reduxForm({
    form: 'release',
    validate
})(ReleaseForm)

export default connect(
    mapStateToProps,
    mapDispatchToEvents
)(Form)
