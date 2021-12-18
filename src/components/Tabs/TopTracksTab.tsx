import getDuration from "../../utils/getDuration"
import React, { useEffect } from "react"
import {
	Avatar,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface Props {
	term: "short_term" | "medium_term" | "long_term"
	description: string
}

const TopTracksLongTerm: React.FC<Props> = (props: Props) => {
	const { term, description } = props

	//#region Hooks
	const history = useHistory()
	const tracks = useSelector(state => state.statistics.tracks)
	const theme = useTheme()
	const showList = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme
	//#endregion

	//#region Effects
	useEffect(() => {
		if (tracks[term]) return

		history.push("/login")
	}, [history, tracks, term])
	//#endregion

	//#region Functions
	const handleTrackClick = (track: SpotifyApi.TrackObjectFull) => {
		history.push("/track/" + track.id)
	}

	const handleArtistClick = (artist: SpotifyApi.ArtistObjectSimplified) => {
		history.push("/artist/" + artist.id)
	}
	//#endregion

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography variant="h4">Top Tracks</Typography>
					<Typography variant="h6" gutterBottom>
						{description}
					</Typography>
					<Typography variant="body1">
						These are the tracks you listen to the most
					</Typography>
				</CardContent>
			</Card>
			{tracks[term] ? (
				<Card sx={{ my: 3 }}>
					{showList ? (
						<List>
							{tracks[term]!.map((track, i) => (
								<ListItem
									key={track.id}
									onClick={() => handleTrackClick(track)}
									disablePadding>
									<ListItemButton>
										<ListItemAvatar>
											<Avatar
												sx={{ width: 45, height: 45 }}
												src={track.album.images.at(0)?.url || ""}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={i + 1 + ". " + track.name}
											secondary={track.artists.map(a => a.name).join(", ")}
										/>
									</ListItemButton>
								</ListItem>
							))}
						</List>
					) : (
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
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
									{tracks[term]!.map((track, i) => (
										<TableRow key={track.id} hover>
											<TableCell align="center">{i + 1}</TableCell>
											<TableCell>
												<Avatar
													sx={{ width: 45, height: 45 }}
													src={track.album.images.at(0)?.url || ""}
												/>
											</TableCell>
											<TableCell>
												<Link
													sx={{ cursor: "pointer" }}
													color="inherit"
													onClick={() => handleTrackClick(track)}
													underline="hover">
													{track.name}
												</Link>
											</TableCell>
											<TableCell>
												{track.artists
													.map(artist => (
														<Link
															sx={{ cursor: "pointer" }}
															key={artist.id}
															color="inherit"
															onClick={() =>
																handleArtistClick(artist)
															}
															underline="hover">
															{artist.name}
														</Link>
													))
													.reduce<(JSX.Element | string)[]>(
														(r, a) => r.concat(a, ", "),
														[]
													)
													.slice(0, -1)}
											</TableCell>
											<TableCell align="center">
												{getDuration(track.duration_ms)}
											</TableCell>
										</TableRow>
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

export default TopTracksLongTerm
