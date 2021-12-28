import { iSnackbarActions, iSnackbarData } from "../redux"
import { Reducer } from "redux"

const initial_state: iSnackbarData = {
	message: null,
	variant: "error"
}

const reducer: Reducer<iSnackbarData, iSnackbarActions> = (
	state = initial_state,
	action: iSnackbarActions
): iSnackbarData => {
	switch (action.type) {
		case "SET_SNACKBAR":
			return action.payload
		case "CLEAR_SNACKBAR":
			return initial_state
		default:
			return state
	}
}

export default reducer
