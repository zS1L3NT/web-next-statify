import React, { useEffect, useState } from "react"
import TopTrackItem from "../components/Items/TopTrackItem"
import useAuthenticated from "../hooks/useAthenticated"
import {
	Box,
	Card,
	CardContent,
	Container,
	LinearProgress,
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
import { TabContext } from "@mui/lab"
import { tabs } from "../App"
import { useHistory, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const TopTracks: React.FC = () => {
	//#region Hooks
	const history = useHistory()
	const location = useLocation()
	const tracks = useSelector(state => state.statistics.tracks)
	const [term, setTerm] = useState<"" | "short_term" | "medium_term" | "long_term">("")
	const theme = useTheme()
	const smallScreen = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		setTerm(
			location.pathname.split("/").at(-1)!.replace("-", "_") as
				| "short_term"
				| "medium_term"
				| "long_term"
		)
	}, [location])

	useEffect(() => {
		if (Object.values(tracks).includes(null)) {
			sessionStorage.setItem("redirect", history.location.pathname)
			history.push("/login")
		}
	}, [history, tracks])
	//#endregion

	return term ? (
		<TabContext value={term}>
			<Box sx={{ my: 2 }}>
				<Tabs
					value={term}
					onChange={(e, tab) => history.push(tab.replace("_", "-"))}
					centered>
					<Tab label="Past 4 Weeks" value="short_term" />
					<Tab label="Past 6 Months" value="medium_term" />
					<Tab label="All Time" value="long_term" />
				</Tabs>
				<Container sx={{ mt: 3 }}>
					<Card>
						<CardContent>
							<Typography variant="h4">Top Tracks</Typography>
							<Typography variant="h6" gutterBottom>
								{tabs.find(t => t.term === term)?.description}
							</Typography>
							<Typography variant="body1">
								These are the tracks you listen to the most
							</Typography>
						</CardContent>
					</Card>
					<Card sx={{ my: 3 }}>
						{smallScreen ? (
							<List>
								{(tracks[term] || Array(5).fill(undefined)).map((track, i) => (
									<TopTrackItem
										key={i}
										smallScreen={smallScreen}
										track={track}
										i={i}
									/>
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
										{(tracks[term] || Array(5).fill(undefined)).map(
											(track, i) => (
												<TopTrackItem
													key={i}
													smallScreen={smallScreen}
													track={track}
													i={i}
												/>
											)
										)}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</Card>
				</Container>
			</Box>
		</TabContext>
	) : (
		<LinearProgress />
	)
}

export default TopTracks
