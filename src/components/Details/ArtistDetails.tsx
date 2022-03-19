import AsyncImage from "../AsyncImage"
import getFollowers from "../../utils/getFollowers"
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
	artist?: SpotifyApi.ArtistObjectFull
}

const ArtistDetails: React.FC<Props> = (props: Props) => {
	const { artist } = props

	const dispatch = useAppDispatch()
	const api = useSpotifyApi()
	const [followed, setFollowed] = useState<boolean | null>(null)
	const [showImage, setShowImage] = useState(false)

	useEffect(() => {
		if (!api) return
		if (!artist) return

		api.isFollowingArtists([artist.id])
			.then(res => setFollowed(res[0] !== undefined ? res[0] : null))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, artist])

	const handleArtistOpen = () => {
		if (artist) {
			window.open(artist.external_urls.spotify)
		}
	}

	const handleFollow = () => {
		if (api && artist) {
			setFollowed(null)
			api.followArtists([artist.id])
				.then(() => {
					setFollowed(true)
					dispatch(
						set_snackbar({
							open: true,
							message: "Followed Artist",
							variant: "success"
						})
					)
				})
				.catch(err => {
					setFollowed(false)
					dispatch(
						set_snackbar({
							open: true,
							message: "Failed to Follow Artist",
							variant: "error"
						})
					)
					dispatch(set_error(err))
				})
		}
	}

	const handleUnfollow = () => {
		if (api && artist) {
			setFollowed(null)
			api.unfollowArtists([artist.id])
				.then(() => {
					setFollowed(false)
					dispatch(
						set_snackbar({
							open: true,
							message: "Unfollowed Artist",
							variant: "success"
						})
					)
				})
				.catch(err => {
					setFollowed(true)
					dispatch(
						set_snackbar({
							open: true,
							message: "Failed to Unfollow Artist",
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
					<AsyncImage
						src={artist?.images[0]?.url}
						skeleton={
							<Skeleton
								sx={{ borderRadius: 5 }}
								variant="rectangular"
								width={200}
								height={200}
							/>
						}
						component={thumbnailUrl => (
							<Card sx={{ borderRadius: 5 }} onClick={() => setShowImage(true)}>
								<CardActionArea>
									<CardMedia
										component="img"
										width={200}
										height={200}
										image={thumbnailUrl}
										alt="Image"
									/>
								</CardActionArea>
							</Card>
						)}
					/>
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
					<PageIndicator>ARTIST</PageIndicator>
					{artist ? (
						<>
							<Typography variant="h4">{artist.name}</Typography>
							<Typography variant="h5">{getFollowers(artist)}</Typography>
						</>
					) : (
						<>
							<Skeleton variant="text" width={200} height={45} />
							<Skeleton variant="text" width={160} height={40} />
						</>
					)}

					<Stack direction="row" spacing={1} sx={{ mx: { xs: "auto", sm: 0 } }}>
						<Tooltip
							title={
								followed === null
									? ""
									: followed
									? "Unfollow this artist"
									: "Follow this artist"
							}>
							<IconButton
								sx={{ width: 46 }}
								onClick={followed ? handleUnfollow : handleFollow}>
								{followed === null ? (
									<CircularProgress size={30} />
								) : followed ? (
									<Star />
								) : (
									<StarBorder />
								)}
							</IconButton>
						</Tooltip>
						<Tooltip title="Open in Spotify">
							<IconButton sx={{ width: 46 }} onClick={handleArtistOpen}>
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
					src={artist?.images[0]?.url || ""}
					alt="Image"
				/>
			</Dialog>
		</>
	)
}

export default ArtistDetails
