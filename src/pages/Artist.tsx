import ArtistAppearances from "../components/Appearances/ArtistAppearances"
import ArtistDetails from "../components/Details/ArtistDetails"
import React, { useEffect, useState } from "react"
import Recommendations from "../components/Recommendations"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import {
	Avatar,
	Card,
	CardActionArea,
	Container,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Stack,
	Typography
} from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"

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
	const history = useHistory()
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

	//#region Functions
	const handleTrackClick = (track?: SpotifyApi.TrackObjectFull) => {
		if (track) {
			history.push("/track/" + track.id)
		}
	}
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
					<Card sx={{ my: 1 }} key={i} onClick={() => handleTrackClick(track)}>
						<CardActionArea>
							<ListItem>
								<ListItemAvatar>
									{track ? (
										<Avatar
											sx={{ width: 45, height: 45 }}
											src={track.album.images.at(0)?.url || ""}
										/>
									) : (
										<Skeleton variant="circular" width={45} height={45} />
									)}
								</ListItemAvatar>
								{track ? (
									<ListItemText
										primary={track.name}
										secondary={track.artists.map(a => a.name).join(", ")}
									/>
								) : (
									<Stack my="6px">
										<Skeleton variant="text" width={200} height={24} />
										<Skeleton variant="text" width={160} height={20} />
									</Stack>
								)}
							</ListItem>
						</CardActionArea>
					</Card>
				))}
			</List>

			<ArtistAppearances artist={artist || undefined} />
			<Recommendations artist={artist || undefined} />
		</Container>
	)
}

export default Artist
