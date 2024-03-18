import { PropsWithChildren } from "react"

import "./globals.scss"

export const revalidate = 15 * 60

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
