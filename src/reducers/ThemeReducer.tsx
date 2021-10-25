import { Reducer } from "redux"
import { iThemeActions, iThemeData } from "../redux"

const initialState: iThemeData = "dark"

const reducer: Reducer<iThemeData, iThemeActions> = (state = initialState, action: iThemeActions) => {
	switch (action.type) {
		case "SET_THEME":
			return action.payload.theme
		default:
			return state
	}
}

export default reducer