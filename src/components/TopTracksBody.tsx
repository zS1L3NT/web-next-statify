import getDuration from "../utils/getDuration"
import React, { useEffect } from "react"
import {
	Avatar,
	Card,
	CardContent,
	CircularProgress,
	Container,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
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
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface Props {
	term: "short_term" | "medium_term" | "long_term"
	description: string
}

const TopTracksLongTerm = (props: Props): JSX.Element => {
	const { term, description } = props

	//#region Hooks
	const history = useHistory()
	const tracks = useSelector(state => state.statistics.tracks)
	const theme = useTheme()
	const showList = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme
	//#endregion

	//#region Effects
	useEffect(() => {
		if (tracks[term]) return
		history.push("/login")
	}, [history, tracks, term])
	//#endregion

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography variant="h4">Top Tracks</Typography>
					<Typography variant="h6" gutterBottom>
						{description}
					</Typography>
					<Typography variant="body1">
						These are the tracks you listen to the most
					</Typography>
				</CardContent>
			</Card>
			{tracks[term] ? (
				<Card sx={{ my: 3 }}>
					{showList ? (
						<List>
							{tracks[term]!.map((track, i) => (
								<ListItem key={track.id}>
									<ListItemAvatar>
										<Avatar
											sx={{ width: 45, height: 45 }}
											src={track.album.images.at(-1)?.url || ""}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={i + 1 + ". " + track.name}
										secondary={track.artists.map(a => a.name).join(", ")}
									/>
								</ListItem>
							))}
						</List>
					) : (
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Position</TableCell>
										<TableCell>Cover</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Artist</TableCell>
										<TableCell>Duration</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{tracks[term]!.map((track, i) => (
										<TableRow key={track.id}>
											<TableCell align="center">{i + 1}</TableCell>
											<TableCell>
												<Avatar
													sx={{ width: 45, height: 45 }}
													src={track.album.images.at(-1)?.url || ""}
												/>
											</TableCell>
											<TableCell>{track.name}</TableCell>
											<TableCell>
												{track.artists.map(a => a.name).join(", ")}
											</TableCell>
											<TableCell align="center">
												{getDuration(track)}
											</TableCell>
										</TableRow>
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

export default TopTracksLongTerm
