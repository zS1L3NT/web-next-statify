import { Reducer } from "redux"
import { iErrorActions, iErrorData } from "../redux"

const initial_state: iErrorData = null

const reducer: Reducer<iErrorData, iErrorActions> = (state = initial_state, action: iErrorActions) => {
	switch (action.type) {
		case "SET_ERROR":
			return action.payload.error
		default:
			return state
	}
}

export default reducer
