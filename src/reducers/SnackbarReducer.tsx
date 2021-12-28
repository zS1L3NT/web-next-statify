import { iSnackbarActions, iSnackbarData } from "../redux"
import { Reducer } from "redux"

const initial_state: iSnackbarData = {
	open: false,
	message: "",
	variant: "error"
}

const reducer: Reducer<iSnackbarData, iSnackbarActions> = (
	state = initial_state,
	action: iSnackbarActions
): iSnackbarData => {
	switch (action.type) {
		case "SET_SNACKBAR":
			return action.payload
		case "CLOSE_SNACKBAR":
			return {
				...state,
				open: false
			}
		default:
			return state
	}
}

export default reducer
