import {legacy_createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {reducer as notesReducer} from './notesReducer/reducer'
import {reducer as authReducer} from './authReducer/reducer'

const rootReducer = combineReducers({notesReducer, authReducer})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))