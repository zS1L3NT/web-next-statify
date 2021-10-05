import {
	iSetStatisticsTracksShortTerm,
	iSetStatisticsTracksMediumTerm,
	iSetStatisticsTracksLongTerm,
	iSetStatisticsArtistsShortTerm,
	iSetStatisticsArtistsMediumTerm,
	iSetStatisticsArtistsLongTerm
} from "../redux"

export const setStatisticsTracksShortTerm = (
	short_term: SpotifyApi.TrackObjectFull[] | null
): iSetStatisticsTracksShortTerm => ({
	type: "SET_STATISTICS_TRACKS_SHORT_TERM",
	payload: {
		short_term
	}
})

export const setStatisticsTracksMediumTerm = (
	medium_term: SpotifyApi.TrackObjectFull[] | null
): iSetStatisticsTracksMediumTerm => ({
	type: "SET_STATISTICS_TRACKS_MEDIUM_TERM",
	payload: {
		medium_term
	}
})

export const setStatisticsTracksLongTerm = (
	long_term: SpotifyApi.TrackObjectFull[] | null
): iSetStatisticsTracksLongTerm => ({
	type: "SET_STATISTICS_TRACKS_LONG_TERM",
	payload: {
		long_term
	}
})

export const setStatisticsArtistsShortTerm = (
	short_term: SpotifyApi.ArtistObjectFull[] | null
): iSetStatisticsArtistsShortTerm => ({
	type: "SET_STATISTICS_ARTISTS_SHORT_TERM",
	payload: {
		short_term
	}
})

export const setStatisticsArtistsMediumTerm = (
	medium_term: SpotifyApi.ArtistObjectFull[] | null
): iSetStatisticsArtistsMediumTerm => ({
	type: "SET_STATISTICS_ARTISTS_MEDIUM_TERM",
	payload: {
		medium_term
	}
})

export const setStatisticsArtistsLongTerm = (
	long_term: SpotifyApi.ArtistObjectFull[] | null
): iSetStatisticsArtistsLongTerm => ({
	type: "SET_STATISTICS_ARTISTS_LONG_TERM",
	payload: {
		long_term
	}
})
