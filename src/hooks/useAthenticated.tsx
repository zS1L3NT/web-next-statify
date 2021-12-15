import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

const useAuthenticated = (): void => {
	//#region Hooks
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (!access_token) {
			sessionStorage.setItem("redirect", history.location.pathname)
			history.push("/logout")
		}
	}, [history, access_token])
	//#endregion
}

export default useAuthenticated
