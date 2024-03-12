import Link from "next/link"
import { Session } from "next-auth"

import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from "@mui/material"

import { getArtist } from "@/queries"

import getFollowers from "../../utils/getFollowers"
import AsyncImage from "../AsyncImage"

export default async function ArtistCard({ session, id }: { session: Session; id: string }) {
	const artist = await getArtist(session.token, id)

	return (
		<Card
			component={Link}
			href={`/artist/${id}`}
			sx={{ mb: 2 }}>
			<CardActionArea>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
					}}>
					<AsyncImage
						src={artist?.images[0]?.url}
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
							image={artist?.images[0]?.url}
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
						<Typography variant="h5">{artist.name}</Typography>
						<Typography variant="subtitle1">{getFollowers(artist)}</Typography>
					</CardMedia>
				</Box>
			</CardActionArea>
		</Card>
	)
}
