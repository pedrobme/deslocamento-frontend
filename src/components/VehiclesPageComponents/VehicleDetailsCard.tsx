import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Vehicle } from "@/types/Vehicles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VehicleDeletionModal from "./DeleteConfirmationModal";
import CustomizedSnackbar from "../CustomizedSnackBar";

export default function VehicleDetailsCard({
	setIsEditing,
	vehicleData,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	vehicleData: Vehicle;
}) {
	const [openDeletionModal, setOpenDeletionModal] = React.useState(false);
	const handleOpenDeletionModal = () => setOpenDeletionModal(true);
	const handleCloseDeletionModal = () => setOpenDeletionModal(false);

	const [failureDeleteSnackbarIsOpen, setFailureDeleteSnackbarIsOpen] =
		React.useState(false);

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
						Marca/modelo: {vehicleData?.marcaModelo}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Placa: {vehicleData?.placa}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Quilometragem: {vehicleData?.kmAtual}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Ano de Fabricação: {vehicleData?.anoFabricacao}
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
			<VehicleDeletionModal
				open={openDeletionModal}
				handleClose={handleCloseDeletionModal}
				vehicleId={vehicleData.id}
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
