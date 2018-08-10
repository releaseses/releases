import React from 'react'
import { connect } from 'react-redux'
import ReleaseList from '../components/ReleaseList'
import { fetchReleases } from '../actions/index'

const mapStateToProps = (state) => ({
    isFetching: state.releases.isFetching,
    releases: state.releases.items,
})

const mapDispatchToEvents = (dispatch) => {
    return {
        fetchReleases: () => {
            dispatch(fetchReleases())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToEvents)(ReleaseList)
