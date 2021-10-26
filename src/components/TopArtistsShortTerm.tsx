import {
	Container,
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText
} from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { set_error } from "../actions/ErrorActions"
import { set_statistics_artists_short_term } from "../actions/StatisticsActions"
import useSpotifyApi from "../hooks/useSpotifyApi"
import getFollowers from "../utils/getFollowers"

const TopArtistsShortTerm = (): JSX.Element => {
	const api = useSpotifyApi()
	const dispatch = useDispatch()
	const artists = useSelector(state => state.statistics.artists.short_term)

	useEffect(() => {
		if (!api) return
		if (artists) return

		const half_artists: SpotifyApi.ArtistObjectFull[] = []

		api.getMyTopArtists({ limit: 50, time_range: "short_term" })
			.then(res => {
				half_artists.push(...res.items)
				return api.getMyTopArtists({ offset: 49, limit: 50, time_range: "short_term" })
			})
			.then(res => {
				dispatch(set_statistics_artists_short_term([...half_artists, ...res.items]))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, artists])

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography variant="h4">
						Top Artists
					</Typography>
					<Typography variant="h6" gutterBottom>Past 4 Weeks</Typography>
					<Typography variant="body1">
						These are the artists you listen to the most
					</Typography>
				</CardContent>
			</Card>
			<Card sx={{ my: 3 }}>
				<List>
					{artists?.map(artist => (
						<ListItem key={artist.id}>
							<ListItemAvatar>
								<Avatar src={artist.images.at(-1)?.url || ""} />
							</ListItemAvatar>
							<ListItemText primary={artist.name} secondary={getFollowers(artist)} />
						</ListItem>
					))}
				</List>
			</Card>
		</Container>
	)
}

export default TopArtistsShortTerm
