import Link from "next/link"
import { Session } from "next-auth"

import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from "@mui/material"

import { getAlbum } from "@/queries"

import AsyncImage from "../AsyncImage"

export default async function AlbumCard({
	session,
	id,
	position,
}: {
	session: Session
	id: string
	position: number
}) {
	const album = await getAlbum(session.token, id)

	return (
		<Card
			component={Link}
			href={`/album/${id}`}>
			<CardActionArea>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
					}}>
					<AsyncImage
						src={album?.images[0]?.url}
						skeleton={
							<Skeleton
								variant="rectangular"
								width={120}
								height={120}
							/>
						}>
						<CardMedia
							component="img"
							sx={{ width: 120 }}
							image={album?.images[0]?.url}
							alt="Picture"
						/>
					</AsyncImage>
					<CardMedia
						sx={{
							ml: 2,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}>
						<Typography variant="h5">{album.name}</Typography>
						<Typography variant="subtitle1">Track #{position}</Typography>
					</CardMedia>
				</Box>
			</CardActionArea>
		</Card>
	)
}
