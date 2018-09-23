import { combineReducers } from 'redux'
import { release } from './release'
import { releases } from './releases'
import { create_release } from './create_release'
import { tags } from './tags'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    releases,
    release,
    create_release,
    tags,
    form: formReducer
})

export default rootReducer