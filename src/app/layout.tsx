import { PropsWithChildren } from "react"

import Navbar from "@/components/Navbar/Navbar"
import theme from "@/theme"

import "../global.css"

export const revalidate = 15 * 60

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Navbar />
						{children}
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
