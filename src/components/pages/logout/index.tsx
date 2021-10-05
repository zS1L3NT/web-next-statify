import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setAccessToken } from "../../../actions/AccessTokenActions"
import { setSpotifyApi } from "../../../actions/SpotifyApiActions"

const Logout = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(setAccessToken(null))
		dispatch(setSpotifyApi(null))
		history.push("/")
	}, [dispatch, history])

	return <></>
}

export default Logout
