import React from 'react'
import { connect } from 'react-redux'
import TagPanel from '../components/TagPanel'
import { fetchTags } from '../actions/index'

const mapStateToProps = (state) => ({
    isFetching: state.tags.isFetching,
    tags: state.tags.items,
})

const mapDispatchToEvents = (dispatch) => {
    return {
        fetchTags: () => {
            dispatch(fetchTags())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToEvents)(TagPanel)
