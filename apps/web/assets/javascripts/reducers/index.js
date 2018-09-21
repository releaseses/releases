import { combineReducers } from 'redux'
import { release } from './release'
import { releases } from './releases'
import { tags } from './tags'

const rootReducer = combineReducers({
    releases,
    release,
    tags,
})

export default rootReducer