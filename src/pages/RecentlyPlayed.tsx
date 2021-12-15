import getTimeSincePlayed from "../utils/getTimeSincePlayed"
import React, { useEffect, useState } from "react"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
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
import { DateTime } from "luxon"
import { set_error } from "../actions/ErrorActions"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const RecentlyPlayed = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const recents = useSelector(state => state.statistics.recents)
	const api = useSpotifyApi()
	const [images, setImages] = useState<string[]>()
	const theme = useTheme()
	const show_list = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		if (!api) return
		if (recents) return

		history.push("/login")
	}, [dispatch, history, api, recents])

	useEffect(() => {
		if (!api) return
		if (!recents) return

		api.getTracks(recents.map(r => r.track.id))
			.then(res => setImages(res.tracks.map(t => t.album.images.at(0)?.url || "")))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, recents])
	//#endregion

	//#region Functions
	const handleTrackClick = (track: SpotifyApi.TrackObjectSimplified) => {
		history.push("/track/" + track.id)
	}

	const handleArtistClick = (artist: SpotifyApi.ArtistObjectSimplified) => {
		history.push("/artist/" + artist.id)
	}
	//#endregion

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
					{show_list ? (
						<List>
							{recents!.map((recent, i) => (
								<ListItem
									key={recent.played_at}
									onClick={() => handleTrackClick(recent.track)}
									disablePadding>
									<ListItemButton>
										<ListItemAvatar>
											<Avatar src={images?.[i] || ""} />
										</ListItemAvatar>
										<ListItemText
											primary={
												recent.track.name +
												" - " +
												recent.track.artists.map(a => a.name).join(", ")
											}
											secondary={
												getTimeSincePlayed(recent) +
												" ago, " +
												DateTime.fromISO(recent.played_at).toFormat(
													"d LLLL yyyy"
												)
											}
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
										<TableCell>Cover</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Artist</TableCell>
										<TableCell align="center">Time Since Last Played</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{recents!.map((recent, i) => (
										<TableRow key={recent.played_at} hover>
											<TableCell>
												<Avatar
													sx={{ width: 45, height: 45 }}
													src={images?.[i] || ""}
												/>
											</TableCell>
											<TableCell>
												<Link
													sx={{ cursor: "pointer" }}
													color="inherit"
													onClick={() => handleTrackClick(recent.track)}
													underline="hover">
													{recent.track.name}
												</Link>
											</TableCell>
											<TableCell>
												{recent.track.artists
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
												{getTimeSincePlayed(recent) +
													" ago, " +
													DateTime.fromISO(recent.played_at).toFormat(
														"d LLLL yyyy"
													)}
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

export default RecentlyPlayed
