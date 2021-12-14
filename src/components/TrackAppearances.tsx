import React, { useEffect, useState } from "react"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Card, CardContent, Stack, Typography } from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch, useSelector } from "react-redux"

interface Props {
	track?: SpotifyApi.TrackObjectFull
}

const TrackAppearances = (props: Props): JSX.Element => {
	const { track } = props

	//#region Hooks
	const dispatch = useDispatch()
	const api = useSpotifyApi()
	const statistics = useSelector(state => state.statistics)
	const [liked, setLiked] = useState<boolean>()
	const [shortTermTrackIndex, setShortTermTrackIndex] = useState(0)
	const [mediumTermTrackIndex, setMediumTermTrackIndex] = useState(0)
	const [longTermTrackIndex, setLongTermTrackIndex] = useState(0)
	const [recentTracksCount, setRecentTracksCount] = useState(0)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (!api) return
		if (!track) return

		api.containsMySavedTracks([track.id])
			.then(res => setLiked(res[0]))
			.catch(err => {
				dispatch(
					set_error(err.message === "invalid id" ? new Error("Track not found") : err)
				)
			})
	}, [dispatch, api, track])

	useEffect(() => {
		setShortTermTrackIndex(
			(statistics.tracks.short_term
				? statistics.tracks.short_term.findIndex(t => t.id === track?.id)
				: -1) + 1
		)
		setMediumTermTrackIndex(
			(statistics.tracks.medium_term
				? statistics.tracks.medium_term.findIndex(t => t.id === track?.id)
				: -1) + 1
		)
		setLongTermTrackIndex(
			(statistics.tracks.long_term
				? statistics.tracks.long_term.findIndex(t => t.id === track?.id)
				: -1) + 1
		)
		setRecentTracksCount(statistics.recents?.filter(t => t.track.id === track?.id).length || 0)
	}, [track, statistics])
	//#endregion

	return track ? (
		<>
			<Stack sx={{ width: "fit-content", m: "auto", mt: 3 }}>
				{liked ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h6">
								You liked {track.name}
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{shortTermTrackIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{shortTermTrackIndex}
							</Typography>
							<Typography variant="h6">
								of your most streamed tracks in the last 4 weeks
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{mediumTermTrackIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{mediumTermTrackIndex}
							</Typography>
							<Typography variant="h6">
								of your most streamed tracks in the last 6 months
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{longTermTrackIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{longTermTrackIndex}
							</Typography>
							<Typography variant="h6">
								of your most streamed tracks in your lifetime
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{recentTracksCount ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								{recentTracksCount}
							</Typography>
							<Typography variant="h6">
								appearances of {track.name} in your last 50 streams
							</Typography>
						</CardContent>
					</Card>
				) : null}
			</Stack>
		</>
	) : (
		<></>
	)
}

export default TrackAppearances
