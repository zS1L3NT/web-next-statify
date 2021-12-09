import {
	iSetStatisticsArtistsLongTerm,
	iSetStatisticsArtistsMediumTerm,
	iSetStatisticsArtistsShortTerm,
	iSetStatisticsRecents,
	iSetStatisticsTracksLongTerm,
	iSetStatisticsTracksMediumTerm,
	iSetStatisticsTracksShortTerm
} from "../redux"

export const set_statistics_tracks_short_term = (
	short_term: SpotifyApi.TrackObjectFull[] | null
): iSetStatisticsTracksShortTerm => ({
	type: "SET_STATISTICS_TRACKS_SHORT_TERM",
	payload: {
		short_term
	}
})

export const set_statistics_tracks_medium_term = (
	medium_term: SpotifyApi.TrackObjectFull[] | null
): iSetStatisticsTracksMediumTerm => ({
	type: "SET_STATISTICS_TRACKS_MEDIUM_TERM",
	payload: {
		medium_term
	}
})

export const set_statistics_tracks_long_term = (
	long_term: SpotifyApi.TrackObjectFull[] | null
): iSetStatisticsTracksLongTerm => ({
	type: "SET_STATISTICS_TRACKS_LONG_TERM",
	payload: {
		long_term
	}
})

export const set_statistics_artists_short_term = (
	short_term: SpotifyApi.ArtistObjectFull[] | null
): iSetStatisticsArtistsShortTerm => ({
	type: "SET_STATISTICS_ARTISTS_SHORT_TERM",
	payload: {
		short_term
	}
})

export const set_statistics_artists_medium_term = (
	medium_term: SpotifyApi.ArtistObjectFull[] | null
): iSetStatisticsArtistsMediumTerm => ({
	type: "SET_STATISTICS_ARTISTS_MEDIUM_TERM",
	payload: {
		medium_term
	}
})

export const set_statistics_artists_long_term = (
	long_term: SpotifyApi.ArtistObjectFull[] | null
): iSetStatisticsArtistsLongTerm => ({
	type: "SET_STATISTICS_ARTISTS_LONG_TERM",
	payload: {
		long_term
	}
})

export const set_statistics_recents = (
	recents: SpotifyApi.PlayHistoryObject[] | null
): iSetStatisticsRecents => ({
	type: "SET_STATISTICS_RECENTS",
	payload: {
		recents
	}
})
