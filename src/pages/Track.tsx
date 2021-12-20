import AlbumCard from "../components/Cards/AlbumCard"
import AppearanceCard from "../components/Cards/AppearanceCard"
import ArtistCard from "../components/Cards/ArtistCard"
import React, { useEffect, useState } from "react"
import Recommendations from "../components/Recommendations"
import TrackDetails from "../components/Details/TrackDetails"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Container, Grid, Typography } from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useTry as _useTry } from "no-try"

/**
 * * Name
 * ! Popularity
 * ! Explicity
 * * Link
 * * Artists[i]
 * * - Name
 * * - Link
 * * Album
 * * - Name
 * * - Picture
 * * - Link
 *
 * * Position in Top Tracks
 * * In Favourites
 * * Recommendations
 * * Check if you liked this
 * * Appearances in Recents
 */

const Track: React.FC = () => {
	//#region Hooks
	const dispatch = useDispatch()
	const location = useLocation()
	const statistics = useSelector(state => state.statistics)
	const api = useSpotifyApi()
	const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse>()
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
					const [, message] = _useTry(() => JSON.parse(err.response).error.message)
					dispatch(
						set_error(message === "invalid id" ? new Error("Track not found") : err)
					)
				})
		} else {
			dispatch(set_error(new Error("Track not found")))
		}
	}, [dispatch, location.pathname, api])
	//#endregion

	const appearances: iAppearanceCard[] = [
		{
			hash: false,
			link: "/top-artists/short-term",
			text: "of your most streamed tracks in the last 4 weeks",
			condition: () =>
				(statistics.tracks.short_term?.findIndex(t => t.id === track?.id) || 0) + 1
		},
		{
			hash: false,
			link: "/top-artists/medium-term",
			text: "of your most streamed tracks in the last 6 months",
			condition: () =>
				(statistics.tracks.medium_term?.findIndex(t => t.id === track?.id) || 0) + 1
		},
		{
			hash: false,
			link: "/top-artists/long-term",
			text: "of your most streamed tracks in your lifetime",
			condition: () =>
				(statistics.tracks.long_term?.findIndex(t => t.id === track?.id) || 0) + 1
		},
		{
			hash: false,
			link: "/recents",
			text: "appearances of this Track in your last 50 streams",
			condition: () =>
				(statistics.recents?.filter(t => t.track.id === track?.id).length || 0) + 1
		}
	]

	return (
		<Container>
			<TrackDetails track={track} />

			<Grid direction={{ xs: "column", sm: "row" }} container>
				<Grid sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }} item>
					<Typography sx={{ mt: { sm: 1 }, mb: 2 }} variant="h5">
						Artists
					</Typography>
					{track ? (
						track.artists.map(artist => <ArtistCard key={artist.id} artist={artist} />)
					) : (
						<ArtistCard />
					)}
				</Grid>
				<Grid sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }} item>
					<Typography sx={{ mt: 1, mb: 2 }} variant="h5">
						Album
					</Typography>
					<AlbumCard album={track?.album} position={track?.track_number} />
				</Grid>
			</Grid>

			<Grid sx={{ m: "auto", mt: 3 }} spacing={1} justifyContent="space-evenly" container>
				{appearances.map((appearance, i) => (
					<AppearanceCard key={i} appearance={appearance} />
				))}
			</Grid>

			<Recommendations track={track} />
		</Container>
	)
}

export default Track