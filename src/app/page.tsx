import Link from "next/link"
import { getServerSession } from "next-auth"

import { options } from "@/next-auth"

const cards = [
	{
		id: "home-top-tracks",
		header: "Top Tracks",
		body: "See the top 100 tracks you played on Spotify in the last month, 6 months and lifetime!",
		url: "/top-tracks",
	},
	{
		id: "home-top-artists",
		header: "Top Artists",
		body: "See the top 100 artists you played on Spotify in the last month, 6 months and lifetime!",
		url: "/top-artists",
	},
	{
		id: "home-recents",
		header: "Recently Played",
		body: "See the last 50 tracks that you played and when you played them on Spotify!",
		url: "/recents",
	},
]

export default async function Page() {
	const session = await getServerSession(options)

	return (
		<>
			<Box sx={{ bgcolor: "#121212", pt: 8, pb: 6 }}>
				<Container maxWidth="sm">
					<Typography
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom>
						Statify
					</Typography>
					<Typography
						variant="h6"
						align="center"
						color="text.secondary"
						paragraph>
						{session
							? "View your Spotify Statistics"
							: "Log in to see your Spotify Statistics"}
					</Typography>
					<Stack
						sx={{ pt: 4, mb: 2 }}
						direction="row"
						spacing={2}
						justifyContent="center">
						<Button
							LinkComponent={Link}
							href="/api/auth/signin/spotify"
							size="large"
							variant="contained"
							disabled={!!session}>
							{session ? "You are signed in" : "Sign in with Spotify"}
						</Button>
					</Stack>
					<Typography
						variant="subtitle2"
						align="center"
						color="text.secondary">
						Statify does <b>NOT</b> store your
						<br />
						listening history in its servers
					</Typography>
				</Container>
			</Box>
			<Grid
				sx={{ mt: 3, pb: 6 }}
				container
				spacing={5}
				justifyContent="center">
				{cards.map(card => (
					<Grid
						key={card.id}
						item>
						<Card
							key={card.id}
							sx={{ maxWidth: 400, p: 1, mx: 3 }}>
							<CardContent>
								<Typography
									variant="h4"
									gutterBottom>
									{card.header}
								</Typography>
								<Typography
									variant="body1"
									color="text.secondary">
									{card.body}
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									LinkComponent={Link}
									href={card.url}
									sx={{ ml: 1 }}
									size="medium"
									disabled={!session}>
									{session ? "Bring me there!" : "Sign in first!"}
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	)
}
