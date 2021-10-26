import {
	Avatar,
	Card,
	CardContent,
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
	const dispatch = useDispatch()
	const theme = useTheme()
	const show_list = useMediaQuery(theme.breakpoints.down("lg"))
	const tracks = useSelector(state => state.statistics.tracks)
	const api = useSpotifyApi()

	useEffect(() => {
		if (!api) return
		if (tracks[props.term]) return

		const half_tracks: SpotifyApi.TrackObjectFull[] = []

		api.getMyTopTracks({ limit: 50, time_range: props.term })
			.then(res => {
				half_tracks.push(...res.items)
				return api.getMyTopTracks({ offset: 49, limit: 50, time_range: props.term })
			})
			.then(res => {
				dispatch(props.action([...half_tracks, ...res.items.slice(1)]))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, tracks, props])

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography variant="h4">Top Tracks</Typography>
					<Typography variant="h6" gutterBottom>
						{props.description}
					</Typography>
					<Typography variant="body1">
						These are the tracks you listen to the most
					</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: 3 }}>
				{show_list ? (
					<List>
						{tracks[props.term]?.map(track => (
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
								{tracks[props.term]?.map((track, i) => (
									<TableRow key={track.id}>
										<TableCell align="center">
											<Typography variant="subtitle1">
												{i + 1}
											</Typography>
										</TableCell>
										<TableCell>
											<Avatar
												sx={{ width: 45, height: 45 }}
												src={track.album.images.at(-1)?.url || ""}
											/>
										</TableCell>
										<TableCell>
											<Typography variant="h6">
												{track.name}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="subtitle1">
												{track.artists.map(a => a.name).join(", ")}
											</Typography>
										</TableCell>
										<TableCell align="center">{getDuration(track)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Card>
		</Container>
	)
}

export default TopTracksLongTerm
