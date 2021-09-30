import { Reducer } from "redux"
import { iAccessTokenActions, iInitialAccessToken } from "../redux"

const initialState: iInitialAccessToken = null

const reducer: Reducer<iInitialAccessToken, iAccessTokenActions> = (
	state = initialState,
	action: iAccessTokenActions
): iInitialAccessToken => {
	switch (action.type) {
		case "SET_ACCESS_TOKEN":
			return action.payload.access_token
		default:
			return state
	}
}

export default reducer
