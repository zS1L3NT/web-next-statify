import getDuration from "../../utils/getDuration"
import PageIndicator from "../PageIndicator"
import React, { useEffect, useState } from "react"
import useSpotifyApi from "../../hooks/useSpotifyApi"
import {
	Avatar,
	Backdrop,
	Box,
	Card,
	CardActionArea,
	CardMedia,
	CircularProgress,
	Dialog,
	Grid,
	IconButton,
	Skeleton,
	Stack,
	Tooltip,
	Typography
} from "@mui/material"
import { set_error } from "../../actions/ErrorActions"
import { set_snackbar } from "../../actions/SnackbarActions"
import { Star, StarBorder } from "@mui/icons-material"
import { useDispatch } from "react-redux"

interface Props {
	album?: SpotifyApi.AlbumObjectFull
	tracks: (SpotifyApi.TrackObjectSimplified | undefined)[]
}

const AlbumDetails: React.FC<Props> = (props: Props) => {
	const { album, tracks } = props

	//#region Hooks
	const dispatch = useDispatch()
	const api = useSpotifyApi()
	const [liked, setLiked] = useState<boolean | null>(null)
	const [showImage, setShowImage] = useState(false)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (!api) return
		if (!album) return

		api.containsMySavedAlbums([album.id])
			.then(res => setLiked(res[0]))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, album])
	//#endregion

	//#region Functions
	const handleAlbumOpen = () => {
		if (album) {
			window.open(album.external_urls.spotify)
		}
	}

	const handleLike = () => {
		if (api && album) {
			setLiked(null)
			api.addToMySavedAlbums([album.id])
				.then(() => {
					setLiked(true)
					dispatch(
						set_snackbar({
							message: "Album saved to your Library",
							variant: "success"
						})
					)
				})
				.catch(err => {
					setLiked(false)
					dispatch(
						set_snackbar({
							message: "Failed to save Album to your Library",
							variant: "error"
						})
					)
					dispatch(set_error(err))
				})
		}
	}

	const handleUnlike = () => {
		if (api && album) {
			setLiked(null)
			api.removeFromMySavedAlbums([album.id])
				.then(() => {
					setLiked(false)
					dispatch(
						set_snackbar({
							message: "Album removed from your Library",
							variant: "success"
						})
					)
				})
				.catch(err => {
					setLiked(true)
					dispatch(
						set_snackbar({
							message: "Failed to remove Album from your Library",
							variant: "error"
						})
					)
					dispatch(set_error(err))
				})
		}
	}
	//#endregion

	return (
		<>
			<Grid
				sx={{ mt: { xs: 2, sm: 4 }, mb: { sm: 4 } }}
				container
				direction={{ xs: "column", sm: "row" }}>
				<Grid sx={{ mx: { xs: "auto", sm: 2 } }} item>
					{album ? (
						<Card sx={{ borderRadius: 5 }} onClick={() => setShowImage(true)}>
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
					<PageIndicator>ALBUM</PageIndicator>
					{album ? (
						<>
							<Typography variant="h4">{album.name}</Typography>
							<Typography variant="h5">
								{album.artists.map(a => a.name).join(", ")}
							</Typography>
							<Typography variant="subtitle1">
								{getDuration(
									tracks.map(t => t?.duration_ms || 0).reduce((v, a) => v + a, 0)
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
									? "Remove this Album from your Library"
									: "Add this Album to your Library"
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
			<Dialog
				open={showImage}
				onClose={() => setShowImage(false)}
				BackdropComponent={Backdrop}>
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

export default AlbumDetails
