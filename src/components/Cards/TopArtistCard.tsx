import React, { useEffect, useState } from "react"
import { Card, CardContent, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"

interface Props {
	artist?: SpotifyApi.ArtistObjectFull
}

const TopArtistsCard = (props: Props): JSX.Element => {
	const { artist } = props

	//#region Hooks
	const artists = useSelector(state => state.statistics.artists)
	const [shortTermIndex, setShortTermIndex] = useState(0)
	const [mediumTermIndex, setMediumTermIndex] = useState(0)
	const [longTermIndex, setLongTermIndex] = useState(0)
	//#endregion

	//#region Effects
	useEffect(() => {
		setShortTermIndex((artists.short_term?.findIndex(t => t.id === artist?.id) || -1) + 1)
		setMediumTermIndex((artists.medium_term?.findIndex(t => t.id === artist?.id) || -1) + 1)
		setLongTermIndex((artists.long_term?.findIndex(t => t.id === artist?.id) || -1) + 1)
	}, [artist, artists])
	//#endregion

	return (shortTermIndex || mediumTermIndex || longTermIndex) && artist ? (
		<>
			<Stack sx={{ width: "fit-content", m: "auto", mt: 3 }}>
				{shortTermIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{artists.short_term?.findIndex(t => t.id === artist.id) || -2 + 1}
							</Typography>
							<Typography variant="h6">
								of your most streamed artists in the last 4 weeks
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{mediumTermIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{artists.medium_term?.findIndex(t => t.id === artist.id) || -2 + 1}
							</Typography>
							<Typography variant="h6">
								of your most streamed artists in the last 6 months
							</Typography>
						</CardContent>
					</Card>
				) : null}
				{longTermIndex ? (
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography color="primary.main" variant="h3">
								#{artists.long_term?.findIndex(t => t.id === artist.id) || -2 + 1}
							</Typography>
							<Typography variant="h6">
								of your most streamed artists in your lifetime
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

export default TopArtistsCard
