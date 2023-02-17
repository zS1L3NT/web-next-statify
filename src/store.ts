import { configureStore } from "@reduxjs/toolkit"

import AccessTokenReducer from "./slices/AccessTokenSlice"
import ErrorReducer from "./slices/ErrorSlice"
import SnackbarReducer from "./slices/SnackbarSlice"
import ThemeReducer from "./slices/ThemeSlice"

const store = configureStore({
	reducer: {
		theme: ThemeReducer,
		access_token: AccessTokenReducer,
		error: ErrorReducer,
		snackbar: SnackbarReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
