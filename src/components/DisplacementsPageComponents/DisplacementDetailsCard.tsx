import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Displacement, TransformedDisplacement } from "@/types/Displacements";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DisplacementDeletionModal from "./DeleteConfirmationModal";
import CustomizedSnackbar from "../CustomizedSnackBar";

export default function DisplacementDetailsCard({
	setIsEditing,
	displacementData,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	displacementData: TransformedDisplacement;
}) {
	const [openDeletionModal, setOpenDeletionModal] = React.useState(false);
	const handleOpenDeletionModal = () => setOpenDeletionModal(true);
	const handleCloseDeletionModal = () => setOpenDeletionModal(false);

	const [failureDeleteSnackbarIsOpen, setFailureDeleteSnackbarIsOpen] =
		React.useState(false);

	const displacementInitialDateAndTime = new Date(
		displacementData.inicioDeslocamento
	);
	const toLoadInitialDate =
		displacementInitialDateAndTime.toLocaleDateString("pt-BR");
	const toLoadInitialTime =
		displacementInitialDateAndTime.toLocaleTimeString("pt-BR");

	const displacementFinalDateAndTime = new Date(
		displacementData.fimDeslocamento
	);
	const toLoadFinalDate =
		displacementFinalDateAndTime.toLocaleDateString("pt-BR");
	const toLoadFinalTime =
		displacementFinalDateAndTime.toLocaleTimeString("pt-BR");

	return (
		<>
			<Card sx={{ minWidth: 275, width: "fit-content", margin: "auto" }}>
				<CardContent>
					<Typography
						sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
						color="text.secondary"
						gutterBottom
					>
						Detalhes do deslocamento
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Cliente: {displacementData?.nomeCliente}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Condutor: {displacementData?.nomeCondutor}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Marca/modelo do veículo: {displacementData?.marcaModeloVeiculo}
					</Typography>
					<Paper elevation={8} sx={{ padding: "10px" }}>
						<Typography
							sx={{ fontSize: 14, mb: "10px", fontWeight: "800" }}
							color="text.secondary"
							gutterBottom
						>
							Detalhes do deslocamento
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Inicio: {toLoadInitialDate} às {toLoadInitialTime}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Fim: {toLoadFinalDate} às {toLoadFinalTime}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Km inicial: km {displacementData?.kmInicial}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Km final: km {displacementData?.kmFinal}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Motivo: {displacementData?.motivo}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Checklist: {displacementData?.checkList}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Obsrvação: {displacementData?.observacao}
						</Typography>
					</Paper>
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
			<DisplacementDeletionModal
				open={openDeletionModal}
				handleClose={handleCloseDeletionModal}
				displacementId={displacementData.id}
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
