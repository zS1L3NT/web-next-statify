import { useSelector } from "react-redux"

const useThemeValue = <T extends any>(dark: T, light: T): T => {
	const theme = useSelector(state => state.theme)
	return theme === "dark" ? dark : light
}

export default useThemeValue