import React from "react"
import LazyLoad from "react-lazyload"
import { useNavigate } from "react-router-dom"

import {
	Avatar, Link, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack,
	TableCell, TableRow, Typography
} from "@mui/material"

import getDuration from "../../utils/getDuration"
import AsyncImage from "../AsyncImage"

interface Props {
	smallScreen: boolean
	track?: SpotifyApi.TrackObjectFull
	i?: number
}

const TopTrackItem: React.FC<Props> = (props: Props) => {
	const { smallScreen, track, i } = props

	const navigate = useNavigate()

	const handleTrackClick = (track?: SpotifyApi.TrackObjectFull) => {
		if (track) {
			navigate("/track/" + track.id)
		}
	}

	const handleArtistClick = (artist?: SpotifyApi.ArtistObjectSimplified) => {
		if (artist) {
			navigate("/artist/" + artist.id)
		}
	}

	return smallScreen ? (
		<LazyLoad height={72}>
			<ListItem onClick={() => handleTrackClick(track)} disablePadding>
				<ListItemButton>
					<ListItemAvatar>
						<AsyncImage
							src={track?.album.images[0]?.url}
							skeleton={<Skeleton variant="circular" width={45} height={45} />}
							component={thumbnailUrl => (
								<Avatar sx={{ width: 45, height: 45 }} src={thumbnailUrl} />
							)}
						/>
					</ListItemAvatar>
					{track ? (
						<ListItemText
							primary={(i !== undefined ? i + 1 + ". " : "") + track.name}
							secondary={track.artists.map(a => a.name).join(", ")}
						/>
					) : (
						<Stack my="6px">
							<Skeleton variant="text" width={200} height={24} />
							<Skeleton variant="text" width={160} height={20} />
						</Stack>
					)}
				</ListItemButton>
			</ListItem>
		</LazyLoad>
	) : (
		<TableRow hover>
			<TableCell align="center">{i! + 1}</TableCell>
			<TableCell>
				<AsyncImage
					src={track?.album.images[0]?.url}
					skeleton={<Skeleton variant="circular" width={45} height={45} />}
					component={thumbnailUrl => (
						<Avatar sx={{ width: 45, height: 45 }} src={thumbnailUrl} />
					)}
				/>
			</TableCell>
			<TableCell>
				{track ? (
					<Typography variant="body1">
						<Link
							sx={{ cursor: "pointer" }}
							color="inherit"
							onClick={() => handleTrackClick(track)}
							underline="hover">
							{track.name}
						</Link>
					</Typography>
				) : (
					<Skeleton variant="text" width={160} height={20} />
				)}
			</TableCell>
			<TableCell>
				{track ? (
					<Typography variant="body1">
						{track.artists
							.map(artist => (
								<Link
									sx={{
										cursor: "pointer"
									}}
									key={artist.id}
									color="inherit"
									onClick={() => handleArtistClick(artist)}
									underline="hover">
									{artist.name}
								</Link>
							))
							.reduce<(JSX.Element | string)[]>((r, a) => r.concat(a, ", "), [])
							.slice(0, -1)}
					</Typography>
				) : (
					<Skeleton variant="text" width={120} height={20} />
				)}
			</TableCell>
			<TableCell align="center">
				{track ? (
					<Typography variant="body1">{getDuration(track.duration_ms)}</Typography>
				) : (
					<Skeleton variant="text" width={160} height={20} />
				)}
			</TableCell>
		</TableRow>
	)
}

export default TopTrackItem
