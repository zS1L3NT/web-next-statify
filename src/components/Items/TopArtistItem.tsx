import { useNavigate } from "react-router-dom"

import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Skeleton,
	Typography,
} from "@mui/material"

import getFollowers from "../../utils/getFollowers"
import AsyncImage from "../AsyncImage"

const TopArtistItem = ({ artist, i }: { artist?: SpotifyApi.ArtistObjectFull; i: number }) => {
	const navigate = useNavigate()

	const handleArtistClick = (artist?: SpotifyApi.ArtistObjectFull) => {
		if (artist) {
			navigate("/artist/" + artist.id)
		}
	}

	return (
		<Grid item>
			<Card
				sx={{ p: 0, minWidth: 250 }}
				onClick={() => handleArtistClick(artist)}>
				<CardActionArea>
					<AsyncImage
						src={artist?.images[0]?.url}
						skeleton={
							<Skeleton
								variant="rectangular"
								width={250}
								height={250}
							/>
						}
						component={thumbnailUrl => (
							<CardMedia
								component="img"
								alt="Picture"
								width={250}
								height={250}
								image={thumbnailUrl}
							/>
						)}
					/>
					<CardContent>
						{artist ? (
							<>
								<Typography variant="h5">
									{(i !== undefined ? i + 1 + ". " : "") + artist.name}
								</Typography>
								<Typography variant="body2">{getFollowers(artist)}</Typography>
							</>
						) : (
							<>
								<Skeleton
									variant="text"
									width={100}
									height={40}
								/>
								<Skeleton
									variant="text"
									width={50}
									height={20}
								/>
							</>
						)}
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	)
}

export default TopArtistItem
