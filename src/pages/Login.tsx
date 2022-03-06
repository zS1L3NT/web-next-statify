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

		if (location.hash) {
			const matches = location.hash.match(/access_token=([^&]*)/)
			if (matches) {
				dispatch(set_access_token(matches[1] as string))
			} else {
				navigate("/")
			}
		} else {
			const query = new URLSearchParams({
				response_type: "token",
				client_id: import.meta.env.VITE__SPOTIFY__CLIENT_ID,
				redirect_uri: import.meta.env.VITE__SPOTIFY__REDIRECT_URI,
				scope: import.meta.env.VITE__SPOTIFY__SCOPE
			})

			window.location.href = "https://accounts.spotify.com/authorize?" + query.toString()
		}
	}, [dispatch, location.hash, access_token])

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
