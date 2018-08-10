import React from 'react'
import { connect } from 'react-redux'
import ReleaseForm from '../components/ReleaseForm'
import { fetchRelease, updateRelease } from "../actions/index"
import { reduxForm } from "redux-form"
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
    isFetching: state.release.isFetching,
    validationErrors: state.release.validationErrors,
    release: state.release.item,
    buttonClass: 'is-primary',
    buttonText: 'Update'
})

const mapDispatchToEvents = (dispatch, props) => {
    return {
        fetchInitialState: () => {
            return dispatch(fetchRelease(props.match.params.id))
        },
        submitSuccessfully: (attributes) => {
            const release = {
                ...attributes,
                summary_html: new showdown.Converter().makeHtml(attributes.summary_raw)
            }
            return dispatch(updateRelease(props.match.params.id, release))
        },
    };
}

const Form = reduxForm({
    form: 'release',
    validate
})(ReleaseForm)

export default connect(
    state => ({
        initialValues: state.release.item,
        successfullyUpdated: state.release.successfullyUpdated,
        enableReinitialize: true
    }),
    mapDispatchToEvents
)(connect(
    mapStateToProps
)(Form))
