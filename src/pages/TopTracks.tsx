import { TabContext, TabPanel } from "@mui/lab"
import { Box, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import {
	set_statistics_tracks_long_term,
	set_statistics_tracks_medium_term,
	set_statistics_tracks_short_term
} from "../actions/StatisticsActions"
import TopTracksBody from "../components/TopTracksBody"
import useAuthenticated from "../hooks/useAthenticated"

const TopTracks = (): JSX.Element => {
	const [tab, setTab] = useState<"" | "short-term" | "medium-term" | "long-term">("")
	const history = useHistory()

	useAuthenticated()

	useEffect(() => {
		const tab = history.location.pathname.split("/").at(-1)
		if (tab === "short-term" || tab === "medium-term" || tab === "long-term") {
			setTab(tab)
		} else {
			history.replace("/top-tracks/short-term")
		}
	}, [history, history.location])

	return (
		<TabContext value={tab}>
			<Box sx={{ my: 2 }}>
				{tab && (
					<Tabs value={tab} onChange={(e, tab) => history.push(tab)} centered>
						<Tab label="Past 4 Weeks" value="short-term" />
						<Tab label="Past 6 Months" value="medium-term" />
						<Tab label="All Time" value="long-term" />
					</Tabs>
				)}
				<TabPanel sx={{ px: 0 }} value="short-term">
					<TopTracksBody
						term="short_term"
						description="Past 4 Weeks"
						action={set_statistics_tracks_short_term}
					/>
				</TabPanel>
				<TabPanel sx={{ px: 0 }} value="medium-term">
					<TopTracksBody
						term="medium_term"
						description="Past 6 Months"
						action={set_statistics_tracks_medium_term}
					/>
				</TabPanel>
				<TabPanel sx={{ px: 0 }} value="long-term">
					<TopTracksBody
						term="long_term"
						description="All Time"
						action={set_statistics_tracks_long_term}
					/>
				</TabPanel>
			</Box>
		</TabContext>
	)
}

export default TopTracks
