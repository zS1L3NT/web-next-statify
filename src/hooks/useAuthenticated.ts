import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import useAppSelector from "./useAppSelector"

const useAuthenticated = (): string => {
	const token = useAppSelector(state => state.token)
	const location = useLocation()

	useEffect(() => {
		if (!token) {
			sessionStorage.setItem("redirect", location.pathname)
		}
	}, [location.pathname, token])

	return token ?? ""
}

export default useAuthenticated
