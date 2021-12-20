import getFollowers from "../../utils/getFollowers"
import React from "react"
import { Card, CardActionArea, CardContent, CardMedia, Grid, Skeleton, Typography } from "@mui/material"
import { useHistory } from "react-router-dom"

interface Props {
	artist?: SpotifyApi.ArtistObjectFull
	i: number
}

const TopArtistItem: React.FC<Props> = (props: Props) => {
	const { artist, i } = props

	//#region Hooks
	const history = useHistory()
	//#endregion

	//#region Functions
	const handleArtistClick = (artist?: SpotifyApi.ArtistObjectFull) => {
		if (artist) {
			history.push("/artist/" + artist.id)
		}
	}
	//#endregion

	return (
		<Grid item>
			<Card sx={{ p: 0, minWidth: 250 }} onClick={() => handleArtistClick(artist)}>
				<CardActionArea>
					{artist ? (
						<CardMedia
							component="img"
							alt="Picture"
							width={250}
							height={250}
							image={artist.images.at(0)?.url || ""}
						/>
					) : (
						<Skeleton variant="rectangular" width={250} height={250} />
					)}
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
								<Skeleton variant="text" width={100} height={40} />
								<Skeleton variant="text" width={50} height={20} />
							</>
						)}
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	)
}

export default TopArtistItem
