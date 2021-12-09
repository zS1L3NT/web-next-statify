import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import React, { useEffect, useState } from "react"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Avatar, Container, Grid, Typography } from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

/**
 * * Name
 * ! Popularity
 * Artists
 * - Name
 * - Link
 * Explicity
 * Album
 * - Name
 * * - Picture
 * - Link
 * Link
 *
 * Position in Top Tracks
 * In Favourites
 * ? - In which playlists
 * ? - Recommendations
 */

const Track = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const location = useLocation()
	const api = useSpotifyApi()
	const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse | null>()
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		if (!api) return

		const [, , trackId] = location.pathname.split("/")
		if (trackId) {
			api.getTrack(trackId)
				.then(setTrack)
				.catch(err => {
					console.error(err)
					setTrack(null)
					dispatch(
						set_error(err.message === "invalid id" ? new Error("Track not found") : err)
					)
				})
		} else {
			dispatch(set_error(new Error("Track not found")))
		}
	}, [dispatch, location.pathname, api])
	//#endregion

	return (
		<Container>
			<Grid sx={{ my: 1 }} container direction={{ xs: "column", sm: "row" }}>
				<Grid item>
					<ArrowBackIcon />
					<Avatar
						sx={{ width: 150, height: 150 }}
						src={track?.album.images[0]?.url || ""}
					/>
				</Grid>
				<Grid item>
					<Typography variant="h4">{track?.name}</Typography>
					<Typography variant="h5">{track?.artists[0].name}</Typography>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Track
