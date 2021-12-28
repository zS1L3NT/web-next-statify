import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { set_access_token } from "../slices/AccessTokenSlice"
import { useNavigate } from "react-router-dom"

const Logout: React.FC = () => {
	//#region Hooks
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	//#endregion

	//#region Effects
	useEffect(() => {
		dispatch(set_access_token(null))
		navigate(sessionStorage.getItem("redirect") ? "/login" : "/")
	}, [dispatch, navigate])
	//#endregion

	return <></>
}

export default Logout
