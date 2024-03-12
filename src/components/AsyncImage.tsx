"use client"

import { PropsWithChildren, useEffect, useState } from "react"

const AsyncImage = ({
	src,
	skeleton,
	children,
}: PropsWithChildren<{
	src: string | undefined
	skeleton: JSX.Element
}>) => {
	const [fade, setFade] = useState(false)
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

	useEffect(() => {
		setFade(false)

		if (src) {
			setThumbnailUrl(null)

			const image = new Image()
			image.src = src
			image.onload = () => {
				setThumbnailUrl(src)
				setFade(true)
			}
		}
	}, [src])

	return (
		<div style={{ display: "grid" }}>
			<div
				style={{ gridArea: "1 / 1 / 2 / 2" }}
				className={fade ? "fade-out" : ""}>
				{skeleton}
			</div>
			{thumbnailUrl && (
				<div
					style={{ gridArea: "1 / 1 / 2 / 2" }}
					className="fade-in">
					{children}
				</div>
			)}
		</div>
	)
}

export default AsyncImage
