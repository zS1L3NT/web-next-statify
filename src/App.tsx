import Album from "./pages/Album"
import Artist from "./pages/Artist"
import Dark from "./pages/Dark"
import Home from "./pages/Home"
import Light from "./pages/Light"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Navigator from "./components/Navigation/Navigator"
import React, { useEffect, useState } from "react"
import RecentlyPlayed from "./pages/RecentlyPlayed"
import TopArtists from "./pages/TopArtists"
import TopTracks from "./pages/TopTracks"
import Track from "./pages/Track"
import useAppDispatch from "./hooks/useAppDispatch"
import useAppSelector from "./hooks/useAppSelector"
import useThemeValue from "./hooks/useThemeValue"
import {
	Alert,
	Backdrop,
	Button,
	CssBaseline,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fade,
	Snackbar,
	ThemeProvider
} from "@mui/material"
import { clear_snackbar } from "./slices/SnackbarSlice"
import { dark, light } from "./theme"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { set_access_token } from "./slices/AccessTokenSlice"
import { set_error } from "./slices/ErrorSlice"

const App = (): JSX.Element => {
	//#region Hooks
	const dispatch = useAppDispatch()
	const access_token = useAppSelector(state => state.access_token)
	const error = useAppSelector(state => state.error)
	const snackbar = useAppSelector(state => state.snackbar)
	const statistics = useAppSelector(state => state.statistics)
	const location = useLocation()
	const navigate = useNavigate()
	const [err, setErr] = useState<Error>()
	//#endregion

	//#region Effects
	useEffect(() => {
		setTimeout(() => {
			const preload = document.getElementsByClassName("preload").item(0)!
			preload.classList.add("preload-hide")
			setTimeout(() => preload.remove(), 1000)
		}, 1000)
	}, [])

	useEffect(() => {
		if (error) setErr(error)
	}, [error])

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [location])

	useEffect(() => {
		if (localStorage.getItem("access_token")) {
			dispatch(set_access_token(localStorage.getItem("access_token")))
			localStorage.removeItem("access_token")
		}

		if (
			access_token &&
			!statistics.tracks.short_term &&
			!statistics.tracks.medium_term &&
			!statistics.tracks.long_term &&
			!statistics.artists.short_term &&
			!statistics.artists.medium_term &&
			!statistics.artists.long_term &&
			!statistics.recents
		) {
			navigate("/login")
		}

		const beforeunload = () => {
			if (access_token) {
				localStorage.setItem("access_token", access_token)
			}
		}

		window.addEventListener("beforeunload", beforeunload)
		return () => {
			window.removeEventListener("beforeunload", beforeunload)
		}
	}, [navigate, access_token])
	//#endregion

	//#region Functions
	const handleDialogRetry = () => {
		dispatch(set_error(null))

		// If is a id not found error, don't set the redirect path and don't logout
		if (!err?.message.endsWith(" not found")) {
			sessionStorage.setItem("redirect", location.pathname)
			setTimeout(() => navigate("/logout"), 500)
		} else {
			setTimeout(() => navigate("/"), 500)
		}
	}

	const handleDialogHome = () => {
		dispatch(set_error(null))
		navigate("/")
	}

	const handleSnackbarClose = () => {
		dispatch(clear_snackbar())
	}
	//#endregion

	return (
		<ThemeProvider theme={useThemeValue(dark, light)}>
			<CssBaseline />
			<div className="w-100 h-100">
				<Navigator />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="logout" element={<Logout />} />
					<Route path="top-tracks">
						<Route path="" element={<Navigate to="short-term" replace />} />
						<Route path="short-term" element={<TopTracks />} />
						<Route path="medium-term" element={<TopTracks />} />
						<Route path="long-term" element={<TopTracks />} />
						<Route path="*" element={<Navigate to="short-term" replace />} />
					</Route>
					<Route path="top-artists">
						<Route path="" element={<Navigate to="short-term" replace />} />
						<Route path="short-term" element={<TopArtists />} />
						<Route path="medium-term" element={<TopArtists />} />
						<Route path="long-term" element={<TopArtists />} />
						<Route path="*" element={<Navigate to="short-term" replace />} />
					</Route>
					<Route path="recents" element={<RecentlyPlayed />} />
					<Route path="dark" element={<Dark />} />
					<Route path="light" element={<Light />} />
					<Route path="track">
						<Route path="" element={<Navigate to="" replace />} />
						<Route path=":id" element={<Track />} />
					</Route>
					<Route path="artist">
						<Route path="" element={<Navigate to="" replace />} />
						<Route path=":id" element={<Artist />} />
					</Route>
					<Route path="album">
						<Route path="" element={<Navigate to="" replace />} />
						<Route path=":id" element={<Album />} />
					</Route>
					<Route path="*" element={<Navigate to="" replace />} />
				</Routes>
			</div>
			<Dialog open={!!error} BackdropComponent={Backdrop} fullWidth>
				<DialogTitle>{err?.name || ""}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{err?.message || ""}
						<br />
						{err?.message.endsWith(" not found")
							? "You will be redirected home"
							: "You will be signed out"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{err?.message.endsWith(" not found") ? null : (
						<Button onClick={handleDialogHome}>Home</Button>
					)}
					<Button onClick={handleDialogRetry}>Retry</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={snackbar.open}
				onClose={handleSnackbarClose}
				autoHideDuration={3000}
				TransitionComponent={Fade}>
				<Alert
					sx={{ width: "100%" }}
					elevation={6}
					variant="filled"
					severity={snackbar.variant}
					onClose={handleSnackbarClose}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</ThemeProvider>
	)
}

export const tabs = [
	{
		term: "short_term",
		description: "Past 4 Weeks"
	},
	{
		term: "medium_term",
		description: "Past 6 Months"
	},
	{
		term: "long_term",
		description: "All Time"
	}
] as const

export default App
