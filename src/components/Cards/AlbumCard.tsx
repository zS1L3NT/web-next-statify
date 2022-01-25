import React, { useEffect, useState } from "react"
import useAppDispatch from "../../hooks/useAppDispatch"
import useSpotifyApi from "../../hooks/useSpotifyApi"
import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from "@mui/material"
import { set_error } from "../../slices/ErrorSlice"
import { useNavigate } from "react-router-dom"

interface Props {
	album?: SpotifyApi.AlbumObjectSimplified
	position?: number
}

const AlbumCard: React.FC<Props> = (props: Props) => {
	const { position, album } = props

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const api = useSpotifyApi()
	const [data, setData] = useState<SpotifyApi.AlbumObjectFull>()

	useEffect(() => {
		if (!api) return
		if (!album) return

		api.getAlbum(album.id)
			.then(setData)
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, album])

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
								<Typography variant="subtitle1">Track #{position}</Typography>
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

export default AlbumCard
