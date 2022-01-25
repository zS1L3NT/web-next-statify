import getDuration from "../../utils/getDuration"
import PageIndicator from "../PageIndicator"
import React, { useEffect, useState } from "react"
import useAppDispatch from "../../hooks/useAppDispatch"
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
import { set_error } from "../../slices/ErrorSlice"
import { set_snackbar } from "../../slices/SnackbarSlice"
import { Star, StarBorder } from "@mui/icons-material"

interface Props {
	track?: SpotifyApi.TrackObjectFull
}

const TrackDetails: React.FC<Props> = (props: Props) => {
	const { track } = props

	const dispatch = useAppDispatch()
	const api = useSpotifyApi()
	const [liked, setLiked] = useState<boolean | null>(null)
	const [showImage, setShowImage] = useState(false)

	useEffect(() => {
		if (!api) return
		if (!track) return

		api.containsMySavedTracks([track.id])
			.then(res => setLiked(res[0] !== undefined ? res[0] : null))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, track])

	const handleTrackOpen = () => {
		if (track) {
			window.open(track.external_urls.spotify)
		}
	}

	const handleLike = () => {
		if (api && track) {
			setLiked(null)
			api.addToMySavedTracks([track.id])
				.then(() => {
					setLiked(true)
					dispatch(
						set_snackbar({
							open: true,
							message: "Track added to your Liked Tracks",
							variant: "success"
						})
					)
				})
				.catch(err => {
					setLiked(false)
					dispatch(
						set_snackbar({
							open: true,
							message: "Failed to add Track to your Liked Tracks",
							variant: "error"
						})
					)
					dispatch(set_error(err))
				})
		}
	}

	const handleUnlike = () => {
		if (api && track) {
			setLiked(null)
			api.removeFromMySavedTracks([track.id])
				.then(() => {
					setLiked(false)
					dispatch(
						set_snackbar({
							open: true,
							message: "Track removed from your Liked Tracks",
							variant: "success"
						})
					)
				})
				.catch(err => {
					setLiked(true)
					dispatch(
						set_snackbar({
							open: true,
							message: "Failed to remove Track from your Liked Tracks",
							variant: "error"
						})
					)
					dispatch(set_error(err))
				})
		}
	}

	return (
		<>
			<Grid
				sx={{ mt: { xs: 2, sm: 4 }, mb: { sm: 4 } }}
				container
				direction={{ xs: "column", sm: "row" }}>
				<Grid sx={{ mx: { xs: "auto", sm: 2 } }} item>
					{track ? (
						<Card sx={{ borderRadius: 5 }} onClick={() => setShowImage(true)}>
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
					<PageIndicator>TRACK</PageIndicator>
					{track ? (
						<>
							<Typography variant="h4">{track.name}</Typography>
							<Typography variant="h5">
								{track.artists.map(a => a.name).join(", ")}
							</Typography>
							<Typography variant="subtitle1">
								{getDuration(track.duration_ms)}
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
									? "Remove this Track from your Liked Tracks"
									: "Add this Track to your Liked Tracks"
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
							<IconButton sx={{ width: 46 }} onClick={handleTrackOpen}>
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
					src={track?.album.images[0]?.url || ""}
					alt="Image"
				/>
			</Dialog>
		</>
	)
}

export default TrackDetails
