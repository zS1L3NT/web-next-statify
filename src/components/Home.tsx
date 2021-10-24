import React from "react"
import { Box, Container, Typography, Stack, Button, Card, CardContent, CardActions } from "@mui/material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface iCard {
	header: string
	body: string
	url: string
}

const Home = (): JSX.Element => {
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)

	const cards: iCard[] = [
		{
			header: "Top Tracks",
			body: "See the top 100 tracks you played on Spotify in the past 4 weeks, 6 months and lifetime!",
			url: "/top-tracks"
		},
		{
			header: "Top Artists",
			body: "See the top 100 artists you played on Spotify in the past 4 weeks, 6 months and lifetime!",
			url: "/top-tracks"
		},
		{
			header: "Recently Played",
			body: "See the last 50 tracks that you played and when you played them on Spotify!",
			url: "/recently-played"
		}
	]

	return (
		<>
			<Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
				<Container maxWidth="sm">
					<Typography variant="h1" align="center" color="text.primary" gutterBottom>
						Statify
					</Typography>
					<Typography variant="h5" align="center" color="text.secondary" paragraph>
						Log in to see your Spotify Statistics
					</Typography>
					<Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
						<Button size="large" variant="contained" onClick={() => history.push(access_token ? "/top-tracks" :"/login")}>
							{access_token ? "Show me my top tracks!" :"Sign in with Spotify"}
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
					<Card key={card.url} sx={{ maxWidth: 400, p: 1, mx: "auto !important" }}>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								{card.header}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								{card.body}
							</Typography>
						</CardContent>
						<CardActions>
							<Button sx={{ ml: 1 }} size="medium" onClick={() => history.push(card.url)}>
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
