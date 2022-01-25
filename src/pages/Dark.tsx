import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { set_theme } from "../slices/ThemeSlice"
import { useNavigate } from "react-router-dom"

const Dark: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(set_theme("dark"))
		navigate(-1)
	}, [dispatch, navigate])

	return <></>
}

export default Dark
