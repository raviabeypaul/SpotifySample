import { combineReducers } from '@reduxjs/toolkit'
import HeaderReducer from './slices/header';
const rootReducer = combineReducers({
    header : HeaderReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer