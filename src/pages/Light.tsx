import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useAppDispatch from "../hooks/useAppDispatch"
import { set_theme } from "../slices/ThemeSlice"

const Light: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(set_theme("light"))
		navigate(-1)
	}, [dispatch, navigate])

	return <></>
}

export default Light
