import React from "react"
import useAppSelector from "../../hooks/useAppSelector"
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface Props {
	card: iHomeCard
}

const HomeCard: React.FC<Props> = (props: Props) => {
	const { card } = props

	//#region Hooks
	const access_token = useAppSelector(state => state.access_token)
	const navigate = useNavigate()
	//#endregion

	return (
		<Grid key={card.id} item>
			<Card key={card.id} sx={{ maxWidth: 400, p: 1, mx: 3 }}>
				<CardContent>
					<Typography variant="h4" gutterBottom>
						{card.header}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{card.body}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						sx={{ ml: 1 }}
						size="medium"
						disabled={!access_token}
						onClick={() => navigate(card.url)}>
						{access_token ? "Bring me there!" : "Sign in first!"}
					</Button>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default HomeCard
