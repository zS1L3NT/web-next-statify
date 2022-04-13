import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Card, CardActionArea, CardMedia, Skeleton, Typography } from "@mui/material"

import useAppDispatch from "../../hooks/useAppDispatch"
import useSpotifyApi from "../../hooks/useSpotifyApi"
import { set_error } from "../../slices/ErrorSlice"
import getFollowers from "../../utils/getFollowers"
import AsyncImage from "../AsyncImage"

interface Props {
	artist?: SpotifyApi.ArtistObjectSimplified
}

const ArtistCard: React.FC<Props> = (props: Props) => {
	const { artist } = props

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const api = useSpotifyApi()
	const [data, setData] = useState<SpotifyApi.ArtistObjectFull>()

	useEffect(() => {
		if (!api) return
		if (!artist) return

		api.getArtist(artist.id)
			.then(setData)
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, artist])

	const handleArtistClick = () => {
		if (artist) {
			navigate("/artist/" + artist.id)
		}
	}

	return (
		<Card sx={{ mb: 2 }} onClick={handleArtistClick}>
			<CardActionArea>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row"
					}}>
					<AsyncImage
						src={data?.images[0]?.url}
						skeleton={<Skeleton variant="rectangular" width={120} height={120} />}
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
