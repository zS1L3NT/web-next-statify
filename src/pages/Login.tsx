import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useIsOnline } from "react-use-is-online"

import CloudOffIcon from "@mui/icons-material/CloudOff"
import { Box, LinearProgress, Typography } from "@mui/material"

import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { setToken } from "../slices/TokenSlice"

const Login = ({}: {}) => {
	const navigate = useNavigate()
	const location = useLocation()

	const token = useAppSelector(state => state.token)
	const dispatch = useAppDispatch()

	const { isOnline, isOffline } = useIsOnline()

	useEffect(() => {
		if (isOffline) return
		if (token) return

		if (location.hash) {
			const matches = location.hash.match(/access_token=([^&]*)/)
			if (matches) {
				dispatch(setToken(matches[1] as string))
			}

			navigate(sessionStorage.getItem("redirect") || "/")
			sessionStorage.removeItem("redirect")
		} else {
			const query = new URLSearchParams({
				response_type: "token",
				client_id: "042bace248d040d79bffb1e86f0c29c1",
				// @ts-ignore
				redirect_uri: import.meta.env.PROD
					? "https://statify.zectan.com/login"
					: "http://localhost:5173/login",
				scope: "user-top-read user-read-recently-played user-follow-read user-follow-modify user-library-read user-library-modify"
			})

			window.location.href = "https://accounts.spotify.com/authorize?" + query.toString()
		}
	}, [dispatch, location.hash, token, isOffline])

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
