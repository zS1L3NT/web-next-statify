import getFollowers from "../utils/getFollowers"
import React, { useEffect } from "react"
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Grid,
	Typography
} from "@mui/material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface Props {
	term: "short_term" | "medium_term" | "long_term"
	description: string
}

const TopArtistsLongTerm: React.FC<Props> = (props: Props) => {
	const { term, description } = props

	//#region Hooks
	const history = useHistory()
	const artists = useSelector(state => state.statistics.artists)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (artists[term]) return

		history.push("/login")
	}, [history, artists, term])
	//#endregion

	//#region Functions
	const handleArtistClick = (artist: SpotifyApi.ArtistObjectFull) => {
		history.push("/artist/" + artist.id)
	}
	//#endregion

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography variant="h4">Top Artists</Typography>
					<Typography variant="h6" gutterBottom>
						{description}
					</Typography>
					<Typography variant="body1">
						These are the artists you listen to the most
					</Typography>
				</CardContent>
			</Card>
			{artists[term] ? (
				<Grid sx={{ my: 1 }} container spacing={5} justifyContent="space-evenly">
					{artists[term]?.map((artist, i) => (
						<Grid key={artist.id} item>
							<Card
								sx={{ p: 0, minWidth: 250 }}
								onClick={() => handleArtistClick(artist)}>
								<CardActionArea>
									<CardMedia
										component="img"
										alt="Picture"
										width={250}
										height={250}
										image={artist.images.at(0)?.url || ""}
									/>
									<CardContent>
										<Typography variant="h5">
											{i + 1 + ". " + artist.name}
										</Typography>
										<Typography variant="body2">
											{getFollowers(artist)}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			) : (
				<CircularProgress sx={{ my: 5, mx: "auto", display: "block" }} />
			)}
		</Container>
	)
}

export default TopArtistsLongTerm
