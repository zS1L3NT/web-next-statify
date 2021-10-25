import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Spotify from "spotify-web-api-js"

const useSpotifyApi = (): Spotify.SpotifyWebApiJs | undefined => {
	const [api, setApi] = useState<Spotify.SpotifyWebApiJs>()

	const history = useHistory()
	const spotify_api = useSelector(state => state.spotify_api)

	useEffect(() => {
		if (!spotify_api) {
			return history.push("/logout")
		}

		setApi(Object.assign(new Spotify(), spotify_api))
	}, [history, spotify_api])

	return api
}

export default useSpotifyApi
