import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type iStatisticsData = {
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

const slice = createSlice({
	name: "statistics",
	initialState: {
		tracks: {
			short_term: [],
			medium_term: [],
			long_term: []
		},
		artists: {
			short_term: [],
			medium_term: [],
			long_term: []
		},
		recents: []
	} as iStatisticsData,
	reducers: {
		set_statistics: (state, action: PayloadAction<iStatisticsData>) => {
			return action.payload
		}
	}
})

export const { set_statistics } = slice.actions
export default slice.reducer
