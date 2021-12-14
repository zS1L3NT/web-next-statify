import React, { useEffect, useState } from "react"
import { Card, CardContent, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"

interface Props {
	track?: SpotifyApi.TrackObjectFull
}

const TrackAppearances = (props: Props): JSX.Element => {
	const { track } = props

	//#region Hooks
	const statistics = useSelector(state => state.statistics)
	const [shortTermTrackIndex, setShortTermTrackIndex] = useState(0)
	const [mediumTermTrackIndex, setMediumTermTrackIndex] = useState(0)
	const [longTermTrackIndex, setLongTermTrackIndex] = useState(0)
	const [recentTracksCount, setRecentTracksCount] = useState(0)
	//#endregion

	//#region Effects
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
