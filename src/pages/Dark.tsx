import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setTheme } from "../actions/ThemeActions"

const Dark = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(setTheme("dark"))
		history.go(-1)
	}, [dispatch, history])

	return <></>
}

export default Dark