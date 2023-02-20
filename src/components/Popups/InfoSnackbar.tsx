import { Alert, Fade, Snackbar as MUISnackbar } from "@mui/material"

import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import { clearSnackbar } from "../../slices/SnackbarSlice"

const InfoSnackbar = () => {
	const snackbar = useAppSelector(state => state.snackbar)
	const dispatch = useAppDispatch()

	const handleClose = () => {
		dispatch(clearSnackbar())
	}

	return (
		<MUISnackbar
			open={snackbar.open}
			onClose={handleClose}
			autoHideDuration={5000}
			TransitionComponent={Fade}>
			<Alert
				sx={{ width: "100%" }}
				elevation={6}
				variant="filled"
				severity={snackbar.variant}
				onClose={handleClose}>
				{snackbar.message}
			</Alert>
		</MUISnackbar>
	)
}

export default InfoSnackbar
