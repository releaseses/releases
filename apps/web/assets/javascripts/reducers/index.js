import { combineReducers } from 'redux'
import { release } from './release'
import { releases } from './releases'

const rootReducer = combineReducers({
    releases,
    release,
})

export default rootReducer