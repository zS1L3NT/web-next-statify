import React, { useEffect, useState } from "react"
import TopArtistItem from "../components/Items/TopArtistItem"
import useAuthenticated from "../hooks/useAthenticated"
import { Box, Card, CardContent, Container, Grid, Tab, Tabs, Typography } from "@mui/material"
import { TabContext, TabPanel } from "@mui/lab"
import { tabs } from "../App"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

const TopArtists: React.FC = () => {
	//#region Hooks
	const history = useHistory()
	const artists = useSelector(state => state.statistics.artists)
	const [tab, setTab] = useState<"" | "short-term" | "medium-term" | "long-term">("")
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		const tab = history.location.pathname.split("/").at(-1)
		if (tab === "short-term" || tab === "medium-term" || tab === "long-term") {
			setTab(tab)
		} else {
			history.replace("/top-artists/short-term")
		}
	}, [history])
	//#endregion

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
				{tabs.map(tab => (
					<TabPanel sx={{ px: 0 }} key={tab.term} value={tab.term.replace("_", "-")}>
						<Container>
							<Card>
								<CardContent>
									<Typography variant="h4">Top Artists</Typography>
									<Typography variant="h6" gutterBottom>
										{tab.description}
									</Typography>
									<Typography variant="body1">
										These are the artists you listen to the most
									</Typography>
								</CardContent>
							</Card>
							<Grid
								sx={{ my: 1 }}
								container
								spacing={5}
								justifyContent="space-evenly">
								{(artists[tab.term] || Array(5).fill(undefined)).map(
									(artist, i) => (
										<TopArtistItem key={i} artist={artist} i={i} />
									)
								)}
							</Grid>
						</Container>
					</TabPanel>
				))}
			</Box>
		</TabContext>
	)
}

export default TopArtists
