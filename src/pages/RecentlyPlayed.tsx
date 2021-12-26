import React, { useEffect, useState } from "react"
import RecentItem from "../components/Items/RecentItem"
import useAuthenticated from "../hooks/useAthenticated"
import useSpotifyApi from "../hooks/useSpotifyApi"
import {
	Card,
	CardContent,
	CircularProgress,
	Container,
	List,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const RecentlyPlayed: React.FC = () => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const recents = useSelector(state => state.statistics.recents)
	const api = useSpotifyApi()
	const [images, setImages] = useState<string[]>()
	const theme = useTheme()
	const smallScreen = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme
	//#endregion

	//#region Effects
	useAuthenticated()

	useEffect(() => {
		if (recents === null) {
			sessionStorage.setItem("redirect", history.location.pathname)
			history.push("/login")
		}
	}, [history, recents])

	useEffect(() => {
		if (!api) return
		if (!recents) return

		api.getTracks(recents.map(r => r.track.id))
			.then(res => setImages(res.tracks.map(t => t.album.images.at(0)?.url || "")))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, recents])
	//#endregion

	return (
		<Container>
			<Card sx={{ my: 3 }}>
				<CardContent>
					<Typography variant="h4" gutterBottom>
						Recently Played Tracks
					</Typography>
					<Typography variant="body1">
						These are the tracks you listened to most recently
					</Typography>
				</CardContent>
			</Card>
			{recents ? (
				<Card sx={{ my: 3 }}>
					{smallScreen ? (
						<List>
							{recents!.map((recent, i) => (
								<RecentItem
									key={i}
									smallScreen={smallScreen}
									images={images}
									recent={recent}
									i={i}
								/>
							))}
						</List>
					) : (
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Cover</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Artist</TableCell>
										<TableCell align="center">Time Since Last Played</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{recents!.map((recent, i) => (
										<RecentItem
											key={i}
											smallScreen={smallScreen}
											images={images}
											recent={recent}
											i={i}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Card>
			) : (
				<CircularProgress sx={{ my: 5, mx: "auto", display: "block" }} />
			)}
		</Container>
	)
}

export default RecentlyPlayed
