import Link from "next/link"

import {
	Avatar,
	Card,
	CardActionArea,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Stack,
} from "@mui/material"

import AsyncImage from "./AsyncImage"

export default function Track({
	track,
	album,
	i,
}: {
	track?: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified
	album?: SpotifyApi.SingleAlbumResponse
	i: number
}) {
	return (
		// <LazyLoad height={72}>
		<Card
			component={Link}
			href={`/track/${track?.id}`}
			sx={{ my: 1 }}
			key={i}>
			<CardActionArea>
				<ListItem>
					<ListItemAvatar>
						<AsyncImage
							src={(track && "album" in track ? track.album : album)?.images[0]?.url}
							skeleton={
								<Skeleton
									variant="circular"
									width={45}
									height={45}
								/>
							}>
							<Avatar
								sx={{ width: 45, height: 45 }}
								src={
									(track && "album" in track ? track.album : album)?.images[0]
										?.url
								}
							/>
						</AsyncImage>
					</ListItemAvatar>
					{track ? (
						<ListItemText
							primary={track.name}
							secondary={track.artists.map(a => a.name).join(", ")}
						/>
					) : (
						<Stack my="6px">
							<Skeleton
								variant="text"
								width={200}
								height={24}
							/>
							<Skeleton
								variant="text"
								width={160}
								height={20}
							/>
						</Stack>
					)}
				</ListItem>
			</CardActionArea>
		</Card>
		// </LazyLoad>
	)
}
