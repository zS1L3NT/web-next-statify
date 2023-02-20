import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type iSnackbarData = {
	open: boolean
	message: string
	variant: "success" | "error" | "warning" | "info"
}

const slice = createSlice({
	name: "snackbar",
	initialState: {
		open: false,
		message: "",
		variant: "error"
	} as iSnackbarData,
	reducers: {
		setSnackbar: (state, action: PayloadAction<iSnackbarData>) => {
			return action.payload
		},
		clearSnackbar: state => {
			state.open = false
		}
	}
})

export const { setSnackbar, clearSnackbar } = slice.actions
export default slice.reducer
