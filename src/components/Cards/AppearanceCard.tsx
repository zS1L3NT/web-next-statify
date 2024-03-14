import Link from "next/link"

export type iAppearanceCard = {
	text: string
	hash: boolean
	link: string
	condition: () => any
}

export default function AppearanceCard({ appearance }: { appearance: iAppearanceCard }) {
	return appearance.condition() ? (
		<Card
			component={Link}
			href={appearance.link}
			sx={{ width: 250, mb: 3 }}>
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
