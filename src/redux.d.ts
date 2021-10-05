import Spotify from "spotify-web-api-js"

/**
 * Access Token
 */
export type iAccessTokenData = string | null

export interface iSetAccessToken {
	type: "SET_ACCESS_TOKEN"
	payload: {
		access_token: string | null
	}
}

export type iAccessTokenActions = iSetAccessToken

/**
 * Spotify Api
 */
export type iSpotifyApiData = Spotify.SpotifyWebApiJs | null

export interface iSetSpotifyApi {
	type: "SET_SPOTIFY_API",
	payload: {
		spotify_api: Spotify.SpotifyWebApiJs | null
	}
}

export type iSpotifyApiActions = iSetSpotifyApi