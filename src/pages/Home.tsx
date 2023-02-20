import { useNavigate } from "react-router-dom"

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"

import HomeCard from "../components/Cards/HomeCard"
import useAppSelector from "../hooks/useAppSelector"
import useThemeValue from "../hooks/useThemeValue"

const Home = ({}: {}) => {
	const navigate = useNavigate()

	const token = useAppSelector(state => state.token)

	const cards: iHomeCard[] = [
		{
			id: "home-top-tracks",
			header: "Top Tracks",
			body: "See the top 100 tracks you played on Spotify in the last month, 6 months and lifetime!",
			url: "/top-tracks"
		},
		{
			id: "home-top-artists",
			header: "Top Artists",
			body: "See the top 100 artists you played on Spotify in the last month, 6 months and lifetime!",
			url: "/top-artists"
		},
		{
			id: "home-recents",
			header: "Recently Played",
			body: "See the last 50 tracks that you played and when you played them on Spotify!",
			url: "/recents"
		}
	]

	return (
		<>
			<Box sx={{ bgcolor: useThemeValue("#121212", "background.paper"), pt: 8, pb: 6 }}>
				<Container maxWidth="sm">
					<Typography variant="h2" align="center" color="text.primary" gutterBottom>
						Statify
					</Typography>
					<Typography variant="h6" align="center" color="text.secondary" paragraph>
						{token
							? "View your Spotify Statistics"
							: "Log in to see your Spotify Statistics"}
					</Typography>
					<Stack
						sx={{ pt: 4, mb: 2 }}
						direction="row"
						spacing={2}
						justifyContent="center">
						<Button
							size="large"
							variant="contained"
							disabled={!!token}
							onClick={() => navigate("/login")}>
							{token ? "You are signed in" : "Sign in with Spotify"}
						</Button>
					</Stack>
					<Typography variant="subtitle2" align="center" color="text.secondary">
						Statify does <b>NOT</b> store your
						<br />
						listening history in its servers
					</Typography>
				</Container>
			</Box>
			<Grid sx={{ mt: 3, pb: 6 }} container spacing={5} justifyContent="center">
				{cards.map(card => (
					<HomeCard key={card.id} card={card} />
				))}
			</Grid>
		</>
	)
}

export default Home
