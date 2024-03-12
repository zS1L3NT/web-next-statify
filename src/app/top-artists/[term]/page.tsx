import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Grid,
	LinearProgress,
	Link,
	Skeleton,
	Tab,
	Tabs,
	Typography,
} from "@mui/material"

import AsyncImage from "@/components/AsyncImage"
import { TERMS } from "@/constants"
import { options } from "@/next-auth"
import { getTopArtists } from "@/queries"
import getFollowers from "@/utils/getFollowers"

export default async function Page({ params: { term } }: { params: { term: string } }) {
	const session = await getServerSession(options)
	if (!session?.token) {
		return <></>
	}

	if (!(term in TERMS)) {
		return redirect("/top-tracks/month")
	}

	const artists = await getTopArtists(session.token, term as keyof typeof TERMS)

	return term ? (
		<Box sx={{ my: 2 }}>
			<Tabs
				value={term}
				centered>
				{Object.entries(TERMS).map(([key, { description }]) => (
					<Tab
						key={key}
						LinkComponent={Link}
						href={`/top-artists/${key}`}
						label={description}
						value={key}
					/>
				))}
			</Tabs>
			<Container sx={{ mt: 3 }}>
				<Card>
					<CardContent>
						<Typography variant="h4">Top Artists</Typography>
						<Typography
							variant="h6"
							gutterBottom>
							{TERMS[term as keyof typeof TERMS].description}
						</Typography>
						<Typography variant="body1">
							These are the artists you listen to the most
						</Typography>
					</CardContent>
				</Card>
				<Grid
					sx={{ my: 1 }}
					container
					spacing={5}
					justifyContent="space-evenly">
					{(artists ?? Array(5).fill(undefined)).map((a, i) => (
						<Grid
							key={a.id}
							item>
							<Card
								component={Link}
								sx={{ p: 0, minWidth: 250 }}
								href={`/artist/${a.id}`}>
								<CardActionArea>
									<AsyncImage
										src={a?.images[0]?.url}
										skeleton={
											<Skeleton
												variant="rectangular"
												width={250}
												height={250}
											/>
										}>
										<CardMedia
											component="img"
											alt="Picture"
											width={250}
											height={250}
											image={a?.images[0]?.url}
										/>
									</AsyncImage>
									<CardContent>
										{a ? (
											<>
												<Typography variant="h5">
													{(i !== undefined ? i + 1 + ". " : "") + a.name}
												</Typography>
												<Typography variant="body2">
													{getFollowers(a)}
												</Typography>
											</>
										) : (
											<>
												<Skeleton
													variant="text"
													width={100}
													height={40}
												/>
												<Skeleton
													variant="text"
													width={50}
													height={20}
												/>
											</>
										)}
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	) : (
		<LinearProgress />
	)
}
