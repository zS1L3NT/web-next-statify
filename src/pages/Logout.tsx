import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useAppDispatch from "../hooks/useAppDispatch"
import { setToken } from "../slices/TokenSlice"

const Logout = ({}: {}) => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setToken(null))
		navigate(sessionStorage.getItem("redirect") ? "/login" : "/")
	}, [dispatch, navigate])

	return <></>
}

export default Logout
