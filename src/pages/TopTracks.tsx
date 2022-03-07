import React, { useEffect, useState } from "react"
import TopTrackItem from "../components/Items/TopTrackItem"
import useAppSelector from "../hooks/useAppSelector"
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
import { useLocation, useNavigate } from "react-router-dom"

const TopTracks: React.FC = () => {
	const tracks = useAppSelector(state => state.statistics.tracks)
	const location = useLocation()
	const navigate = useNavigate()
	const [term, setTerm] = useState<"" | "short_term" | "medium_term" | "long_term">("")
	const theme = useTheme()
	const smallScreen = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme

	useAuthenticated()

	useEffect(() => {
		const parts = location.pathname.split("/")
		setTerm(
			parts[parts.length - 1]!.replace("-", "_") as "short_term" | "medium_term" | "long_term"
		)
	}, [location.pathname])

	useEffect(() => {
		if (Object.values(tracks).includes(null)) {
			sessionStorage.setItem("redirect", location.pathname)
			navigate("/login")
		}
	}, [navigate, location.pathname, tracks])

	return term ? (
		<TabContext value={term}>
			<Box sx={{ my: 2 }}>
				<Tabs
					value={term}
					onChange={(e, tab) => navigate("../" + tab.replace("_", "-"))}
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
