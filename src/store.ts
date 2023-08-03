import { configureStore } from "@reduxjs/toolkit"

import api from "./api/api"
import ErrorReducer from "./slices/ErrorSlice"
import SnackbarReducer from "./slices/SnackbarSlice"
import ThemeReducer from "./slices/ThemeSlice"
import TokenReducer from "./slices/TokenSlice"

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		theme: ThemeReducer,
		token: TokenReducer,
		error: ErrorReducer,
		snackbar: SnackbarReducer,
	},
	middleware: gdm => gdm().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
