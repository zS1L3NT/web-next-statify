import getFollowers from "../../utils/getFollowers"
import React, { useEffect, useState } from "react"
import useSpotifyApi from "../../hooks/useSpotifyApi"
import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from "@mui/material"
import { set_error } from "../../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

interface Props {
	artist?: SpotifyApi.ArtistObjectSimplified
}

const ArtistCard = (props: Props): JSX.Element => {
	const { artist } = props

	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const api = useSpotifyApi()
	const [data, setData] = useState<SpotifyApi.ArtistObjectFull>()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (!api) return
		if (!artist) return

		api.getArtist(artist.id)
			.then(setData)
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, artist])
	//#endregion

	//#region Functions
	const handleArtistClick = () => {
		if (artist) {
			history.push("/artist/" + artist.id)
		}
	}
	//#endregion

	return (
		<Card sx={{ mb: 2 }} onClick={handleArtistClick}>
			<CardActionArea>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row"
					}}>
					{data ? (
						<CardMedia
							component="img"
							sx={{ width: 120 }}
							image={data.images[0]?.url || ""}
							alt="Picture"
						/>
					) : (
						<Skeleton variant="rectangular" width={120} height={120} />
					)}
					<CardMedia
						sx={{
							ml: 2,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center"
						}}>
						{data ? (
							<>
								<Typography variant="h5">{data.name}</Typography>
								<Typography variant="subtitle1">{getFollowers(data)}</Typography>
							</>
						) : (
							<>
								<Skeleton variant="text" width={200} height={40} />
								<Skeleton variant="text" width={160} height={30} />
							</>
						)}
					</CardMedia>
				</Box>
			</CardActionArea>
		</Card>
	)
}

export default ArtistCard
