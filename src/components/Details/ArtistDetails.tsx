import React, { useState } from "react"

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

import {
	useFollowArtistsMutation,
	useGetIsFollowingArtistsQuery,
	useUnfollowArtistsMutation,
} from "../../api/artist"
import useAuthenticated from "../../hooks/useAuthenticated"
import getFollowers from "../../utils/getFollowers"
import AsyncImage from "../AsyncImage"
import PageIndicator from "../PageIndicator"

const ArtistDetails = ({ artist }: { artist?: SpotifyApi.ArtistObjectFull }) => {
	const token = useAuthenticated()

	const { data: isFollowingArtists } = useGetIsFollowingArtistsQuery(
		{ ids: [artist?.id ?? ""], token },
		{ skip: !artist },
	)
	const [followArtists] = useFollowArtistsMutation()
	const [unfollowArtists] = useUnfollowArtistsMutation()

	const [showImage, setShowImage] = useState(false)

	const handleArtistOpen = () => {
		if (artist) {
			window.open(artist.external_urls.spotify)
		}
	}

	const handleFollow = async () => {
		if (!artist) return

		await followArtists({ ids: [artist.id], token })
	}

	const handleUnfollow = async () => {
		if (!artist) return

		await unfollowArtists({ ids: [artist.id], token })
	}

	const following = isFollowingArtists?.[0] ?? null

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
							<Card
								sx={{ borderRadius: 5 }}
								onClick={() => setShowImage(true)}>
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
						textAlign: { xs: "center", sm: "start" },
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
						</>
					)}

					<Stack
						direction="row"
						spacing={1}
						sx={{ mx: { xs: "auto", sm: 0 } }}>
						<Tooltip
							title={
								following === null
									? ""
									: following
									? "Unfollow this artist"
									: "Follow this artist"
							}>
							<IconButton
								sx={{ width: 46 }}
								onClick={following ? handleUnfollow : handleFollow}>
								{following === null ? (
									<CircularProgress size={30} />
								) : following ? (
									<Star />
								) : (
									<StarBorder />
								)}
							</IconButton>
						</Tooltip>
						<Tooltip title="Open in Spotify">
							<IconButton
								sx={{ width: 46 }}
								onClick={handleArtistOpen}>
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
