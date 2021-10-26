import { Container, Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { set_error } from "../actions/ErrorActions"
import { set_statistics_tracks_long_term } from "../actions/StatisticsActions"
import useSpotifyApi from "../hooks/useSpotifyApi"

const TopTracksLongTerm = (): JSX.Element => {
	const api = useSpotifyApi()
	const dispatch = useDispatch()
	const tracks = useSelector(state => state.statistics.tracks.long_term)

	useEffect(() => {
		if (!api) return
		if (tracks) return

		const half_tracks: SpotifyApi.TrackObjectFull[] = []

		api.getMyTopTracks({ limit: 50, time_range: "long_term" })
			.then(res => {
				half_tracks.push(...res.items)
				return api.getMyTopTracks({ offset: 49, limit: 50, time_range: "long_term" })
			})
			.then(res => {
				dispatch(set_statistics_tracks_long_term([...half_tracks, ...res.items]))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, tracks])

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography variant="h4">Top Tracks</Typography>
					<Typography variant="h6" gutterBottom>
						All Time
					</Typography>
					<Typography variant="body1">
						These are the tracks you listen to the most
					</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: 3 }}>
				<List>
					{tracks?.map(track => (
						<ListItem key={track.id}>
							<ListItemAvatar>
								<Avatar src={track.album.images.at(-1)?.url || ""} />
							</ListItemAvatar>
							<ListItemText primary={track.name} secondary={track.artists.map(a => a.name).join(", ")} />
						</ListItem>
					))}
				</List>
			</Card>
		</Container>
	)
}

export default TopTracksLongTerm
