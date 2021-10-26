import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { set_access_token } from "../actions/AccessTokenActions"

const Logout = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(set_access_token(null))
		history.push(sessionStorage.getItem("auth_redirect") ? "/login" : "/")
	}, [dispatch, history])

	return <></>
}

export default Logout
