import Spotify from "spotify-web-api-js"
import { iSetSpotifyApi } from "../redux"

export const set_spotify_api = (spotify_api: Spotify.SpotifyWebApiJs | null): iSetSpotifyApi => ({
	type: "SET_SPOTIFY_API",
	payload: {
		spotify_api
	}
})
