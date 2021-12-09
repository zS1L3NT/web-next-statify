import React, { useEffect } from "react"
import { set_theme } from "../actions/ThemeActions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const Light = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	//#endregion

	//#region Effects
	useEffect(() => {
		dispatch(set_theme("light"))
		history.go(-1)
	}, [dispatch, history])
	//#endregion

	return <></>
}

export default Light
