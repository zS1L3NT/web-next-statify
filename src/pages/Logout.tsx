import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useAppDispatch from "../hooks/useAppDispatch"
import { set_access_token } from "../slices/AccessTokenSlice"

const Logout: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(set_access_token(null))
		navigate(sessionStorage.getItem("redirect") ? "/login" : "/")
	}, [dispatch, navigate])

	return <></>
}

export default Logout
