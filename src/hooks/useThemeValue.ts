import useAppSelector from "./useAppSelector"

const useThemeValue = <T>(dark: T, light: T): T => {
	const theme = useAppSelector(state => state.theme)

	return theme === "dark" ? dark : light
}

export default useThemeValue
