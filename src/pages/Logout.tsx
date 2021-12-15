import React, { useEffect } from "react"
import { set_access_token } from "../actions/AccessTokenActions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const Logout = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	//#endregion

	//#region Effects
	useEffect(() => {
		dispatch(set_access_token(null))
		history.push(sessionStorage.getItem("redirect") ? "/login" : "/")
	}, [dispatch, history])
	//#endregion

	return <></>
}

export default Logout
