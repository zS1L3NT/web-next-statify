import {
	Avatar,
	Card,
	CardContent,
	Container,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from "@mui/material"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { set_error } from "../actions/ErrorActions"
import { set_statistics_recents } from "../actions/StatisticsActions"
import useSpotifyApi from "../hooks/useSpotifyApi"

const RecentlyPlayed = (): JSX.Element => {
	const api = useSpotifyApi()
	const [images, set_images] = useState<string[]>()
	const dispatch = useDispatch()
	const recents = useSelector(state => state.statistics.recents)

	useEffect(() => {
		if (!api) return
		if (recents) return

		api.getMyRecentlyPlayedTracks({ limit: 50 })
			.then(res => {
				dispatch(set_statistics_recents(res.items))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, recents])

	useEffect(() => {
		if (!api) return
		if (!recents) return

		api.getTracks(recents.map(r => r.track.id))
			.then(res => {
				set_images(res.tracks.map(t => t.album.images.at(-1)?.url || ""))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, recents])

	return (
		<Container>
			<Card sx={{ my: 3 }}>
				<CardContent>
					<Typography variant="h4" gutterBottom>
						Recently Played Tracks
					</Typography>
					<Typography variant="body1">
						See the recently played on Spotify. The song you listened to most recently is displayed first
					</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: 3 }}>
				<List>
					{recents?.map((recent, i) => (
						<ListItem key={recent.played_at}>
							<ListItemAvatar>
								<Avatar src={images?.[i] || ""} />
							</ListItemAvatar>
							<ListItemText
								primary={recent.track.name + " - " + recent.track.artists.map(a => a.name).join(", ")}
								secondary={DateTime.fromISO(recent.played_at)
									.toFormat("d LLLL yyyy 'at' hh:mm:ssa")
									.replace(/(AM|PM)$/, m => m.toLowerCase())}
							/>
						</ListItem>
					))}
				</List>
			</Card>
		</Container>
	)
}

export default RecentlyPlayed
