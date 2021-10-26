import { Reducer } from "redux"
import { iAccessTokenActions, iAccessTokenData } from "../redux"

const initial_state: iAccessTokenData = sessionStorage.getItem("access_token")

const reducer: Reducer<iAccessTokenData, iAccessTokenActions> = (
	state = initial_state,
	action: iAccessTokenActions
): iAccessTokenData => {
	switch (action.type) {
		case "SET_ACCESS_TOKEN":
			if (action.payload.access_token) {
				sessionStorage.setItem("access_token", action.payload.access_token)
			} else {
				sessionStorage.removeItem("access_token")
			}
			return action.payload.access_token
		default:
			return state
	}
}

export default reducer
