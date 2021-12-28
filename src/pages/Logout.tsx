import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { set_access_token } from "../slices/AccessTokenSlice"
import { useHistory } from "react-router-dom"

const Logout: React.FC = () => {
	//#region Hooks
	const dispatch = useAppDispatch()
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
