import { useEffect, useState } from "react"
import Spotify from "spotify-web-api-js"

import useAppSelector from "./useAppSelector"

const useSpotifyApi = (): Spotify.SpotifyWebApiJs | null => {
	const access_token = useAppSelector(state => state.access_token)
	const [api, setApi] = useState<Spotify.SpotifyWebApiJs | null>(null)

	useEffect(() => {
		if (access_token) {
			const spotifyApi = new Spotify()
			spotifyApi.setAccessToken(access_token)
			setApi(spotifyApi)
		} else {
			setApi(null)
		}
	}, [access_token])

	return api
}

export default useSpotifyApi
