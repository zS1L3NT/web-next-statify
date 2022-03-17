import React, { useEffect } from "react"
import useAsyncImageUrl from "../hooks/useAsyncImageUrl"
import {
	Avatar,
	Card,
	CardActionArea,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Stack
} from "@mui/material"
import { useNavigate } from "react-router-dom"

interface Props {
	track?: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified
	album?: SpotifyApi.AlbumObjectSimplified
	i: number
}

const Track: React.FC<Props> = (props: Props) => {
	const { track, album, i } = props

	const navigate = useNavigate()
	const [thumbnailUrl, setThumbnailUrl] = useAsyncImageUrl()

	useEffect(() => {
		setThumbnailUrl((track && "album" in track ? track.album : album)?.images[0]?.url)
	}, [track])

	const handleTrackClick = (track?: SpotifyApi.TrackObjectSimplified) => {
		if (track) {
			navigate("/track/" + track.id)
		}
	}

	return (
		<Card sx={{ my: 1 }} key={i} onClick={() => handleTrackClick(track)}>
			<CardActionArea>
				<ListItem>
					<ListItemAvatar>
						{thumbnailUrl ? (
							<Avatar sx={{ width: 45, height: 45 }} src={thumbnailUrl} />
						) : (
							<Skeleton variant="circular" width={45} height={45} />
						)}
					</ListItemAvatar>
					{track ? (
						<ListItemText
							primary={track.name}
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
	)
}

export default Track
