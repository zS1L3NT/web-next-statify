import { combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import theme from "./reducers/ThemeReducer"
import access_token from "./reducers/AccessTokenReducer"
import spotify_api from "./reducers/SpotifyApiReducer"
import error from "./reducers/ErrorReducer"
import statistics from "./reducers/StatisticsReducer"

const rootReducer = combineReducers({ theme, access_token, spotify_api, error, statistics })

const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))

export type AppState = ReturnType<typeof rootReducer>
export type iStore = typeof store
export default store
