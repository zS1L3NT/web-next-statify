import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { set_theme } from "../slices/ThemeSlice"
import { useNavigate } from "react-router-dom"

const Dark: React.FC = () => {
	//#region Hooks
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	//#endregion

	//#region Effects
	useEffect(() => {
		dispatch(set_theme("dark"))
		navigate(-1)
	}, [dispatch, navigate])
	//#endregion

	return <></>
}

export default Dark
