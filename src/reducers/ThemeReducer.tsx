import { Reducer } from "redux"
import { iThemeActions, iThemeData } from "../redux"

const theme = localStorage.getItem("theme") || ""
const initial_state: iThemeData = ["light", "dark"].includes(theme) ? (theme as "light" | "dark") : "dark"

const reducer: Reducer<iThemeData, iThemeActions> = (state = initial_state, action: iThemeActions) => {
	switch (action.type) {
		case "SET_THEME":
			localStorage.setItem("theme", action.payload.theme)
			return action.payload.theme
		default:
			return state
	}
}

export default reducer
