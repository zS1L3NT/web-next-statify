import React, { useEffect, useState } from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

interface Props {
	track?: SpotifyApi.TrackObjectFull
}

const TrackAppearances = (props: Props): JSX.Element => {
	const { track } = props

	//#region Hooks
	const history = useHistory()
	const statistics = useSelector(state => state.statistics)
	const [shortTermTrackIndex, setShortTermTrackIndex] = useState(0)
	const [mediumTermTrackIndex, setMediumTermTrackIndex] = useState(0)
	const [longTermTrackIndex, setLongTermTrackIndex] = useState(0)
	const [recentTracksCount, setRecentTracksCount] = useState(0)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (
			!statistics.tracks.short_term ||
			!statistics.tracks.medium_term ||
			!statistics.tracks.long_term ||
			!statistics.recents
		) {
			sessionStorage.setItem("redirect", history.location.pathname)
			history.push("/login")
			return
		}

		setShortTermTrackIndex(statistics.tracks.short_term.findIndex(t => t.id === track?.id) + 1)
		setMediumTermTrackIndex(
			statistics.tracks.medium_term.findIndex(t => t.id === track?.id) + 1
		)
		setLongTermTrackIndex(statistics.tracks.long_term.findIndex(t => t.id === track?.id) + 1)
		setRecentTracksCount(statistics.recents.filter(t => t.track.id === track?.id).length)
	}, [history, track, statistics])
	//#endregion

	return track ? (
		<Grid sx={{ m: "auto", mt: 3 }} spacing={1} justifyContent="space-evenly" container>
			{shortTermTrackIndex ? (
				<Card sx={{ width: 250, mb: 3 }}>
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
				<Card sx={{ width: 250, mb: 3 }}>
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
				<Card sx={{ width: 250, mb: 3 }}>
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
				<Card sx={{ width: 250, mb: 3 }}>
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
		</Grid>
	) : (
		<></>
	)
}

export default TrackAppearances
