import getDuration from "../../utils/getDuration"
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
	Typography
} from "@mui/material"
import { useHistory } from "react-router-dom"

interface Props {
	smallScreen: boolean
	track?: SpotifyApi.TrackObjectFull
	i?: number
}

const TopTrackItem: React.FC<Props> = (props: Props) => {
	const { smallScreen, track, i } = props

	//#region Hooks
	const history = useHistory()
	//#endregion

	//#region Functions
	const handleTrackClick = (track?: SpotifyApi.TrackObjectFull) => {
		if (track) {
			history.push("/track/" + track.id)
		}
	}

	const handleArtistClick = (artist?: SpotifyApi.ArtistObjectSimplified) => {
		if (artist) {
			history.push("/artist/" + artist.id)
		}
	}
	//#endregion

	return smallScreen ? (
		<ListItem onClick={() => handleTrackClick(track)} disablePadding>
			<ListItemButton>
				<ListItemAvatar>
					{track ? (
						<Avatar
							sx={{ width: 45, height: 45 }}
							src={track.album.images.at(0)?.url || ""}
						/>
					) : (
						<Skeleton variant="circular" width={45} height={45} />
					)}
				</ListItemAvatar>
				{track ? (
					<ListItemText
						primary={(i !== undefined ? i + 1 + ". " : "") + track.name}
						secondary={track.artists.map(a => a.name).join(", ")}
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
			<TableCell align="center">{i! + 1}</TableCell>
			<TableCell>
				{track ? (
					<Avatar
						sx={{ width: 45, height: 45 }}
						src={track.album.images.at(0)?.url || ""}
					/>
				) : (
					<Skeleton variant="circular" width={45} height={45} />
				)}
			</TableCell>
			<TableCell>
				{track ? (
					<Typography variant="body1">
						<Link
							sx={{ cursor: "pointer" }}
							color="inherit"
							onClick={() => handleTrackClick(track)}
							underline="hover">
							{track.name}
						</Link>
					</Typography>
				) : (
					<Skeleton variant="text" width={160} height={20} />
				)}
			</TableCell>
			<TableCell>
				{track ? (
					<Typography variant="body1">
						{track.artists
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
				{track ? (
					<Typography variant="body1">{getDuration(track.duration_ms)}</Typography>
				) : (
					<Skeleton variant="text" width={160} height={20} />
				)}
			</TableCell>
		</TableRow>
	)
}

export default TopTrackItem
