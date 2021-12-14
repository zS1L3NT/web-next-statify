import getFollowers from "../utils/getFollowers"
import React, { useEffect } from "react"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from "@mui/material"
import { iSetStatisticsArtistsLongTerm, iSetStatisticsArtistsMediumTerm, iSetStatisticsArtistsShortTerm } from "../redux"
import { set_error } from "../actions/ErrorActions"
import { useDispatch, useSelector } from "react-redux"

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

	//#region Hooks
	const dispatch = useDispatch()
	const artists = useSelector(state => state.statistics.artists)
	const api = useSpotifyApi()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (!api) return
		if (artists[term]) return

		const halfArtists: SpotifyApi.ArtistObjectFull[] = []

		api.getMyTopArtists({ limit: 50, time_range: term })
			.then(res => {
				halfArtists.push(...res.items)
				return api.getMyTopArtists({ offset: 49, limit: 50, time_range: term })
			})
			.then(res => {
				dispatch(action([...halfArtists, ...res.items.slice(1)]))
			})
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, artists, term, action])
	//#endregion

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
			{artists[term] ? (
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
										{i + 1 + ". " + artist.name}
									</Typography>
									<Typography variant="body2">{getFollowers(artist)}</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			) : (
				<CircularProgress sx={{ my: 5, mx: "auto", display: "block" }} />
			)}
		</Container>
	)
}

export default TopArtistsLongTerm
