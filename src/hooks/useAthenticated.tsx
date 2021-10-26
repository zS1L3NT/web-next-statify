import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const useAuthenticated = (): void => {
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)

	useEffect(() => {
		if (!access_token) {
			sessionStorage.setItem("auth_redirect", history.location.pathname)
			history.push("/logout")
		}
	}, [history, history.location.pathname, access_token])
}

export default useAuthenticated
