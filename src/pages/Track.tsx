import AlbumCard from "../components/Cards/AlbumCard"
import ArtistCard from "../components/Cards/ArtistCard"
import getDuration from "../utils/getDuration"
import React, { useEffect, useState } from "react"
import Recommendations from "../components/Recommendations"
import TrackAppearances from "../components/TrackAppearances"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Avatar, Backdrop, Box, Card, CardActionArea, CardMedia, Container, Dialog, Grid, IconButton, Skeleton, Tooltip, Typography } from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

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
 * ? Check if you liked this
 * ? Appearances in Recents
 */

const Track = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const location = useLocation()
	const api = useSpotifyApi()
	const [showImage, setShowImage] = useState(false)
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

	//#region Functions
	const handleTrackOpen = () => {
		if (track) {
			window.open(track?.external_urls.spotify)
		}
	}

	const handleImageOpen = () => {
		setShowImage(true)
	}

	const handleImageClose = () => {
		setShowImage(false)
	}
	//#endregion

	return (
		<>
			<Container>
				<Grid
					sx={{ mt: { xs: 2, sm: 4 }, mb: { sm: 4 } }}
					container
					direction={{ xs: "column", sm: "row" }}>
					<Grid sx={{ mx: { xs: "auto", sm: 2 } }} item>
						{track ? (
							<Card sx={{ borderRadius: 5 }} onClick={handleImageOpen}>
								<CardActionArea>
									<CardMedia
										component="img"
										width={200}
										height={200}
										image={track.album.images[0]?.url || ""}
										alt="Image"
									/>
								</CardActionArea>
							</Card>
						) : (
							<Skeleton
								sx={{ borderRadius: 5 }}
								variant="rectangular"
								width={200}
								height={200}
							/>
						)}
					</Grid>
					<Grid
						sx={{
							my: { xs: 1, sm: 3 },
							mx: { xs: "auto", sm: 3 },
							textAlign: { xs: "center", sm: "start" }
						}}
						item
						display="flex"
						flexDirection="column"
						justifyContent="center">
						{track ? (
							<>
								<Typography variant="h4">{track.name}</Typography>
								<Typography variant="h5">{track.artists[0].name}</Typography>
								<Typography variant="subtitle1">{getDuration(track)}</Typography>
							</>
						) : (
							<>
								<Skeleton variant="text" width={200} height={45} />
								<Skeleton variant="text" width={160} height={40} />
								<Skeleton variant="text" width={80} height={30} />
							</>
						)}

						<Tooltip title="Open in Spotify">
							<IconButton
								sx={{ width: 46, mx: { xs: "auto", sm: 0 } }}
								onClick={handleTrackOpen}>
								<Avatar
									sx={{ width: 30, height: 30 }}
									src="/assets/spotify-logo.png"
									alt="Spotify"
								/>
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
				<Grid direction={{ xs: "column", sm: "row" }} container>
					<Grid sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }} item>
						<Typography sx={{ mt: { sm: 1 }, mb: 2 }} variant="h5">
							Artists
						</Typography>
						{track ? (
							track.artists.map(artist => (
								<ArtistCard key={artist.id} artist={artist} />
							))
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
				<TrackAppearances track={track || undefined} />
				<Recommendations track={track || undefined} />
			</Container>
			<Dialog open={showImage} onClose={handleImageClose} BackdropComponent={Backdrop}>
				<Box
					sx={{ width: { xs: 300, sm: 500 }, height: { xs: 300, sm: 500 } }}
					component="img"
					src={track?.album.images[0]?.url || ""}
					alt="Image"
				/>
			</Dialog>
		</>
	)
}

export default Track
