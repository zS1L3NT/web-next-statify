import access_token from "./reducers/AccessTokenReducer"
import error from "./reducers/ErrorReducer"
import statistics from "./reducers/StatisticsReducer"
import theme from "./reducers/ThemeReducer"
import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

const rootReducer = combineReducers({ theme, access_token, error, statistics })

const store = createStore(rootReducer, composeWithDevTools({ trace: true })())

export type AppState = ReturnType<typeof rootReducer>
export type iStore = typeof store
export default store
