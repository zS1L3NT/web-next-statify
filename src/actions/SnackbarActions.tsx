import { iClearSnackbar, iSetSnackbar, iSnackbarData } from "../redux"

export const set_snackbar = (snackbar: iSnackbarData): iSetSnackbar => ({
	type: "SET_SNACKBAR",
	payload: snackbar
})

export const clear_snackbar = (): iClearSnackbar => ({
	type: "CLOSE_SNACKBAR"
})
