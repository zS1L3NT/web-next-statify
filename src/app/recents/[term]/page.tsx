import { DateTime } from "luxon"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import AsyncImage from "@/components/AsyncImage"
import { options } from "@/next-auth"
import { getRecents } from "@/queries"
import { getTimeSincePlayed, TERMS } from "@/utils"

export default async function Page({ params: { term } }: { params: { term: string } }) {
	const session = await getServerSession(options)
	if (!session?.token) {
		return <></>
	}

	if (!(term in TERMS)) {
		return redirect("/top-tracks/month")
	}

	const recents = await getRecents(session.token)

	const smallScreen = false // useMediaQuery(theme.breakpoints.down("lg")) // in wrong order but needs theme

	return (
		<Container>
			<Card sx={{ my: 3 }}>
				<CardContent>
					<Typography
						variant="h4"
						gutterBottom>
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
							{recents.map(recent => (
								// <LazyLoad
								// 	key={recent.id}
								// 	height={72}>
								<ListItem
									key={recent.played_at}
									disablePadding>
									<ListItemButton>
										<ListItemAvatar>
											<AsyncImage
												// @ts-ignore
												src={recent.track.album.images[0].url}
												skeleton={
													<Skeleton
														variant="circular"
														width={45}
														height={45}
													/>
												}>
												<Avatar
													sx={{ width: 45, height: 45 }}
													// @ts-ignore
													src={recent.track.album.images[0].url}
												/>
											</AsyncImage>
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
													DateTime.fromISO(recent.played_at).toFormat(
														"d LLLL yyyy",
													)
												}
											/>
										) : (
											<Stack my="6px">
												<Skeleton
													variant="text"
													width={200}
													height={24}
												/>
												<Skeleton
													variant="text"
													width={160}
													height={20}
												/>
											</Stack>
										)}
									</ListItemButton>
								</ListItem>
								// </LazyLoad>
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
									{recents!.map(recent => (
										<TableRow
											key={recent.played_at}
											hover>
											<TableCell>
												<AsyncImage
													// @ts-ignore
													src={recent.track.album.images[0].url}
													skeleton={
														<Skeleton
															variant="circular"
															width={45}
															height={45}
														/>
													}>
													<Avatar
														sx={{ width: 45, height: 45 }}
														// @ts-ignore
														src={recent.track.album.images[0].url}
													/>
												</AsyncImage>
											</TableCell>
											<TableCell>
												{recent ? (
													<Typography variant="body1">
														<MaterialLink
															component={Link}
															href={`/track/${recent.track.id}`}
															sx={{ cursor: "pointer" }}
															color="inherit"
															underline="hover">
															{recent.track.name}
														</MaterialLink>
													</Typography>
												) : (
													<Skeleton
														variant="text"
														width={160}
														height={20}
													/>
												)}
											</TableCell>
											<TableCell>
												{recent ? (
													<Typography variant="body1">
														{recent.track.artists
															.map(artist => (
																<MaterialLink
																	component={Link}
																	href={`/artist/${artist.id}`}
																	sx={{ cursor: "pointer" }}
																	key={artist.id}
																	color="inherit"
																	underline="hover">
																	{artist.name}
																</MaterialLink>
															))
															.reduce<(JSX.Element | string)[]>(
																(r, a) => r.concat(a, ", "),
																[],
															)
															.slice(0, -1)}
													</Typography>
												) : (
													<Skeleton
														variant="text"
														width={120}
														height={20}
													/>
												)}
											</TableCell>
											<TableCell align="center">
												{recent ? (
													<Typography variant="body1">
														{getTimeSincePlayed(recent) +
															" ago, " +
															DateTime.fromISO(
																recent.played_at,
															).toFormat("d LLLL yyyy")}
													</Typography>
												) : (
													<Skeleton
														variant="text"
														width={160}
														height={20}
													/>
												)}
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
