import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { set_access_token } from "../slices/AccessTokenSlice"
import { useNavigate } from "react-router-dom"

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
