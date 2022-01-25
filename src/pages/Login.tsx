import axios from "axios"
import config from "../config.json"
import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { LinearProgress } from "@mui/material"
import { set_access_token } from "../slices/AccessTokenSlice"
import { set_error } from "../slices/ErrorSlice"
import { set_statistics } from "../slices/StatisticsSlice"
import { useLocation, useNavigate } from "react-router-dom"

const Login: React.FC = () => {
	const dispatch = useAppDispatch()
	const access_token = useAppSelector(state => state.access_token)
	const location = useLocation()
	const navigate = useNavigate()
	const api = useSpotifyApi()

	useEffect(() => {
		if (access_token) return

		const search = new URLSearchParams(location.search)
		if (search.has("code")) {
			const data = new URLSearchParams()
			data.append("grant_type", "authorization_code")
			data.append("code", search.get("code")!)
			data.append(
				"redirect_uri",
				window.location.hostname === "statify.zectan.com"
					? config.spotify.redirect_uri.production
					: config.spotify.redirect_uri.development
			)
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
				redirect_uri:
					window.location.hostname === "statify.zectan.com"
						? config.spotify.redirect_uri.production
						: config.spotify.redirect_uri.development,
				scope: config.spotify.scope
			})

			window.location.href = "https://accounts.spotify.com/authorize?" + query.toString()
		}
	}, [dispatch, location.search, access_token])

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
				dispatch(
					set_statistics({
						tracks: {
							short_term: [...res[0][0].items, ...res[0][1].items.slice(1)],
							medium_term: [...res[0][2].items, ...res[0][3].items.slice(1)],
							long_term: [...res[0][4].items, ...res[0][5].items.slice(1)]
						},
						artists: {
							short_term: [...res[1][0].items, ...res[1][1].items.slice(1)],
							medium_term: [...res[1][2].items, ...res[1][3].items.slice(1)],
							long_term: [...res[1][4].items, ...res[1][5].items.slice(1)]
						},
						recents: res[2].items
					})
				)

				navigate(sessionStorage.getItem("redirect") || "/")
				sessionStorage.removeItem("redirect")
			})
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, navigate, api, access_token])

	return <LinearProgress />
}

export default Login
