import React, { useEffect, useState } from "react"
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface Props {
	artist?: SpotifyApi.ArtistObjectSimplified
}

const ArtistAppearances: React.FC<Props> = (props: Props) => {
	const { artist } = props

	//#region Hooks
	const history = useHistory()
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
		if (
			!statistics.artists.short_term ||
			!statistics.artists.medium_term ||
			!statistics.artists.long_term ||
			!statistics.tracks.short_term ||
			!statistics.tracks.medium_term ||
			!statistics.tracks.long_term ||
			!statistics.recents
		) {
			sessionStorage.setItem("redirect", history.location.pathname)
			history.push("/login")
			return
		}

		setShortTermArtistsIndex(
			statistics.artists.short_term.findIndex(t => t.id === artist?.id) + 1
		)
		setMediumTermArtistsIndex(
			statistics.artists.medium_term.findIndex(t => t.id === artist?.id) + 1
		)
		setLongTermArtistsIndex(
			statistics.artists.long_term.findIndex(t => t.id === artist?.id) + 1
		)
		setShortTermTracksCount(
			statistics.tracks.short_term.filter(t => t.artists.find(a => a.id === artist?.id))
				.length
		)
		setMediumTermTracksCount(
			statistics.tracks.medium_term.filter(t => t.artists.find(a => a.id === artist?.id))
				.length
		)
		setLongTermTracksCount(
			statistics.tracks.long_term.filter(t => t.artists.find(a => a.id === artist?.id)).length
		)
		setRecentArtistsCount(
			statistics.recents.filter(t => t.track.artists.find(a => a.id === artist?.id)).length
		)
	}, [history, artist, statistics])
	//#endregion

	return artist ? (
		<Grid sx={{ m: "auto", mt: 3 }} spacing={1} justifyContent="space-evenly" container>
			{shortTermArtistsIndex ? (
				<Card
					sx={{ width: 250, mb: 3 }}
					onClick={() => history.push("/top-artists/short-term")}>
					<CardActionArea sx={{ height: "100%" }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{shortTermArtistsIndex}
							</Typography>
							<Typography variant="h6">
								of your most streamed artists in the last 4 weeks
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			) : null}
			{mediumTermArtistsIndex ? (
				<Card
					sx={{ width: 250, mb: 3 }}
					onClick={() => history.push("/top-artists/medium-term")}>
					<CardActionArea sx={{ height: "100%" }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{mediumTermArtistsIndex}
							</Typography>
							<Typography variant="h6">
								of your most streamed artists in the last 6 months
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			) : null}
			{longTermArtistsIndex ? (
				<Card
					sx={{ width: 250, mb: 3 }}
					onClick={() => history.push("/top-artists/long-term")}>
					<CardActionArea sx={{ height: "100%" }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{longTermArtistsIndex}
							</Typography>
							<Typography variant="h6">
								of your most streamed artists in your lifetime
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			) : null}
			{shortTermTracksCount ? (
				<Card
					sx={{ width: 250, mb: 3 }}
					onClick={() => history.push("/top-tracks/short-term")}>
					<CardActionArea sx={{ height: "100%" }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								{shortTermTracksCount}
							</Typography>
							<Typography variant="h6">
								appearances from {artist.name} in your most streamed tracks in the
								last 4 weeks
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			) : null}
			{mediumTermTracksCount ? (
				<Card
					sx={{ width: 250, mb: 3 }}
					onClick={() => history.push("/top-tracks/medium-term")}>
					<CardActionArea sx={{ height: "100%" }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								{mediumTermTracksCount}
							</Typography>
							<Typography variant="h6">
								appearances from {artist.name} in your most streamed tracks in the
								last 6 months
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			) : null}
			{longTermTracksCount ? (
				<Card
					sx={{ width: 250, mb: 3 }}
					onClick={() => history.push("/top-tracks/long-term")}>
					<CardActionArea sx={{ height: "100%" }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								{longTermTracksCount}
							</Typography>
							<Typography variant="h6">
								appearances from {artist.name} in your most streamed tracks in your
								lifetime
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			) : null}
			{recentArtistsCount ? (
				<Card sx={{ width: 250, mb: 3 }} onClick={() => history.push("/recents")}>
					<CardActionArea sx={{ height: "100%" }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								{recentArtistsCount}
							</Typography>
							<Typography variant="h6">
								appearances from {artist.name} in your last 50 streams
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			) : null}
		</Grid>
	) : (
		<></>
	)
}

export default ArtistAppearances
