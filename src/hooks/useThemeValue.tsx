import useAppSelector from "./useAppSelector"

const useThemeValue = <T extends any>(dark: T, light: T): T => {
	//#region Hooks
	const theme = useAppSelector(state => state.theme)
	//#endregion

	return theme === "dark" ? dark : light
}

export default useThemeValue
