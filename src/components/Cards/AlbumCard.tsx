import React, { useEffect, useState } from "react"
import useSpotifyApi from "../../hooks/useSpotifyApi"
import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from "@mui/material"
import { set_error } from "../../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

interface Props {
	album?: SpotifyApi.AlbumObjectSimplified
	position?: number
}

const AlbumCard = (props: Props): JSX.Element => {
	const { position, album } = props

	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const api = useSpotifyApi()
	const [data, setData] = useState<SpotifyApi.AlbumObjectFull>()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (!api) return
		if (!album) return

		api.getAlbum(album.id)
			.then(setData)
			.catch(err => {
				dispatch(set_error(err))
			})
	}, [dispatch, api, album])
	//#endregion

	//#region Functions
	const handleAlbumClick = () => {
		if (album) {
			history.push("/album/" + album.id)
		}
	}
	//#endregion

	return (
		<Card onClick={handleAlbumClick}>
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
								<Typography variant="subtitle1">
									Track #{position}
								</Typography>
							</>
						) : (
							<>
								<Skeleton height={40} variant="text" width={200} />
								<Skeleton height={30} variant="text" width={160} />
							</>
						)}
					</CardMedia>
				</Box>
			</CardActionArea>
		</Card>
	)
}

export default AlbumCard
