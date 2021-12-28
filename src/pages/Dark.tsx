import React, { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { set_theme } from "../slices/ThemeSlice"
import { useHistory } from "react-router-dom"

const Dark: React.FC = () => {
	//#region Hooks
	const dispatch = useAppDispatch()
	const history = useHistory()
	//#endregion

	//#region Effects
	useEffect(() => {
		dispatch(set_theme("dark"))
		history.go(-1)
	}, [dispatch, history])
	//#endregion

	return <></>
}

export default Dark
