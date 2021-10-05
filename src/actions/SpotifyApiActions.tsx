import Spotify from "spotify-web-api-js"
import { iSetSpotifyApi } from "../redux"

export const setSpotifyApi = (spotify_api: Spotify.SpotifyWebApiJs | null): iSetSpotifyApi => ({
	type: "SET_SPOTIFY_API",
	payload: {
		spotify_api
	}
})
