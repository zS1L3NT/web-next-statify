import axios from "axios"
import Spotify from "spotify-web-api-js"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setAccessToken } from "../actions/AccessTokenActions"
import { setSpotifyApi } from "../actions/SpotifyApiActions"

const config = require("../config.json")

const Login = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)

	useEffect(() => {
		if (access_token) {
			return history.push("/top-tracks")
		}

		const search = new URLSearchParams(history.location.search)
		if (search.has("code")) {
			const data = new URLSearchParams()
			data.append("grant_type", "authorization_code")
			data.append("code", search.get("code")!)
			data.append("redirect_uri", config.spotify.redirect_uri)
			data.append("client_id", config.spotify.client_id)
			data.append("client_secret", config.spotify.client_secret)

			axios
				.post("https://accounts.spotify.com/api/token", data, {
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				})
				.then(res => {
					const { access_token } = res.data as any
					dispatch(setAccessToken(access_token))

					const spotify_api = new Spotify()
					spotify_api.setAccessToken(access_token)
					dispatch(setSpotifyApi(spotify_api))

					history.push("/top-tracks")
				})
				.catch(err => {
					console.error(err.response.data.error)
				})
		} else {
			const query = new URLSearchParams({
				response_type: "code",
				client_id: config.spotify.client_id,
				redirect_uri: config.spotify.redirect_uri,
				scope: config.spotify.scope
			})

			window.location.href = "https://accounts.spotify.com/authorize?" + query.toString()
		}
	}, [dispatch, history, access_token, history.location.search])

	return <></>
}

export default Login