import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import {
	Avatar,
	Box,
	Card,
	CardContent,
	Container,
	LinearProgress,
	Link as MaterialLink,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Paper,
	Skeleton,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography,
} from "@mui/material"

import AsyncImage from "@/components/AsyncImage"
import { TERMS } from "@/constants"
import { options } from "@/next-auth"
import { getTopTracks } from "@/queries"
import getDuration from "@/utils/getDuration"

export default async function Page({ params: { term } }: { params: { term: string } }) {
	const session = await getServerSession(options)
	if (!session?.token) {
		console.log(session)
		return <></>
	}

	if (!(term in TERMS)) {
		return redirect("/top-tracks/month")
	}

	const tracks = await getTopTracks(session.token, term as keyof typeof TERMS)

	const smallScreen = false //useMediaQuery(theme.breakpoints.down("lg"))

	return term ? (
		<Box sx={{ my: 2 }}>
			<Tabs
				value={term}
				centered>
				{Object.entries(TERMS).map(([key, { term, description }]) => (
					<Tab
						key={key}
						LinkComponent={Link}
						href={`/top-tracks/${key}`}
						label={description}
						value={term}
					/>
				))}
			</Tabs>
			<Container sx={{ mt: 3 }}>
				<Card>
					<CardContent>
						<Typography variant="h4">Top Tracks</Typography>
						<Typography
							variant="h6"
							gutterBottom>
							{TERMS[term as keyof typeof TERMS].description}
						</Typography>
						<Typography variant="body1">
							These are the tracks you listen to the most
						</Typography>
					</CardContent>
				</Card>
				<Card sx={{ my: 3 }}>
					{smallScreen ? (
						<List>
							{(tracks ?? Array(5).fill(undefined)).map((t, i) => (
								// <LazyLoad
								// 	key={t.id}
								// 	height={72}>
								<ListItem
									key={t.id}
									// onClick={() => handleTrackClick(track)}
									disablePadding>
									<ListItemButton>
										<ListItemAvatar>
											<AsyncImage
												src={t?.album.images[0]?.url}
												skeleton={
													<Skeleton
														variant="circular"
														width={45}
														height={45}
													/>
												}>
												<Avatar
													sx={{ width: 45, height: 45 }}
													src={t?.album.images[0]?.url}
												/>
											</AsyncImage>
										</ListItemAvatar>
										{t ? (
											<ListItemText
												primary={
													(i !== undefined ? i + 1 + ". " : "") + t.name
												}
												secondary={t.artists.map(a => a.name).join(", ")}
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
							<Table>
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
									{(tracks ?? Array(5).fill(undefined)).map((t, i) => (
										<TableRow
											key={t.id}
											hover>
											<TableCell align="center">{i! + 1}</TableCell>
											<TableCell>
												<AsyncImage
													src={t?.album.images[0]?.url}
													skeleton={
														<Skeleton
															variant="circular"
															width={45}
															height={45}
														/>
													}>
													<Avatar
														sx={{ width: 45, height: 45 }}
														src={t?.album.images[0]?.url}
													/>
												</AsyncImage>
											</TableCell>
											<TableCell>
												{t ? (
													<Typography variant="body1">
														<MaterialLink
															component={Link}
															href={`/track/${t.id}`}
															sx={{ cursor: "pointer" }}
															color="inherit"
															underline="hover">
															{t.name}
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
												{t ? (
													<Typography variant="body1">
														{t.artists
															.map(artist => (
																<MaterialLink
																	component={Link}
																	href={`/artist/${t.id}`}
																	sx={{
																		cursor: "pointer",
																	}}
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
												{t ? (
													<Typography variant="body1">
														{getDuration(t.duration_ms)}
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
			</Container>
		</Box>
	) : (
		<LinearProgress />
	)
}
