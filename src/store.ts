import { configureStore } from "@reduxjs/toolkit"

import ErrorReducer from "./slices/ErrorSlice"
import SnackbarReducer from "./slices/SnackbarSlice"
import ThemeReducer from "./slices/ThemeSlice"
import TokenReducer from "./slices/TokenSlice"

const store = configureStore({
	reducer: {
		theme: ThemeReducer,
		token: TokenReducer,
		error: ErrorReducer,
		snackbar: SnackbarReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
