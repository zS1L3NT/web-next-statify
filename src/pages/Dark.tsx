import React, { useEffect } from "react"
import { set_theme } from "../actions/ThemeActions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const Dark: React.FC = () => {
	//#region Hooks
	const dispatch = useDispatch()
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
