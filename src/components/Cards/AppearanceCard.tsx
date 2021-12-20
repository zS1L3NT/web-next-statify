import React from "react"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import { useHistory } from "react-router-dom"

interface Props {
	appearance: iAppearanceCard
}

const AppearanceCard: React.FC<Props> = (props: Props) => {
	const { appearance } = props

	//#region Hooks
	const history = useHistory()
	//#endregion

	return appearance.condition() ? (
		<Card sx={{ width: 250, mb: 3 }} onClick={() => history.push(appearance.link)}>
			<CardActionArea sx={{ height: "100%" }}>
				<CardContent>
					<Typography color="primary.main" variant="h3">
						{appearance.hash ? "#" : ""}
						{appearance.condition()}
					</Typography>
					<Typography variant="h6">{appearance.text}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	) : (
		<></>
	)
}

export default AppearanceCard