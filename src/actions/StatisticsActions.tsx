import { iSetStatistics } from "../redux"

export const set_statistics = (
	tracks_short_term: SpotifyApi.TrackObjectFull[],
	tracks_medium_term: SpotifyApi.TrackObjectFull[],
	tracks_long_term: SpotifyApi.TrackObjectFull[],
	artists_short_term: SpotifyApi.ArtistObjectFull[],
	artists_medium_term: SpotifyApi.ArtistObjectFull[],
	artists_long_term: SpotifyApi.ArtistObjectFull[],
	recents: SpotifyApi.PlayHistoryObject[]
): iSetStatistics => ({
	type: "SET_STATISTICS",
	payload: {
		tracks: {
			short_term: tracks_short_term,
			medium_term: tracks_medium_term,
			long_term: tracks_long_term
		},
		artists: {
			short_term: artists_short_term,
			medium_term: artists_medium_term,
			long_term: artists_long_term
		},
		recents
	}
})
