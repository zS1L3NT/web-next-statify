import React, { useEffect, useState } from "react"
import RecentItem from "../components/Items/RecentItem"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
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
import { set_error } from "../slices/ErrorSlice"
import { useLocation, useNavigate } from "react-router-dom"

const RecentlyPlayed: React.FC = () => {
	const dispatch = useAppDispatch()
	const recents = useAppSelector(state => state.statistics.recents)
	const location = useLocation()
	const navigate = useNavigate()
	const api = useSpotifyApi()
	const [images, setImages] = useState<string[]>()
	const theme = useTheme()
	const smallScreen = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme

	useAuthenticated()

	useEffect(() => {
		if (recents === null) {
			sessionStorage.setItem("redirect", location.pathname)
			navigate("/login")
		}
	}, [navigate, location.pathname, recents])

	useEffect(() => {
		if (!api) return
		if (!recents) return

		api.getTracks(recents.map(r => r.track.id))
			.then(res => setImages(res.tracks.map(t => t.album.images[0]?.url || "")))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, recents])

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
