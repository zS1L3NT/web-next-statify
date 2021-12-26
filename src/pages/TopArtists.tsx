import React, { useEffect, useState } from "react"
import TopArtistItem from "../components/Items/TopArtistItem"
import useAuthenticated from "../hooks/useAthenticated"
import {
	Box,
	Card,
	CardContent,
	Container,
	Grid,
	LinearProgress,
	Tab,
	Tabs,
	Typography
} from "@mui/material"
import { TabContext } from "@mui/lab"
import { tabs } from "../App"
import { useHistory, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const TopArtists: React.FC = () => {
	//#region Hooks
	const history = useHistory()
	const location = useLocation()
	const artists = useSelector(state => state.statistics.artists)
	const [term, setTerm] = useState<"" | "short_term" | "medium_term" | "long_term">("")
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
		if (Object.values(artists).includes(null)) {
			sessionStorage.setItem("redirect", history.location.pathname)
			history.push("/login")
		}
	}, [history, artists])
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
							<Typography variant="h4">Top Artists</Typography>
							<Typography variant="h6" gutterBottom>
								{tabs.find(t => t.term === term)?.description}
							</Typography>
							<Typography variant="body1">
								These are the artists you listen to the most
							</Typography>
						</CardContent>
					</Card>
					<Grid sx={{ my: 1 }} container spacing={5} justifyContent="space-evenly">
						{(term
							? artists[term] || Array(5).fill(undefined)
							: Array(5).fill(undefined)
						).map((artist, i) => (
							<TopArtistItem key={i} artist={artist} i={i} />
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
