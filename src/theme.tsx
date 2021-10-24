import { createTheme } from "@mui/material"

const theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#20262D"
		},
		primary: {
			main: "#1ED760",
			light: "#19E68C",
			dark: "#117A37",
		},
		secondary: {
			main: "#2941AB",
			light: "#1D75DE",
			dark: "#273B94"
		},
		success: {
			main: "#1db954"
		},
		error: {
			main: "#e22134"
		},
		warning: {
			main: "#ff5722"
		}
	}
})

export default theme