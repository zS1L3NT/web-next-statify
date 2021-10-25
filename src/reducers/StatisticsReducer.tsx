import { Reducer } from "redux"
import { iStatisticsActions, iStatisticsData } from "../redux"

const initial_state: iStatisticsData = {
	tracks: {
		short_term: null,
		medium_term: null,
		long_term: null
	},
	artists: {
		short_term: null,
		medium_term: null,
		long_term: null
	},
	recents: null
}

const reducer: Reducer<iStatisticsData, iStatisticsActions> = (state = initial_state, action: iStatisticsActions) => {
	switch (action.type) {
		case "SET_STATISTICS_TRACKS_SHORT_TERM":
			return {
				...state,
				tracks: {
					...state.tracks,
					short_term: action.payload.short_term
				}
			}
		case "SET_STATISTICS_TRACKS_MEDIUM_TERM":
			return {
				...state,
				tracks: {
					...state.tracks,
					medium_term: action.payload.medium_term
				}
			}
		case "SET_STATISTICS_TRACKS_LONG_TERM":
			return {
				...state,
				tracks: {
					...state.tracks,
					long_term: action.payload.long_term
				}
			}
		case "SET_STATISTICS_ARTISTS_SHORT_TERM":
			return {
				...state,
				artists: {
					...state.artists,
					short_term: action.payload.short_term
				}
			}
		case "SET_STATISTICS_ARTISTS_MEDIUM_TERM":
			return {
				...state,
				artists: {
					...state.artists,
					medium_term: action.payload.medium_term
				}
			}
		case "SET_STATISTICS_ARTISTS_LONG_TERM":
			return {
				...state,
				artists: {
					...state.artists,
					long_term: action.payload.long_term
				}
			}
		case "SET_STATISTICS_RECENTS":
			return {
				...state,
				recents: action.payload.recents
			}
		default:
			return state
	}
}

export default reducer
