import { TabContext, TabPanel } from "@mui/lab"
import { Tabs, Tab, Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import TopTracksLongTerm from "../components/TopTracksLongTerm"
import TopTracksMediumTerm from "../components/TopTracksMediumTerm"
import TopTracksShortTerm from "../components/TopTracksShortTerm"

type term = "short-term" | "medium-term" | "long-term"

const TopTracks = (): JSX.Element => {
	const [tab, setTab] = useState<term>("short-term")
	const history = useHistory()

	useEffect(() => {
		const tab = history.location.pathname.split("/").at(-1)
		if (tab === "short-term" || tab === "medium-term" || tab === "long-term") {
			setTab(tab)
		} else {
			history.push("/short-term")
		}
	}, [history, history.location])

	return (
		<TabContext value={tab}>
			<Box sx={{ my: 2 }}>
				<Tabs value={tab} onChange={(e, tab) => history.push(tab)} centered>
					<Tab label="Past 4 Weeks" value="short-term" />
					<Tab label="Past 6 Months" value="medium-term" />
					<Tab label="All Time" value="long-term" />
				</Tabs>
				<TabPanel sx={{ px: 0 }} value="short-term">
					<TopTracksShortTerm />
				</TabPanel>
				<TabPanel sx={{ px: 0 }} value="medium-term">
					<TopTracksMediumTerm />
				</TabPanel>
				<TabPanel sx={{ px: 0 }} value="long-term">
					<TopTracksLongTerm />
				</TabPanel>
			</Box>
		</TabContext>
	)
}

export default TopTracks
