import { createTheme } from "@mui/material"

const palette = {
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

const light = createTheme({
	palette: {
		...palette,
		primary: {
			main: "#1ED760",
			contrastText: "#111111"
		},
		background: {
			default: "#EEEEEE"
		}
	}
})

const dark = createTheme({
	palette: {
		...palette,
		primary: {
			main: "#25b359",
			contrastText: "#DDDDDD"
		},
		mode: "dark",
		background: {
			default: "#20262D"
		}
	}
})

export { light, dark }
