import ArtistCard from "../components/Cards/ArtistCard"
import getDuration from "../utils/getDuration"
import React, { useEffect, useState } from "react"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import {
	Avatar,
	Backdrop,
	Box,
	Card,
	CardActionArea,
	CardMedia,
	CircularProgress,
	Container,
	Dialog,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Stack,
	Tooltip,
	Typography
} from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { Star, StarBorder } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { useTryAsync as _useTryAsync } from "no-try"

/**
 * * Name
 * ! Release Date
 * * Length
 * * Artists
 * * - Name
 * * - Link
 * * - Picture
 * * Tracks
 * * - Name
 * * - Artists
 * * - Picture
 */

const Album: React.FC = () => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const location = useLocation()
	const api = useSpotifyApi()
	const [album, setAlbum] = useState<SpotifyApi.SingleAlbumResponse | null>()
	const [liked, setLiked] = useState<boolean | null>(null)
	const [showImage, setShowImage] = useState(false)
	const [tracks, setTracks] = useState<(SpotifyApi.TrackObjectSimplified | undefined)[]>(
		Array(10).fill(undefined)
	)
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		if (!api) return

		const [, , albumId] = location.pathname.split("/")
		if (albumId) {
			api.getAlbum(albumId)
				.then(setAlbum)
				.catch(err => {
					setAlbum(null)
					dispatch(set_error(err))
				})
		} else {
			dispatch(set_error(new Error("Album not found")))
		}
	}, [dispatch, location, api])

	useEffect(() => {
		if (!api) return
		if (!album) return

		api.containsMySavedAlbums([album.id])
			.then(res => setLiked(res[0]))
			.catch(err => dispatch(set_error(err)))

		_useTryAsync(async () => {
			const tracks: SpotifyApi.TrackObjectSimplified[] = []
			const total = (await api.getAlbumTracks(album.id)).total

			while (tracks.length < total) {
				tracks.push(
					...(await api.getAlbumTracks(album.id, { limit: 50, offset: tracks.length }))
						.items
				)
			}

			return tracks
		}).then(([err, tracks]) => {
			if (err) {
				dispatch(set_error(err))
			} else {
				setTracks(tracks)
			}
		})
	}, [dispatch, api, album])
	//#endregion

	//#region Functions
	const handleAlbumOpen = () => {
		if (album) {
			window.open(album.external_urls.spotify)
		}
	}

	const handleTrackClick = (track?: SpotifyApi.TrackObjectSimplified) => {
		if (track) {
			history.push("/track/" + track.id)
		}
	}

	const handleImageOpen = () => {
		setShowImage(true)
	}

	const handleImageClose = () => {
		setShowImage(false)
	}

	const handleLike = () => {
		if (api && album) {
			setLiked(null)
			api.addToMySavedAlbums([album.id])
				.then(() => setLiked(true))
				.catch(err => {
					setLiked(false)
					dispatch(set_error(err))
				})
		}
	}

	const handleUnlike = () => {
		if (api && album) {
			setLiked(null)
			api.removeFromMySavedAlbums([album.id])
				.then(() => setLiked(false))
				.catch(err => {
					setLiked(true)
					dispatch(set_error(err))
				})
		}
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
						{album ? (
							<Card sx={{ borderRadius: 5 }} onClick={handleImageOpen}>
								<CardActionArea>
									<CardMedia
										component="img"
										width={200}
										height={200}
										image={album.images[0]?.url || ""}
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
						{album ? (
							<>
								<Typography variant="h4">{album.name}</Typography>
								<Typography variant="h5">
									{album.artists.map(a => a.name).join(", ")}
								</Typography>
								<Typography variant="subtitle1">
									{getDuration(
										tracks
											.map(t => t?.duration_ms || 0)
											.reduce((v, a) => v + a, 0)
									)}
								</Typography>
							</>
						) : (
							<>
								<Skeleton variant="text" width={200} height={45} />
								<Skeleton variant="text" width={160} height={40} />
								<Skeleton variant="text" width={80} height={30} />
							</>
						)}

						<Stack direction="row" spacing={1} sx={{ mx: { xs: "auto", sm: 0 } }}>
							<Tooltip
								title={
									liked === null
										? ""
										: liked
										? "Unfavourite this album"
										: "Favourite this album"
								}>
								<IconButton
									sx={{ width: 46 }}
									onClick={liked ? handleUnlike : handleLike}>
									{liked === null ? (
										<CircularProgress size={30} />
									) : liked ? (
										<Star />
									) : (
										<StarBorder />
									)}
								</IconButton>
							</Tooltip>
							<Tooltip title="Open in Spotify">
								<IconButton sx={{ width: 46 }} onClick={handleAlbumOpen}>
									<Avatar
										sx={{ width: 30, height: 30 }}
										src="/assets/spotify-logo.png"
										alt="Spotify"
									/>
								</IconButton>
							</Tooltip>
						</Stack>
					</Grid>
				</Grid>

				<Typography sx={{ mt: { sm: 1 }, mb: 2 }} variant="h5">
					Artists
				</Typography>
				<Grid direction={{ xs: "column", sm: "row" }} container>
					{album ? (
						album.artists.map(artist => (
							<Grid
								sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }}
								key={artist.id}
								item>
								<ArtistCard artist={artist} />
							</Grid>
						))
					) : (
						<Grid sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }} item>
							<ArtistCard />
						</Grid>
					)}
				</Grid>

				<Typography sx={{ mt: { sm: 1 }, mb: 2 }} variant="h5">
					Tracks
				</Typography>
				<List>
					{tracks.map((track, i) => (
						<Card sx={{ my: 1 }} key={i} onClick={() => handleTrackClick(track)}>
							<CardActionArea>
								<ListItem>
									<ListItemAvatar>
										{track ? (
											<Avatar
												sx={{ width: 45, height: 45 }}
												src={album?.images.at(0)?.url || ""}
											/>
										) : (
											<Skeleton variant="circular" width={45} height={45} />
										)}
									</ListItemAvatar>
									{track ? (
										<ListItemText
											primary={i + 1 + ". " + track.name}
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
			</Container>
			<Dialog open={showImage} onClose={handleImageClose} BackdropComponent={Backdrop}>
				<Box
					sx={{ width: { xs: 300, sm: 500 }, height: { xs: 300, sm: 500 } }}
					component="img"
					src={album?.images[0]?.url || ""}
					alt="Image"
				/>
			</Dialog>
		</>
	)
}

export default Album
