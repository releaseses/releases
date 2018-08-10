import { combineReducers } from 'redux'
import { release } from './release'
import { releases } from './releases'
import { create_release } from './create_release'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    releases,
    release,
    create_release,
    form: formReducer
})

export default rootReducer