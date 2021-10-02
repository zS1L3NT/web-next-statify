import { combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import access_token from "./reducers/AccessTokenReducer"

const rootReducer = combineReducers({ access_token })

const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))

export type AppState = ReturnType<typeof rootReducer>
export type iStore = typeof store
export default store