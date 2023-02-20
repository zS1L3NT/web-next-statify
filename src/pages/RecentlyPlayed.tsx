import {
	Card, CardContent, CircularProgress, Container, List, Paper, Table, TableBody, TableCell,
	TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme
} from "@mui/material"

import { useGetRecentsQuery } from "../api/api"
import { useGetTracksQuery } from "../api/track"
import RecentItem from "../components/Items/RecentItem"
import useAuthenticated from "../hooks/useAuthenticated"

const RecentlyPlayed = ({}: {}) => {
	const token = useAuthenticated()

	const theme = useTheme()
	const smallScreen = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme

	const { data: recents } = useGetRecentsQuery({ token })
	const { data: tracks } = useGetTracksQuery(
		{ ids: recents?.map(r => r.track.id) ?? [], token },
		{ skip: !recents }
	)

	return (
		<Container>
			<Card sx={{ my: 3 }}>
				<CardContent>
					<Typography variant="h4" gutterBottom>
						Recently Played Tracks
					</Typography>
					<Typography variant="body1">
						These are the tracks you listened to most recently
					</Typography>
				</CardContent>
			</Card>
			{recents ? (
				<Card sx={{ my: 3 }}>
					{smallScreen ? (
						<List>
							{recents!.map((recent, i) => (
								<RecentItem
									key={i}
									smallScreen={smallScreen}
									image={tracks?.[i]?.album.images[0]?.url}
									recent={recent}
								/>
							))}
						</List>
					) : (
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Cover</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Artist</TableCell>
										<TableCell align="center">Time Since Last Played</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{recents!.map((recent, i) => (
										<RecentItem
											key={i}
											smallScreen={smallScreen}
											image={tracks?.[i]?.album.images[0]?.url}
											recent={recent}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Card>
			) : (
				<CircularProgress sx={{ my: 5, mx: "auto", display: "block" }} />
			)}
		</Container>
	)
}

export default RecentlyPlayed
