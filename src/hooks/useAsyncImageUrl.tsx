import { useEffect, useState } from "react"

export default (): [string | null, React.Dispatch<React.SetStateAction<string | undefined>>] => {
	const [url, setUrl] = useState<string>()
	const [data, setData] = useState<string | null>(null)

	useEffect(() => {
		if (!url) return

		setData(null)
		const image = new Image()
		image.src = url
		image.onload = () => {
			setData(url)
		}
	}, [url])

	return [data, setUrl]
}
