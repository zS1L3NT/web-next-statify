import ArtistAppearances from "../components/Appearances/ArtistAppearances"
import ArtistDetails from "../components/Details/ArtistDetails"
import React, { useEffect, useState } from "react"
import Recommendations from "../components/Recommendations"
import Track from "../components/Track"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Container, List, Skeleton, Stack, Typography } from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

/**
 * * Name
 * * Followers
 * * Image
 * * Link
 * * Top Tracks
 * * Check if you are following this
 * * Position in Top Artists
 * * Appearances in Top Tracks
 * * Appearances in Recents
 * * Recommended
 */

const Artist: React.FC = () => {
	//#region Hooks
	const dispatch = useDispatch()
	const location = useLocation()
	const api = useSpotifyApi()
	const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse | null>()
	const [topTracks, setTopTracks] = useState<(SpotifyApi.TrackObjectFull | undefined)[]>(
		Array(5).fill(undefined)
	)
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		if (!api) return

		const [, , artistId] = location.pathname.split("/")
		if (artistId) {
			api.getArtist(artistId)
				.then(setArtist)
				.catch(err => {
					setArtist(null)
					dispatch(set_error(err))
				})
		} else {
			dispatch(set_error(new Error("Artist not found")))
		}
	}, [dispatch, location, api])

	useEffect(() => {
		if (!api) return
		if (!artist) return

		api.getArtistTopTracks(artist.id, "SG")
			.then(res => setTopTracks(res.tracks.slice(0, 5)))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, artist])
	//#endregion

	return (
		<Container>
			<ArtistDetails artist={artist || undefined} />

			<Stack sx={{ mt: 2 }} spacing={1} direction="row">
				{!artist ? <Skeleton variant="text" width={100} height={40} /> : null}
				<Typography sx={{ height: "fit-content", my: "auto !important" }} variant="h5">
					{artist ? artist.name + "'s" : ""} Top Tracks
				</Typography>
			</Stack>
			<List>
				{topTracks.map((track, i) => (
					<Track key={i} track={track || undefined} i={i} />
				))}
			</List>

			<ArtistAppearances artist={artist || undefined} />
			<Recommendations artist={artist || undefined} />
		</Container>
	)
}

export default Artist
