import ArtistAppearances from "../components/ArtistAppearances"
import getFollowers from "../utils/getFollowers"
import React, { useEffect, useState } from "react"
import Recommendations from "../components/Recommendations"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { Avatar, Backdrop, Box, Card, CardActionArea, CardMedia, Container, Dialog, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Tooltip, Typography } from "@mui/material"
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
 * ? Recommended
 */

const Artist = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const location = useLocation()
	const api = useSpotifyApi()
	const [showImage, setShowImage] = useState(false)
	const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse | null>()
	const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([])
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		if (!api) return

		const [, , artistId] = location.pathname.split("/")
		if (artistId) {
			api.getArtist(artistId)
				.then(artist => {
					setArtist(artist)
					return api.getArtistTopTracks(artist.id, "SG")
				})
				.then(res => setTopTracks(res.tracks.slice(0, 5)))
				.catch(err => {
					console.error(err)
					setArtist(null)
					dispatch(
						set_error(
							err.message === "invalid id" ? new Error("Artist not found") : err
						)
					)
				})
		} else {
			dispatch(set_error(new Error("Artist not found")))
		}
	}, [dispatch, location, api])
	//#endregion

	//#region Functions
	const handleArtistOpen = () => {
		if (artist) {
			window.open(artist.external_urls.spotify)
		}
	}

	const handleTrackClick = (track: SpotifyApi.TrackObjectFull) => {
		history.push("/track/" + track.id)
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
						{artist ? (
							<Card sx={{ borderRadius: 5 }} onClick={handleImageOpen}>
								<CardActionArea>
									<CardMedia
										component="img"
										width={200}
										height={200}
										image={artist.images[0]?.url || ""}
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

						<Tooltip title="Open in Spotify">
							<IconButton
								sx={{ width: 46, mx: { xs: "auto", sm: 0 } }}
								onClick={handleArtistOpen}>
								<Avatar
									sx={{ width: 30, height: 30 }}
									src="/assets/spotify-logo.png"
									alt="Spotify"
								/>
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>

				<Typography sx={{ mt: 2 }} variant="h5">
					{artist ? artist.name + "'s " : ""}Top Tracks
				</Typography>
				<List>
					{topTracks.map((track, i) => (
						<Card sx={{ my: 1 }} key={track.id} onClick={() => handleTrackClick(track)}>
							<CardActionArea>
								<ListItem>
									<ListItemAvatar>
										<Avatar
											sx={{ width: 45, height: 45 }}
											src={track.album.images.at(-1)?.url || ""}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={i + 1 + ". " + track.name}
										secondary={track.artists.map(a => a.name).join(", ")}
									/>
								</ListItem>
							</CardActionArea>
						</Card>
					))}
				</List>

				<ArtistAppearances artist={artist || undefined} />
				<Recommendations artist={artist || undefined} />
			</Container>
			<Dialog open={showImage} onClose={handleImageClose} BackdropComponent={Backdrop}>
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

export default Artist
