"use client"

import { Session } from "next-auth"
import { useState } from "react"

import { Star, StarBorder } from "@mui/icons-material"
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
	Typography,
} from "@mui/material"

import AsyncImage from "@/components/AsyncImage"
import PageIndicator from "@/components/PageIndicator"
import { getDuration } from "@/utils"

export default function Details({
	session,
	album,
	tracks,
}: {
	session: Session
	album: SpotifyApi.AlbumObjectFull
	tracks: SpotifyApi.TrackObjectSimplified[]
}) {
	// const { data: isInMySavedAlbums } = useGetIsInMySavedAlbumsQuery(
	// 	{ ids: [album?.id ?? ""], token },
	// 	{ skip: !album },
	// )
	// const [addToMySavedAlbums] = useAddToMySavedAlbumsMutation()
	// const [removeFromMySavedAlbums] = useRemoveFromMySavedAlbumsMutation()

	const [showImage, setShowImage] = useState(false)

	const handleAlbumOpen = () => {
		if (album) {
			window.open(album.external_urls.spotify)
		}
	}

	const handleLike = async () => {
		if (!album) return

		// await addToMySavedAlbums({ ids: [album.id], token })
	}

	const handleUnlike = async () => {
		if (!album) return

		// await removeFromMySavedAlbums({ ids: [album.id], token })
	}

	const liked = false // isInMySavedAlbums?.[0] ?? null

	return (
		<>
			<Grid
				sx={{ mt: { xs: 2, sm: 4 }, mb: { sm: 4 } }}
				container
				direction={{ xs: "column", sm: "row" }}>
				<Grid
					sx={{ mx: { xs: "auto", sm: 2 } }}
					item>
					<AsyncImage
						src={album?.images[0]?.url}
						skeleton={
							<Skeleton
								sx={{ borderRadius: 5 }}
								variant="rectangular"
								width={200}
								height={200}
							/>
						}>
						<Card
							sx={{ borderRadius: 5 }}
							onClick={() => setShowImage(true)}>
							<CardActionArea>
								<CardMedia
									component="img"
									width={200}
									height={200}
									image={album?.images[0]?.url}
									alt="Image"
								/>
							</CardActionArea>
						</Card>
					</AsyncImage>
				</Grid>
				<Grid
					sx={{
						my: { xs: 1, sm: 3 },
						mx: { xs: "auto", sm: 3 },
						textAlign: { xs: "center", sm: "start" },
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
									tracks.map(t => t?.duration_ms || 0).reduce((v, a) => v + a, 0),
								)}
							</Typography>
						</>
					) : (
						<>
							<Skeleton
								variant="text"
								width={200}
								height={45}
							/>
							<Skeleton
								variant="text"
								width={160}
								height={40}
							/>
							<Skeleton
								variant="text"
								width={80}
								height={30}
							/>
						</>
					)}

					<Stack
						direction="row"
						spacing={1}
						sx={{ mx: { xs: "auto", sm: 0 } }}>
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
							<IconButton
								sx={{ width: 46 }}
								onClick={handleAlbumOpen}>
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
				slots={{ backdrop: Backdrop }}>
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
