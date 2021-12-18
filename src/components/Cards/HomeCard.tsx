import React from "react"
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface Props {
	card: iHomeCard
}

const HomeCard: React.FC<Props> = (props: Props) => {
	const { card } = props

	//#region Hooks
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)
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
						onClick={() => history.push(card.url)}>
						{access_token ? "Bring me there!" : "Sign in first!"}
					</Button>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default HomeCard
