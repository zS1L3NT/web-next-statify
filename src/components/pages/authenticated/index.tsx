import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setAccessToken } from "../../../actions/AccessTokenActions"
import AuthenticatedFocus from "../../molecules/authenticated-focus"
import Center from "../../particles/center"

const config = require("../../../config.json")

const Authenticated = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		const code = new URLSearchParams(window.location.search).get("code")

		if (code) {
			setTimeout(() => {
				const data = new URLSearchParams()
				data.append("grant_type", "authorization_code")
				data.append("code", code)
				data.append("redirect_uri", config.spotify.redirectUri)
				data.append("client_id", config.spotify.clientId)
				data.append("client_secret", config.spotify.clientSecret)

				axios
					.post("https://accounts.spotify.com/api/token", data, {
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						}
					})
					.then(res => {
						const { access_token } = res.data as any
						dispatch(setAccessToken(access_token))
						history.push("/top-tracks")
					})
					.catch(err => {
						console.error(err.response.data.error)
					})
			}, 3000)
		}
	}, [dispatch, history])

	return (
		<Center max>
			<AuthenticatedFocus />
		</Center>
	)
}

export default Authenticated