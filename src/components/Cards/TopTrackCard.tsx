import React, { useEffect, useState } from "react"
import { Card, CardContent, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"

interface Props {
	track?: SpotifyApi.TrackObjectFull
}

const TopTracksCard = (props: Props): JSX.Element => {
	const { track } = props

	//#region Hooks
	const tracks = useSelector(state => state.statistics.tracks)
	const [shortTermIndex, setShortTermIndex] = useState(0)
	const [mediumTermIndex, setMediumTermIndex] = useState(0)
	const [longTermIndex, setLongTermIndex] = useState(0)
	//#endregion

	//#region Effects
	useEffect(() => {
		setShortTermIndex((tracks.short_term?.findIndex(t => t.id === track?.id) || -1) + 1)
		setMediumTermIndex((tracks.medium_term?.findIndex(t => t.id === track?.id) || -1) + 1)
		setLongTermIndex((tracks.long_term?.findIndex(t => t.id === track?.id) || -1) + 1)
	}, [track, tracks])
	//#endregion

	return (shortTermIndex || mediumTermIndex || longTermIndex) && track ? (
		<>
			<Stack sx={{ width: "fit-content", m: "auto", mt: 3 }}>
				{shortTermIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{tracks.short_term?.findIndex(t => t.id === track.id) || -2 + 1}
							</Typography>
							<Typography variant="h6">
								of your most streamed tracks in the last 4 weeks
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{mediumTermIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{tracks.medium_term?.findIndex(t => t.id === track.id) || -2 + 1}
							</Typography>
							<Typography variant="h6">
								of your most streamed tracks in the last 6 months
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{longTermIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{tracks.long_term?.findIndex(t => t.id === track.id) || -2 + 1}
							</Typography>
							<Typography variant="h6">
								of your most streamed tracks in your lifetime
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

export default TopTracksCard
