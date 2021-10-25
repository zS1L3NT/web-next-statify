import { Reducer } from "redux"
import { iThemeActions, iThemeData } from "../redux"

const theme = localStorage.getItem("theme") || ""
const initialState: iThemeData = ["light", "dark"].includes(theme) ? (theme as "light" | "dark") : "dark"

const reducer: Reducer<iThemeData, iThemeActions> = (state = initialState, action: iThemeActions) => {
	switch (action.type) {
		case "SET_THEME":
			localStorage.setItem("theme", action.payload.theme)
			return action.payload.theme
		default:
			return state
	}
}

export default reducer
