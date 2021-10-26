import {
	Container,
	Card,
	CardContent,
	Typography,
	Grid,
	CardMedia
} from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { set_error } from "../actions/ErrorActions"
import useSpotifyApi from "../hooks/useSpotifyApi"
import {
	iSetStatisticsArtistsShortTerm,
	iSetStatisticsArtistsMediumTerm,
	iSetStatisticsArtistsLongTerm
} from "../redux"
import getFollowers from "../utils/getFollowers"

interface Props {
	term: "short_term" | "medium_term" | "long_term"
	description: string
	action: (
		tracks: SpotifyApi.ArtistObjectFull[] | null
	) =>
		| iSetStatisticsArtistsShortTerm
		| iSetStatisticsArtistsMediumTerm
		| iSetStatisticsArtistsLongTerm
}

const TopArtistsLongTerm = (props: Props): JSX.Element => {
	const { term, description, action } = props
	
	const dispatch = useDispatch()
	const artists = useSelector(state => state.statistics.artists)
	const api = useSpotifyApi()

	useEffect(() => {
		if (!api) return
		if (artists[term]) return

		const half_artists: SpotifyApi.ArtistObjectFull[] = []

		api.getMyTopArtists({ limit: 50, time_range: term })
			.then(res => {
				half_artists.push(...res.items)
				return api.getMyTopArtists({ offset: 49, limit: 50, time_range: term })
			})
			.then(res => {
				dispatch(action([...half_artists, ...res.items.slice(1)]))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, artists, term, action])

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography variant="h4">Top Artists</Typography>
					<Typography variant="h6" gutterBottom>
						{description}
					</Typography>
					<Typography variant="body1">
						These are the artists you listen to the most
					</Typography>
				</CardContent>
			</Card>
			<Grid sx={{ my: 1 }} container spacing={5} justifyContent="space-evenly">
				{artists[term]?.map((artist, i) => (
					<Grid key={artist.id} item>
						<Card sx={{ p: 0, minWidth: 250 }}>
							<CardMedia
								component="img"
								alt="Picture"
								height={250}
								width={250}
								image={artist.images.at(0)?.url || ""}
							/>
							<CardContent>
								<Typography variant="h5">
									{(i + 1) + ". " + artist.name}
								</Typography>
								<Typography variant="body2">
									{getFollowers(artist)}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default TopArtistsLongTerm
