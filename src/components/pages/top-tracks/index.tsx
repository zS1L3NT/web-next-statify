import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Spotify from "spotify-web-api-js"

const TopTracks = (): JSX.Element => {
	const [api, setApi] = useState<Spotify.SpotifyWebApiJs>()
	const spotify_api = useSelector(state => state.spotify_api)

	useEffect(() => {
		if (!spotify_api) {
			return console.log("No spotify API created")
		}

		setApi(Object.assign(new Spotify(), spotify_api))
	}, [spotify_api])

	return <></>
}

export default TopTracks
