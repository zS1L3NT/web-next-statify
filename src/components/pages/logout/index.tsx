import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setAccessToken } from "../../../actions/AccessTokenActions"

const Logout = (): JSX.Element => {
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(setAccessToken(""))
		history.push("/")
	}, [dispatch, history])

	return <></>
}

export default Logout
