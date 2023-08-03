import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { TabContext } from "@mui/lab"
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
	useTheme,
} from "@mui/material"

import { tabs } from "../App"
import TopTrackItem from "../components/Items/TopTrackItem"
import useAuthenticated from "../hooks/useAuthenticated"
import useGetFullTopTracksQuery from "../hooks/useGetFullTopTracksQuery"

const TopTracks = () => {
	const token = useAuthenticated()

	const navigate = useNavigate()
	const location = useLocation()
	const theme = useTheme()
	const smallScreen = useMediaQuery(theme.breakpoints.down("lg"))

	const [term, setTerm] = useState<"" | "short_term" | "medium_term" | "long_term">("")
	const { data: topTracks } = useGetFullTopTracksQuery(
		{
			time_range: term as "short_term" | "medium_term" | "long_term",
			token,
		},
		{ skip: !term },
	)

	useEffect(() => {
		const parts = location.pathname.split("/")
		setTerm(
			parts[parts.length - 1]!.replace("-", "_") as
				| "short_term"
				| "medium_term"
				| "long_term",
		)
	}, [location.pathname])

	return term ? (
		<TabContext value={term}>
			<Box sx={{ my: 2 }}>
				<Tabs
					value={term}
					onChange={(e, tab) => navigate("../" + tab.replace("_", "-"))}
					centered>
					<Tab
						label="Last Month"
						value="short_term"
					/>
					<Tab
						label="Last 6 Months"
						value="medium_term"
					/>
					<Tab
						label="All Time"
						value="long_term"
					/>
				</Tabs>
				<Container sx={{ mt: 3 }}>
					<Card>
						<CardContent>
							<Typography variant="h4">Top Tracks</Typography>
							<Typography
								variant="h6"
								gutterBottom>
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
								{(topTracks ?? Array(5).fill(undefined)).map((t, i) => (
									<TopTrackItem
										key={i}
										smallScreen={smallScreen}
										track={t}
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
										{(topTracks ?? Array(5).fill(undefined)).map((t, i) => (
											<TopTrackItem
												key={i}
												smallScreen={smallScreen}
												track={t}
												i={i}
											/>
										))}
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
