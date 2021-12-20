import React, { useEffect, useState } from "react"
import TopTrackItem from "../components/Items/TopTrackItem"
import useAuthenticated from "../hooks/useAthenticated"
import {
	Box,
	Card,
	CardContent,
	CircularProgress,
	Container,
	List,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material"
import { TabContext, TabPanel } from "@mui/lab"
import { tabs } from "../App"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

const TopTracks: React.FC = () => {
	//#region Hooks
	const history = useHistory()
	const tracks = useSelector(state => state.statistics.tracks)
	const [tab, setTab] = useState<"" | "short-term" | "medium-term" | "long-term">("")
	const theme = useTheme()
	const showList = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		const tab = history.location.pathname.split("/").at(-1)
		if (tab === "short-term" || tab === "medium-term" || tab === "long-term") {
			setTab(tab)
		} else {
			history.replace("/top-tracks/short-term")
		}
	}, [history, history.location])
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
									<Typography variant="h4">Top Tracks</Typography>
									<Typography variant="h6" gutterBottom>
										{tab.description}
									</Typography>
									<Typography variant="body1">
										These are the tracks you listen to the most
									</Typography>
								</CardContent>
							</Card>
							{tracks[tab.term] ? (
								<Card sx={{ my: 3 }}>
									{showList ? (
										<List>
											{tracks[tab.term]!.map((track, i) => (
												<TopTrackItem key={i} track={track} i={i} />
											))}
										</List>
									) : (
										<TableContainer component={Paper}>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>Position</TableCell>
														<TableCell>Cover</TableCell>
														<TableCell>Title</TableCell>
														<TableCell>Artist</TableCell>
														<TableCell>Duration</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{tracks[tab.term]!.map((track, i) => (
														<TopTrackItem key={i} track={track} i={i} />
													))}
												</TableBody>
											</Table>
										</TableContainer>
									)}
								</Card>
							) : (
								<CircularProgress sx={{ my: 5, mx: "auto", display: "block" }} />
							)}
						</Container>
					</TabPanel>
				))}
			</Box>
		</TabContext>
	)
}

export default TopTracks
