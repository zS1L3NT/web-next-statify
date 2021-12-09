import Spotify from "spotify-web-api-js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useSpotifyApi = (): Spotify.SpotifyWebApiJs | null => {
	//#region Hooks
	const access_token = useSelector(state => state.access_token)
	const [api, setApi] = useState<Spotify.SpotifyWebApiJs | null>(null)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (access_token) {
			const spotifyApi = new Spotify()
			spotifyApi.setAccessToken(access_token)
			setApi(spotifyApi)
		} else {
			setApi(null)
		}
	}, [access_token])
	//#endregion

	return api
}

export default useSpotifyApi
