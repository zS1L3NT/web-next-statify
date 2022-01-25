import useAppSelector from "./useAppSelector"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useAuthenticated = (): void => {
	const access_token = useAppSelector(state => state.access_token)
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!access_token) {
			sessionStorage.setItem("redirect", location.pathname)
			navigate("/logout")
		}
	}, [navigate, location.pathname, access_token])
}

export default useAuthenticated
