import { PropsWithChildren } from "react"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

import { dark } from "@/theme"

import "../global.css"

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={dark}>
						<CssBaseline />
						{/* <Navigator /> */}
						{children}
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
