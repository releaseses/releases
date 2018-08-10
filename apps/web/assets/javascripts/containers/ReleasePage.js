import React from 'react'
import { connect } from 'react-redux'
import Release from '../components/Release'
import { fetchRelease, resetRelease } from '../actions/index'
import { push } from 'connected-react-router'

const mapStateToProps = (state) => ({
    isFetching: state.release.isFetching,
    notFound: state.release.notFound,
    release: state.release.item,
})

const mapDispatchToEvents = (dispatch, props) => {
    return {
        fetchRelease: () => {
            return dispatch(fetchRelease(props.match.params.version))
        },
        resetRelease: () => {
            dispatch(push('/error/404'))
            return dispatch(resetRelease())
        }
    }
}

export default connect( mapStateToProps, mapDispatchToEvents )(Release)
