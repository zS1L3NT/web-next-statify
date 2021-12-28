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
		set_snackbar: (state, action: PayloadAction<iSnackbarData>) => {
			return action.payload
		},
		clear_snackbar: state => {
			state.open = false
		}
	}
})

export const { set_snackbar, clear_snackbar } = slice.actions
export default slice.reducer
