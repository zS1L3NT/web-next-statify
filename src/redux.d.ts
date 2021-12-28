/**
 * Theme
 */
export type iThemeData = "light" | "dark"

export interface iSetTheme {
	type: "SET_THEME"
	payload: {
		theme: iThemeData
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
		access_token: iAccessTokenData
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
 * Snackbar
 */
export interface iSnackbarData {
	message: string | null
	variant: "success" | "error" | "warning" | "info"
}

export interface iSetSnackbar {
	type: "SET_SNACKBAR"
	payload: iSnackbarData
}

export interface iClearSnackbar {
	type: "CLEAR_SNACKBAR"
}

export type iSnackbarActions = iSetSnackbar | iClearSnackbar

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
	payload: iStatisticsData
}

export type iStatisticsActions = iSetStatistics
