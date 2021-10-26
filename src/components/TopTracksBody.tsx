import {
	Avatar,
	Card,
	CardContent,
	CircularProgress,
	Container,
	List,
	ListItem,
	ListItemAvatar,
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
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { set_error } from "../actions/ErrorActions"
import useSpotifyApi from "../hooks/useSpotifyApi"
import {
	iSetStatisticsTracksLongTerm,
	iSetStatisticsTracksMediumTerm,
	iSetStatisticsTracksShortTerm
} from "../redux"
import getDuration from "../utils/getDuration"

interface Props {
	term: "short_term" | "medium_term" | "long_term"
	description: string
	action: (
		tracks: SpotifyApi.TrackObjectFull[] | null
	) =>
		| iSetStatisticsTracksShortTerm
		| iSetStatisticsTracksMediumTerm
		| iSetStatisticsTracksLongTerm
}

const TopTracksLongTerm = (props: Props): JSX.Element => {
	const { term, description, action } = props

	const dispatch = useDispatch()
	const theme = useTheme()
	const show_list = useMediaQuery(theme.breakpoints.down("lg"))
	const tracks = useSelector(state => state.statistics.tracks)
	const api = useSpotifyApi()

	useEffect(() => {
		if (!api) return
		if (tracks[term]) return

		const half_tracks: SpotifyApi.TrackObjectFull[] = []

		api.getMyTopTracks({ limit: 50, time_range: term })
			.then(res => {
				half_tracks.push(...res.items)
				return api.getMyTopTracks({ offset: 49, limit: 50, time_range: term })
			})
			.then(res => {
				dispatch(action([...half_tracks, ...res.items.slice(1)]))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, tracks, term, action])

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
					{show_list ? (
						<List>
							{tracks[term]!.map(track => (
								<ListItem key={track.id}>
									<ListItemAvatar>
										<Avatar
											sx={{ width: 45, height: 45 }}
											src={track.album.images.at(-1)?.url || ""}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={track.name}
										secondary={track.artists.map(a => a.name).join(", ")}
									/>
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
										<TableRow key={track.id}>
											<TableCell align="center">{i + 1}</TableCell>
											<TableCell>
												<Avatar
													sx={{ width: 45, height: 45 }}
													src={track.album.images.at(-1)?.url || ""}
												/>
											</TableCell>
											<TableCell>{track.name}</TableCell>
											<TableCell>
												{track.artists.map(a => a.name).join(", ")}
											</TableCell>
											<TableCell align="center">
												{getDuration(track)}
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
