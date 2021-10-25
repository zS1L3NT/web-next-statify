import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { set_theme } from "../actions/ThemeActions"

const Light = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(set_theme("light"))
		history.go(-1)
	}, [dispatch, history])

	return <></>
}

export default Light
