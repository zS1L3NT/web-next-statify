import { useNavigate } from "react-router-dom"

import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from "@mui/material"

import { useGetAlbumQuery } from "../../api/album"
import useAuthenticated from "../../hooks/useAuthenticated"
import AsyncImage from "../AsyncImage"

const AlbumCard = ({ albumId, position }: { albumId?: string; position?: number }) => {
	const token = useAuthenticated()

	const navigate = useNavigate()

	const { data: album } = useGetAlbumQuery({ id: albumId!, token }, { skip: !albumId })

	const handleAlbumClick = () => {
		if (album) {
			navigate("/album/" + album.id)
		}
	}

	return (
		<Card onClick={handleAlbumClick}>
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
						}
						component={thumbnailUrl => (
							<CardMedia
								component="img"
								sx={{ width: 120 }}
								image={thumbnailUrl}
								alt="Picture"
							/>
						)}
					/>
					<CardMedia
						sx={{
							ml: 2,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}>
						{album ? (
							<>
								<Typography variant="h5">{album.name}</Typography>
								<Typography variant="subtitle1">Track #{position}</Typography>
							</>
						) : (
							<>
								<Skeleton
									variant="text"
									width={200}
									height={40}
								/>
								<Skeleton
									variant="text"
									width={160}
									height={30}
								/>
							</>
						)}
					</CardMedia>
				</Box>
			</CardActionArea>
		</Card>
	)
}

export default AlbumCard
