import AccessTokenReducer from "./slices/AccessTokenSlice"
import ErrorReducer from "./slices/ErrorSlice"
import SnackbarReducer from "./slices/SnackbarSlice"
import StatisticsReducer from "./slices/StatisticsSlice"
import ThemeReducer from "./slices/ThemeSlice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
	reducer: {
		theme: ThemeReducer,
		access_token: AccessTokenReducer,
		error: ErrorReducer,
		snackbar: SnackbarReducer,
		statistics: StatisticsReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store