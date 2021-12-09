import { useSelector } from "react-redux"

const useThemeValue = <T extends any>(dark: T, light: T): T => {
	//#region Hooks
	const theme = useSelector(state => state.theme)
	//#endregion

	return theme === "dark" ? dark : light
}

export default useThemeValue
