import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Driver } from "@/types/Drivers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DriverDeletionModal from "./DeleteConfirmationModal";
import CustomizedSnackbar from "../CustomizedSnackBar";

export default function DriverDetailsCard({
	setIsEditing,
	driverData,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	driverData: Driver;
}) {
	const [openDeletionModal, setOpenDeletionModal] = React.useState(false);
	const handleOpenDeletionModal = () => setOpenDeletionModal(true);
	const handleCloseDeletionModal = () => setOpenDeletionModal(false);

	const [failureDeleteSnackbarIsOpen, setFailureDeleteSnackbarIsOpen] =
		React.useState(false);

	const expirationDateAndTime = new Date(driverData.vencimentoHabilitacao);
	const toLoadDate = expirationDateAndTime.toLocaleDateString("pt-BR");
	const toLoadTime = expirationDateAndTime.toLocaleTimeString("pt-BR");

	return (
		<>
			<Card sx={{ minWidth: 275, width: "fit-content", margin: "auto" }}>
				<CardContent>
					<Typography
						sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
						color="text.secondary"
						gutterBottom
					>
						Detalhes do condutor
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Nome: {driverData?.nome}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Categoria da habilitação: {driverData?.catergoriaHabilitacao}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Número da habilitação: {driverData?.numeroHabilitacao}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Vencimento da habilitação: {toLoadDate} às {toLoadTime}
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<CardActions>
						<Button onClick={() => setIsEditing(true)} size="small">
							<EditIcon sx={{ marginRight: "5px" }} />
							Edit
						</Button>
					</CardActions>
					<CardActions>
						<Button size="small" onClick={handleOpenDeletionModal}>
							<DeleteIcon sx={{ marginRight: "5px" }} />
							Delete
						</Button>
					</CardActions>
				</Box>
			</Card>
			<DriverDeletionModal
				open={openDeletionModal}
				handleClose={handleCloseDeletionModal}
				driverId={driverData.id}
				setFailSnackbar={setFailureDeleteSnackbarIsOpen}
			/>
			<CustomizedSnackbar
				severity="error"
				message="Não foi possível deletar. Tente novamente mais tarde"
				openState={failureDeleteSnackbarIsOpen}
				setOpenState={setFailureDeleteSnackbarIsOpen}
			/>
		</>
	);
}
