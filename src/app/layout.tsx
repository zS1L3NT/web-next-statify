import { PropsWithChildren } from "react"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

import Navbar from "@/components/Navbar/Navbar"
import { dark } from "@/theme"

import "../global.css"

export const revalidate = 15 * 60

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={dark}>
						<CssBaseline />
						<Navbar />
						{children}
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
