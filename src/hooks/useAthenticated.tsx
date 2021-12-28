import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import useAppSelector from "./useAppSelector"

const useAuthenticated = (): void => {
	//#region Hooks
	const access_token = useAppSelector(state => state.access_token)
	const history = useHistory()
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
