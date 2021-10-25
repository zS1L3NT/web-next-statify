import { Reducer } from "redux"
import { iErrorActions, iErrorData } from "../redux"

const initialState: iErrorData = null

const reducer: Reducer<iErrorData, iErrorActions> = (state = initialState, action: iErrorActions) => {
	switch (action.type) {
		case "SET_ERROR":
			return action.payload.error
		default:
			return state
	}
}

export default reducer