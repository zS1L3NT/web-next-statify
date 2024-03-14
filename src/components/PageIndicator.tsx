import React, { PropsWithChildren } from "react"

export default function PageIndicator({ children }: PropsWithChildren) {
	return (
		<Typography
			sx={{
				bgcolor: "primary.main",
				width: "fit-content",
				borderRadius: 1,
				lineHeight: 1,
				p: 0.5,
				mb: 0.5,
				mx: { xs: "auto", sm: 0 },
			}}
			variant="body2">
			{children}
		</Typography>
	)
}
