import React from 'react'
import { connect } from 'react-redux'
import TagSelect from '../components/TagSelect'
import { fetchTags } from '../actions/index'

const mapStateToProps = (state) => ({
    options: state.tags.response.entities.tags,
})

const mapDispatchToEvents = (dispatch) => {
    return {
        fetchTags: () => {
            dispatch(fetchTags())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToEvents)(TagSelect)
