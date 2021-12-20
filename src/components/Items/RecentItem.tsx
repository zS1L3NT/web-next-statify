import getTimeSincePlayed from "../../utils/getTimeSincePlayed"
import React from "react"
import {
	Avatar,
	Link,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
	Stack,
	TableCell,
	TableRow,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material"
import { DateTime } from "luxon"
import { useHistory } from "react-router-dom"

interface Props {
	images?: string[]
	recent?: SpotifyApi.PlayHistoryObject
	i?: number
}

const RecentItem: React.FC<Props> = (props: Props) => {
	const { images, recent, i } = props

	//#region Hooks
	const history = useHistory()
	const theme = useTheme()
	const showList = useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme
	//#endregion

	//#region Functions
	const handleTrackClick = (track?: SpotifyApi.TrackObjectSimplified) => {
		if (track) {
			history.push("/track/" + track.id)
		}
	}

	const handleArtistClick = (artist: SpotifyApi.ArtistObjectSimplified) => {
		history.push("/artist/" + artist.id)
	}
	//#endregion

	return showList ? (
		<ListItem onClick={() => handleTrackClick(recent?.track)} disablePadding>
			<ListItemButton>
				<ListItemAvatar>
					{images && i ? (
						<Avatar sx={{ width: 45, height: 45 }} src={images[i] || ""} />
					) : (
						<Skeleton variant="circular" width={45} height={45} />
					)}
				</ListItemAvatar>
				{recent ? (
					<ListItemText
						primary={
							recent.track.name +
							" - " +
							recent.track.artists.map(a => a.name).join(", ")
						}
						secondary={
							getTimeSincePlayed(recent) +
							" ago, " +
							DateTime.fromISO(recent.played_at).toFormat("d LLLL yyyy")
						}
					/>
				) : (
					<Stack my="6px">
						<Skeleton variant="text" width={200} height={24} />
						<Skeleton variant="text" width={160} height={20} />
					</Stack>
				)}
			</ListItemButton>
		</ListItem>
	) : (
		<TableRow hover>
			<TableCell>
				{images && i ? (
					<Avatar sx={{ width: 45, height: 45 }} src={images[i] || ""} />
				) : (
					<Skeleton variant="circular" width={45} height={45} />
				)}
			</TableCell>
			<TableCell>
				{recent ? (
					<Typography variant="body1">
						<Link
							sx={{ cursor: "pointer" }}
							color="inherit"
							onClick={() => handleTrackClick(recent.track)}
							underline="hover">
							{recent.track.name}
						</Link>
					</Typography>
				) : (
					<Skeleton variant="text" width={160} height={20} />
				)}
			</TableCell>
			<TableCell>
				{recent ? (
					<Typography variant="body1">
						{recent.track.artists
							.map(artist => (
								<Link
									sx={{
										cursor: "pointer"
									}}
									key={artist.id}
									color="inherit"
									onClick={() => handleArtistClick(artist)}
									underline="hover">
									{artist.name}
								</Link>
							))
							.reduce<(JSX.Element | string)[]>((r, a) => r.concat(a, ", "), [])
							.slice(0, -1)}
					</Typography>
				) : (
					<Skeleton variant="text" width={120} height={20} />
				)}
			</TableCell>
			<TableCell align="center">
				{recent ? (
					<Typography variant="body1">
						{getTimeSincePlayed(recent) +
							" ago, " +
							DateTime.fromISO(recent.played_at).toFormat("d LLLL yyyy")}
					</Typography>
				) : (
					<Skeleton variant="text" width={160} height={20} />
				)}
			</TableCell>
		</TableRow>
	)
}

export default RecentItem
