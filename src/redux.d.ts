/**
 * Theme
 */
export type iThemeData = "light" | "dark"

export interface iSetTheme {
	type: "SET_THEME"
	payload: {
		theme: "light" | "dark"
	}
}

export type iThemeActions = iSetTheme

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
 * Error
 */
export type iErrorData = {
	name: string
	message: string
} | null

export interface iSetError {
	type: "SET_ERROR"
	payload: {
		error: Error | null
	}
}

export type iErrorActions = iSetError

/**
 * Statistics
 */
export interface iStatisticsData {
	tracks: {
		short_term: SpotifyApi.TrackObjectFull[] | null
		medium_term: SpotifyApi.TrackObjectFull[] | null
		long_term: SpotifyApi.TrackObjectFull[] | null
	}
	artists: {
		short_term: SpotifyApi.ArtistObjectFull[] | null
		medium_term: SpotifyApi.ArtistObjectFull[] | null
		long_term: SpotifyApi.ArtistObjectFull[] | null
	}
	recents: SpotifyApi.PlayHistoryObject[] | null
}

export interface iSetStatistics {
	type: "SET_STATISTICS"
	payload: {
		tracks: {
			short_term: SpotifyApi.TrackObjectFull[] | null
			medium_term: SpotifyApi.TrackObjectFull[] | null
			long_term: SpotifyApi.TrackObjectFull[] | null
		}
		artists: {
			short_term: SpotifyApi.ArtistObjectFull[] | null
			medium_term: SpotifyApi.ArtistObjectFull[] | null
			long_term: SpotifyApi.ArtistObjectFull[] | null
		}
		recents: SpotifyApi.PlayHistoryObject[] | null
	}
}

export type iStatisticsActions = iSetStatistics
