import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useIsOnline } from "react-use-is-online"

import CloudOffIcon from "@mui/icons-material/CloudOff"
import { Box, LinearProgress, Typography } from "@mui/material"

import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { set_access_token } from "../slices/AccessTokenSlice"
import { set_error } from "../slices/ErrorSlice"
import { set_statistics } from "../slices/StatisticsSlice"

const Login: React.FC = () => {
	const dispatch = useAppDispatch()
	const access_token = useAppSelector(state => state.access_token)
	const { isOnline, isOffline } = useIsOnline()
	const location = useLocation()
	const navigate = useNavigate()
	const api = useSpotifyApi()

	useEffect(() => {
		if (isOffline) return
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
				client_id: "042bace248d040d79bffb1e86f0c29c1",
				// @ts-ignore
				redirect_uri: import.meta.env.PROD
					? "https://statify.zectan.com/login"
					: "http://localhost:3000/login",
				scope: "user-top-read user-read-recently-played user-follow-read user-follow-modify user-library-read user-library-modify"
			})

			window.location.href = "https://accounts.spotify.com/authorize?" + query.toString()
		}
	}, [dispatch, location.hash, access_token, isOffline])

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
			.catch(err => {
				dispatch(set_error(err))
				dispatch(set_access_token(null))
			})
	}, [dispatch, navigate, api, access_token])

	return isOnline ? (
		<LinearProgress />
	) : (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}>
			<CloudOffIcon sx={{ mt: 16, height: 96, width: 96 }} />
			<Typography sx={{ mt: 4 }} variant="h5">
				You're Offline!
			</Typography>
			<Typography sx={{ mt: 1, textAlign: "center" }}>
				Waiting for Internet Connection
				<br />
				before proceeding...
			</Typography>
		</Box>
	)
}

export default Login
