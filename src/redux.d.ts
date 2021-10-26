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

export interface iSetStatisticsTracksShortTerm {
	type: "SET_STATISTICS_TRACKS_SHORT_TERM"
	payload: {
		short_term: SpotifyApi.TrackObjectFull[] | null
	}
}

export interface iSetStatisticsTracksMediumTerm {
	type: "SET_STATISTICS_TRACKS_MEDIUM_TERM"
	payload: {
		medium_term: SpotifyApi.TrackObjectFull[] | null
	}
}

export interface iSetStatisticsTracksLongTerm {
	type: "SET_STATISTICS_TRACKS_LONG_TERM"
	payload: {
		long_term: SpotifyApi.TrackObjectFull[] | null
	}
}

export interface iSetStatisticsArtistsShortTerm {
	type: "SET_STATISTICS_ARTISTS_SHORT_TERM"
	payload: {
		short_term: SpotifyApi.ArtistObjectFull[] | null
	}
}

export interface iSetStatisticsArtistsMediumTerm {
	type: "SET_STATISTICS_ARTISTS_MEDIUM_TERM"
	payload: {
		medium_term: SpotifyApi.ArtistObjectFull[] | null
	}
}

export interface iSetStatisticsArtistsLongTerm {
	type: "SET_STATISTICS_ARTISTS_LONG_TERM"
	payload: {
		long_term: SpotifyApi.ArtistObjectFull[] | null
	}
}

export interface iSetStatisticsRecents {
	type: "SET_STATISTICS_RECENTS"
	payload: {
		recents: SpotifyApi.PlayHistoryObject[] | null
	}
}

export type iStatisticsActions =
	| iSetStatisticsTracksShortTerm
	| iSetStatisticsTracksMediumTerm
	| iSetStatisticsTracksLongTerm
	| iSetStatisticsArtistsShortTerm
	| iSetStatisticsArtistsMediumTerm
	| iSetStatisticsArtistsLongTerm
	| iSetStatisticsRecents
