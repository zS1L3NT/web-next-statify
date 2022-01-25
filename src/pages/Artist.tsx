import AppearanceCard from "../components/Cards/AppearanceCard"
import ArtistDetails from "../components/Details/ArtistDetails"
import React, { useEffect, useState } from "react"
import Recommendations from "../components/Recommendations"
import Track from "../components/Track"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Container, Grid, List, Skeleton, Stack, Typography } from "@mui/material"
import { set_error } from "../slices/ErrorSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { useTry as _useTry } from "no-try"

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
	const dispatch = useAppDispatch()
	const statistics = useAppSelector(state => state.statistics)
	const location = useLocation()
	const navigate = useNavigate()
	const api = useSpotifyApi()
	const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse>()
	const [topTracks, setTopTracks] = useState<(SpotifyApi.TrackObjectFull | undefined)[]>(
		Array(5).fill(undefined)
	)

	useAuthenticated()

	useEffect(() => {
		if (!api) return

		const [, , artistId] = location.pathname.split("/")
		if (artistId) {
			api.getArtist(artistId)
				.then(setArtist)
				.catch(err => {
					const [, message] = _useTry(() => JSON.parse(err.response).error.message)
					dispatch(
						set_error(message === "invalid id" ? new Error("Artist not found") : err)
					)
				})
		} else {
			dispatch(set_error(new Error("Artist not found")))
		}
	}, [dispatch, location.pathname, api])

	useEffect(() => {
		if (!api) return
		if (!artist) return

		api.getArtistTopTracks(artist.id, "SG")
			.then(res => setTopTracks(res.tracks.slice(0, 5)))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, artist])

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
			sessionStorage.setItem("redirect", location.pathname)
			navigate("/login")
		}
	}, [navigate, location.pathname, artist, statistics])

	const appearances: iAppearanceCard[] = [
		{
			hash: true,
			text: "of your most streamed artists in the last 4 weeks",
			link: "/top-artists/short-term",
			condition: () =>
				(statistics.artists.short_term?.findIndex(t => t.id === artist?.id) || 0) + 1
		},
		{
			hash: true,
			text: "of your most streamed artists in the last 6 months",
			link: "/top-artists/medium-term",
			condition: () =>
				(statistics.artists.medium_term?.findIndex(t => t.id === artist?.id) || 0) + 1
		},
		{
			hash: true,
			text: "of your most streamed artists in your lifetime",
			link: "/top-artists/long-term",
			condition: () =>
				(statistics.artists.long_term?.findIndex(t => t.id === artist?.id) || 0) + 1
		},
		{
			hash: false,
			link: "/top-tracks/short-term",
			text: "appearances from this Artist in your most streamed tracks in the last 4 weeks",
			condition: () =>
				statistics.tracks.short_term?.filter(t => t.artists.find(a => a.id === artist?.id))
					.length
		},
		{
			hash: false,
			link: "/top-tracks/medium-term",
			text: "appearances from this Artist in your most streamed tracks in the last 6 months",
			condition: () =>
				statistics.tracks.medium_term?.filter(t => t.artists.find(a => a.id === artist?.id))
					.length
		},
		{
			hash: false,
			link: "/top-tracks/long-term",
			text: "appearances from this Artist in your most streamed tracks in your lifetime",
			condition: () =>
				statistics.tracks.long_term?.filter(t => t.artists.find(a => a.id === artist?.id))
					.length
		},
		{
			hash: false,
			link: "/recents",
			text: "appearances from this Artist in your last 50 streams",
			condition: () =>
				statistics.recents?.filter(t => t.track.artists.find(a => a.id === artist?.id))
					.length
		}
	]

	return (
		<Container>
			<ArtistDetails artist={artist} />

			<Stack sx={{ mt: 2 }} spacing={1} direction="row">
				{!artist ? <Skeleton variant="text" width={100} height={40} /> : null}
				<Typography sx={{ height: "fit-content", my: "auto !important" }} variant="h5">
					{artist ? artist.name + "'s" : ""} Top Tracks
				</Typography>
			</Stack>
			<List>
				{topTracks.map((track, i) => (
					<Track key={i} track={track} i={i} />
				))}
			</List>

			<Grid sx={{ m: "auto", mt: 3 }} spacing={1} justifyContent="space-evenly" container>
				{appearances.map((appearance, i) => (
					<AppearanceCard key={i} appearance={appearance} />
				))}
			</Grid>

			<Recommendations artist={artist} />
		</Container>
	)
}

export default Artist
