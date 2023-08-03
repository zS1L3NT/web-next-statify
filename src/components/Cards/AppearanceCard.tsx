import { useNavigate } from "react-router-dom"

import { Card, CardActionArea, CardContent, Typography } from "@mui/material"

const AppearanceCard = ({ appearance }: { appearance: iAppearanceCard }) => {
	const navigate = useNavigate()

	return appearance.condition() ? (
		<Card
			sx={{ width: 250, mb: 3 }}
			onClick={() => navigate(appearance.link)}>
			<CardActionArea sx={{ height: "100%" }}>
				<CardContent>
					<Typography
						color="primary.main"
						variant="h3"
						sx={{
							width: "fit-content",
							marginRight: "0.8rem",
							float: "left",
						}}>
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
