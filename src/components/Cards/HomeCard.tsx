import { useNavigate } from "react-router-dom"

import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"

import useAppSelector from "../../hooks/useAppSelector"

const HomeCard = ({ card }: { card: iHomeCard }) => {
	const navigate = useNavigate()

	const token = useAppSelector(state => state.token)

	return (
		<Grid
			key={card.id}
			item>
			<Card
				key={card.id}
				sx={{ maxWidth: 400, p: 1, mx: 3 }}>
				<CardContent>
					<Typography
						variant="h4"
						gutterBottom>
						{card.header}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary">
						{card.body}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						sx={{ ml: 1 }}
						size="medium"
						disabled={!token}
						onClick={() => navigate(card.url)}>
						{token ? "Bring me there!" : "Sign in first!"}
					</Button>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default HomeCard
