import { Reducer } from "redux"
import { iSpotifyApiActions, iSpotifyApiData } from "../redux"

const initialState: iSpotifyApiData = null

const reducer: Reducer<iSpotifyApiData, iSpotifyApiActions> = (
	state = initialState,
	action: iSpotifyApiActions
): iSpotifyApiData => {
	switch (action.type) {
		case "SET_SPOTIFY_API":
			return action.payload.spotify_api
		default:
			return state
	}
}

export default reducer