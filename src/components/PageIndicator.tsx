import React from "react"
import { Typography } from "@mui/material"

const PageIndicator: React.FC = (props: { children?: React.ReactNode }) => (
	<Typography
		sx={{
			bgcolor: "primary.main",
			width: "fit-content",
			borderRadius: 1,
			lineHeight: 1,
			p: 0.5,
			mb: 0.5
		}}
		variant="body2">
		{props.children}
	</Typography>
)

export default PageIndicator
