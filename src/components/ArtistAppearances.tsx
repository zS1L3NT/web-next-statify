import React, { useEffect, useState } from "react"
import { Card, CardContent, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"

interface Props {
	artist?: SpotifyApi.ArtistObjectFull
}

const ArtistAppearances = (props: Props): JSX.Element => {
	const { artist } = props

	//#region Hooks
	const statistics = useSelector(state => state.statistics)
	const [shortTermArtistsIndex, setShortTermArtistsIndex] = useState(0)
	const [mediumTermArtistsIndex, setMediumTermArtistsIndex] = useState(0)
	const [longTermArtistsIndex, setLongTermArtistsIndex] = useState(0)
	const [shortTermTracksCount, setShortTermTracksCount] = useState(0)
	const [mediumTermTracksCount, setMediumTermTracksCount] = useState(0)
	const [longTermTracksCount, setLongTermTracksCount] = useState(0)
	const [recentArtistsCount, setRecentArtistsCount] = useState(0)
	//#endregion

	//#region Effects
	useEffect(() => {
		setShortTermArtistsIndex(
			(statistics.artists.short_term
				? statistics.artists.short_term.findIndex(t => t.id === artist?.id)
				: -1) + 1
		)
		setMediumTermArtistsIndex(
			(statistics.artists.medium_term
				? statistics.artists.medium_term.findIndex(t => t.id === artist?.id)
				: -1) + 1
		)
		setLongTermArtistsIndex(
			(statistics.artists.long_term
				? statistics.artists.long_term.findIndex(t => t.id === artist?.id)
				: -1) + 1
		)
		setShortTermTracksCount(
			statistics.tracks.short_term?.filter(t => t.artists.find(a => a.id === artist?.id))
				.length || 0
		)
		setMediumTermTracksCount(
			statistics.tracks.medium_term?.filter(t => t.artists.find(a => a.id === artist?.id))
				.length || 0
		)
		setLongTermTracksCount(
			statistics.tracks.long_term?.filter(t => t.artists.find(a => a.id === artist?.id))
				.length || 0
		)
		setRecentArtistsCount(
			statistics.recents?.filter(t => t.track.artists.find(a => a.id === artist?.id))
				.length || 0
		)
	}, [artist, statistics])
	//#endregion

	return artist ? (
		<Stack sx={{ width: "fit-content", m: "auto", mt: 3 }}>
			{shortTermArtistsIndex ? (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography color="primary.main" variant="h3">
							#{shortTermArtistsIndex}
						</Typography>
						<Typography variant="h6">
							of your most streamed artists in the last 4 weeks
						</Typography>
					</CardContent>
				</Card>
			) : null}
			{mediumTermArtistsIndex ? (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography color="primary.main" variant="h3">
							#{mediumTermArtistsIndex}
						</Typography>
						<Typography variant="h6">
							of your most streamed artists in the last 6 months
						</Typography>
					</CardContent>
				</Card>
			) : null}
			{longTermArtistsIndex ? (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography color="primary.main" variant="h3">
							#{longTermArtistsIndex}
						</Typography>
						<Typography variant="h6">
							of your most streamed artists in your lifetime
						</Typography>
					</CardContent>
				</Card>
			) : null}
			{shortTermTracksCount ? (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography color="primary.main" variant="h3">
							{shortTermTracksCount}
						</Typography>
						<Typography variant="h6">
							appearances from {artist.name} in your most streamed tracks in the last 4
							weeks
						</Typography>
					</CardContent>
				</Card>
			) : null}
			{mediumTermTracksCount ? (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography color="primary.main" variant="h3">
							{mediumTermTracksCount}
						</Typography>
						<Typography variant="h6">
							appearances from {artist.name} in your most streamed tracks in the last 6
							months
						</Typography>
					</CardContent>
				</Card>
			) : null}
			{longTermTracksCount ? (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography color="primary.main" variant="h3">
							{longTermTracksCount}
						</Typography>
						<Typography variant="h6">
							appearances from {artist.name} in your most streamed tracks in your
							lifetime
						</Typography>
					</CardContent>
				</Card>
			) : null}
			{recentArtistsCount ? (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography color="primary.main" variant="h3">
							{recentArtistsCount}
						</Typography>
						<Typography variant="h6">
							appearances from {artist.name} in your last 50 streams
						</Typography>
					</CardContent>
				</Card>
			) : null}
		</Stack>
	) : (
		<></>
	)
}

export default ArtistAppearances
