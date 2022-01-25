import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import { Alert, Fade, Snackbar as MUISnackbar } from "@mui/material"
import { clear_snackbar } from "../../slices/SnackbarSlice"

const InfoSnackbar = () => {
	const dispatch = useAppDispatch()
	const snackbar = useAppSelector(state => state.snackbar)

	const handleClose = () => {
		dispatch(clear_snackbar())
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
