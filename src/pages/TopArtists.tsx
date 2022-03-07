import React, { useEffect, useState } from "react"
import TopArtistItem from "../components/Items/TopArtistItem"
import useAppSelector from "../hooks/useAppSelector"
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
import { useLocation, useNavigate } from "react-router-dom"

const TopArtists: React.FC = () => {
	const artists = useAppSelector(state => state.statistics.artists)
	const location = useLocation()
	const navigate = useNavigate()
	const [term, setTerm] = useState<"" | "short_term" | "medium_term" | "long_term">("")

	useAuthenticated()

	useEffect(() => {
		const parts = location.pathname.split("/")
		setTerm(
			parts[parts.length - 1]!.replace("-", "_") as "short_term" | "medium_term" | "long_term"
		)
	}, [location.pathname])

	useEffect(() => {
		if (Object.values(artists).includes(null)) {
			sessionStorage.setItem("redirect", location.pathname)
			navigate("/login")
		}
	}, [navigate, location.pathname, artists])

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
