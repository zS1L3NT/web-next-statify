import { Reducer } from "redux"
import { iAccessTokenActions, iAccessTokenData } from "../redux"

const initialState: iAccessTokenData = null

const reducer: Reducer<iAccessTokenData, iAccessTokenActions> = (
	state = initialState,
	action: iAccessTokenActions
): iAccessTokenData => {
	switch (action.type) {
		case "SET_ACCESS_TOKEN":
			return action.payload.access_token
		default:
			return state
	}
}

export default reducer
