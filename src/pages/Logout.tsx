import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { set_access_token } from "../actions/AccessTokenActions"
import { set_spotify_api } from "../actions/SpotifyApiActions"

const Logout = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(set_access_token(null))
		dispatch(set_spotify_api(null))
		history.push("/")
	}, [dispatch, history])

	return <></>
}

export default Logout
