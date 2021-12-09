import React from "react"
import useThemeValue from "../hooks/useThemeValue"
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Grid,
	Stack,
	Typography
} from "@mui/material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface iCard {
	id: string
	header: string
	body: string
	url: string
}

const Home = (): JSX.Element => {
	//#region Hooks
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)
	//#endregion

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
			url: "/top-artists"
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
					<Typography variant="h2" align="center" color="text.primary" gutterBottom>
						Statify
					</Typography>
					<Typography variant="h6" align="center" color="text.secondary" paragraph>
						{access_token
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
							disabled={!!access_token}
							onClick={() => history.push("/login")}>
							{access_token ? "You are signed in" : "Sign in with Spotify"}
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
					<Grid key={card.id} item>
						<Card key={card.id} sx={{ maxWidth: 400, p: 1, mx: 3 }}>
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
									{access_token ? "Bring me there!" : "Sign in first!"}
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default Home
