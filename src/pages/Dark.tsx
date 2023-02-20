import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useAppDispatch from "../hooks/useAppDispatch"
import { setTheme } from "../slices/ThemeSlice"

const Dark = ({}: {}) => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setTheme("dark"))
		navigate(-1)
	}, [dispatch, navigate])

	return <></>
}

export default Dark
