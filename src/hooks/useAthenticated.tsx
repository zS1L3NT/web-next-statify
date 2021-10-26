import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const useAuthenticated = (): void => {
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)

	useEffect(() => {
		if (!access_token) {
			history.push("/logout")
		}
	}, [history, access_token])
}

export default useAuthenticated