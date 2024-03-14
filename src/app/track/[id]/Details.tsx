"use client"

import { Session } from "next-auth"
import { useState } from "react"

import AsyncImage from "@/components/AsyncImage"
import PageIndicator from "@/components/PageIndicator"
import { getDuration } from "@/utils"

export default function Details({
	session,
	track,
}: {
	session: Session
	track: SpotifyApi.TrackObjectFull
}) {
	// const { data: isInMySavedTracks } = useGetIsInMySavedTracksQuery(
	// 	{ ids: [track?.id ?? ""], token },
	// 	{ skip: !track },
	// )
	// const [addToMySavedTracks] = useAddToMySavedTracksMutation()
	// const [removeFromMySavedTracks] = useRemoveFromMySavedTracksMutation()

	const [showImage, setShowImage] = useState(false)

	const handleTrackOpen = () => {
		if (track) {
			window.open(track.external_urls.spotify)
		}
	}

	const handleLike = async () => {
		if (!track) return

		// await addToMySavedTracks({ ids: [track.id], token })
	}

	const handleUnlike = async () => {
		if (!track) return

		// await removeFromMySavedTracks({ ids: [track.id], token })
	}

	const liked = false // isInMySavedTracks?.[0] ?? null

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
						src={track?.album.images[0]?.url}
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
									image={track?.album.images[0]?.url}
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
							<IconButton
								sx={{ width: 46 }}
								onClick={handleTrackOpen}>
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
					src={track?.album.images[0]?.url || ""}
					alt="Image"
				/>
			</Dialog>
		</>
	)
}
