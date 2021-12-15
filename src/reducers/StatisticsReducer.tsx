import { iStatisticsActions, iStatisticsData } from "../redux"
import { Reducer } from "redux"

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

const reducer: Reducer<iStatisticsData, iStatisticsActions> = (
	state = initial_state,
	action: iStatisticsActions
) => {
	switch (action.type) {
		case "SET_STATISTICS":
			return action.payload
		default:
			return state
	}
}

export default reducer
