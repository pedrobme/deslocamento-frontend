import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarSeverity } from "@/types/CustomizedSnackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar({
	severity,
	message,
	openState,
	setOpenState,
}: {
	severity: SnackbarSeverity;
	message: string;
	openState: boolean;
	setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenState(false);
	};

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar open={openState} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
