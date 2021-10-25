import React from "react"
import { Box, Container, Typography, Stack, Button, Card, CardContent, CardActions } from "@mui/material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import useThemeValue from "../hooks/useThemeValue"

interface iCard {
	id: string
	header: string
	body: string
	url: string
}

const Home = (): JSX.Element => {
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)

	const cards: iCard[] = [
		{
			id: "home-top-tracks",
			header: "Top Tracks",
			body: "See the top 100 tracks you played on Spotify in the past 4 weeks, 6 months and lifetime!",
			url: "/top-tracks"
		},
		{
			id: "home-top-artists",
			header: "Top Artists",
			body: "See the top 100 artists you played on Spotify in the past 4 weeks, 6 months and lifetime!",
			url: "/top-tracks"
		},
		{
			id: "home-recently-played",
			header: "Recently Played",
			body: "See the last 50 tracks that you played and when you played them on Spotify!",
			url: "/recently-played"
		}
	]

	return (
		<>
			<Box sx={{ bgcolor: useThemeValue("#121212", "background.paper"), pt: 8, pb: 6 }}>
				<Container maxWidth="sm">
					<Typography variant="h1" align="center" color="text.primary" gutterBottom>
						Statify
					</Typography>
					<Typography variant="h5" align="center" color="text.secondary" paragraph>
						{access_token ? "View one of your Spotify Statistics" : "Log in to see your Spotify Statistics"}
					</Typography>
					<Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
						<Button
							size="large"
							variant="contained"
							disabled={!!access_token}
							onClick={() => history.push("/login")}>
							Sign in with Spotify
						</Button>
					</Stack>
				</Container>
			</Box>
			<Stack
				sx={{ p: { xs: 4, sm: 6 } }}
				direction={{ xs: "column", sm: "column", md: "row" }}
				spacing={10}
				justifyContent="center">
				{cards.map(card => (
					<Card key={card.id} sx={{ maxWidth: 400, p: 1, mx: "auto !important" }}>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								{card.header}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{card.body}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								sx={{ ml: 1 }}
								size="medium"
								disabled={!access_token}
								onClick={() => history.push(card.url)}>
								Bring me there!
							</Button>
						</CardActions>
					</Card>
				))}
			</Stack>
		</>
	)
}

export default Home
