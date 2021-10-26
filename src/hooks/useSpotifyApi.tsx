import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Spotify from "spotify-web-api-js"

const useSpotifyApi = (): Spotify.SpotifyWebApiJs | null => {
	const [api, setApi] = useState<Spotify.SpotifyWebApiJs | null>(null)

	const access_token = useSelector(state => state.access_token)

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
