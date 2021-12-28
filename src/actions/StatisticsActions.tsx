import { iSetStatistics, iStatisticsData } from "../redux"

export const set_statistics = (statistics: iStatisticsData): iSetStatistics => ({
	type: "SET_STATISTICS",
	payload: statistics
})
