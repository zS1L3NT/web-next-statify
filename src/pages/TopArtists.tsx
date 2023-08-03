import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { TabContext } from "@mui/lab"
import {
	Box,
	Card,
	CardContent,
	Container,
	Grid,
	LinearProgress,
	Tab,
	Tabs,
	Typography,
} from "@mui/material"

import { tabs } from "../App"
import TopArtistItem from "../components/Items/TopArtistItem"
import useAuthenticated from "../hooks/useAuthenticated"
import useGetFullTopArtistsQuery from "../hooks/useGetFullTopArtistsQuery"

const TopArtists = () => {
	const token = useAuthenticated()

	const navigate = useNavigate()
	const location = useLocation()

	const [term, setTerm] = useState<"" | "short_term" | "medium_term" | "long_term">("")
	const { data: topArtists } = useGetFullTopArtistsQuery(
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
							<Typography variant="h4">Top Artists</Typography>
							<Typography
								variant="h6"
								gutterBottom>
								{tabs.find(t => t.term === term)?.description}
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
						{(topArtists ?? Array(5).fill(undefined)).map((a, i) => (
							<TopArtistItem
								key={i}
								artist={a}
								i={i}
							/>
						))}
					</Grid>
				</Container>
			</Box>
		</TabContext>
	) : (
		<LinearProgress />
	)
}

export default TopArtists
