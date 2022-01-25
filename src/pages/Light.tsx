import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { set_theme } from "../slices/ThemeSlice"
import { useNavigate } from "react-router-dom"

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
