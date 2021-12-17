import axios from "axios"
import React, { useEffect } from "react"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { LinearProgress } from "@mui/material"
import { set_access_token } from "../actions/AccessTokenActions"
import { set_error } from "../actions/ErrorActions"
import { set_statistics } from "../actions/StatisticsActions"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const config = require("../config.json")

const Login: React.FC = () => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)
	const api = useSpotifyApi()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (access_token) return

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
				.then(res => dispatch(set_access_token((res.data as any).access_token)))
				.catch(err => dispatch(set_error(err.response?.data?.message || err.message)))
		} else {
			const query = new URLSearchParams({
				response_type: "code",
				client_id: config.spotify.client_id,
				redirect_uri: config.spotify.redirect_uri,
				scope: config.spotify.scope
			})

			window.location.href = "https://accounts.spotify.com/authorize?" + query.toString()
		}
	}, [dispatch, history, access_token])

	useEffect(() => {
		if (!api) return
		if (!access_token) return

		const promises = [
			Promise.all([
				api.getMyTopTracks({ limit: 50, time_range: "short_term" }),
				api.getMyTopTracks({ limit: 50, time_range: "short_term", offset: 49 }),
				api.getMyTopTracks({ limit: 50, time_range: "medium_term" }),
				api.getMyTopTracks({ limit: 50, time_range: "medium_term", offset: 49 }),
				api.getMyTopTracks({ limit: 50, time_range: "long_term" }),
				api.getMyTopTracks({ limit: 50, time_range: "long_term", offset: 49 })
			]),
			Promise.all([
				api.getMyTopArtists({ limit: 50, time_range: "short_term" }),
				api.getMyTopArtists({ limit: 50, time_range: "short_term", offset: 49 }),
				api.getMyTopArtists({ limit: 50, time_range: "medium_term" }),
				api.getMyTopArtists({ limit: 50, time_range: "medium_term", offset: 49 }),
				api.getMyTopArtists({ limit: 50, time_range: "long_term" }),
				api.getMyTopArtists({ limit: 50, time_range: "long_term", offset: 49 })
			]),
			api.getMyRecentlyPlayedTracks({ limit: 50 })
		] as const

		Promise.all(promises)
			.then(res => {
				const tracksShortTerm = [...res[0][0].items, ...res[0][1].items]
				const tracksMediumTerm = [...res[0][2].items, ...res[0][3].items]
				const tracksLongTerm = [...res[0][4].items, ...res[0][5].items]
				const artistsShortTerm = [...res[1][0].items, ...res[1][1].items]
				const artistsMediumTerm = [...res[1][2].items, ...res[1][3].items]
				const artistsLongTerm = [...res[1][4].items, ...res[1][5].items]
				const recents = res[2].items

				dispatch(
					set_statistics(
						tracksShortTerm,
						tracksMediumTerm,
						tracksLongTerm,
						artistsShortTerm,
						artistsMediumTerm,
						artistsLongTerm,
						recents
					)
				)

				history.push(sessionStorage.getItem("redirect") || "/")
				sessionStorage.removeItem("redirect")
			})
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, history, api, access_token])
	//#endregion

	return <LinearProgress />
}

export default Login
