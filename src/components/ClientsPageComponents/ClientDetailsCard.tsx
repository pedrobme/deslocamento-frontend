import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Client } from "@/types/Clients";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClientDeletionModal from "./DeleteConfirmationModal";

export default function ClientDetailsCard({
	setIsEditing,
	clientData,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	clientData: Client;
}) {
	const [openDeletionModal, setOpenDeletionModal] = React.useState(false);
	const handleOpenDeletionModal = () => setOpenDeletionModal(true);
	const handleCloseDeletionModal = () => setOpenDeletionModal(false);

	return (
		<>
			<Card sx={{ minWidth: 275, width: "fit-content", margin: "auto" }}>
				<CardContent>
					<Typography
						sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
						color="text.secondary"
						gutterBottom
					>
						Detalhes do cliente
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Nome: {clientData?.nome}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Tipo de documento: {clientData?.tipoDocumento}
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Número do documento: {clientData?.numeroDocumento}
					</Typography>
					<Paper elevation={8} sx={{ padding: "10px" }}>
						<Typography
							sx={{ fontSize: 14, mb: "10px", fontWeight: "800" }}
							color="text.secondary"
							gutterBottom
						>
							Endereço
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Logradouro: {clientData?.logradouro}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Numero: {clientData?.numero}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Bairro: {clientData?.bairro}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							Cidade: {clientData?.cidade}
						</Typography>
						<Typography
							sx={{ fontSize: 14, mb: "10px" }}
							color="text.secondary"
							gutterBottom
						>
							UF: {clientData?.uf}
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
			<ClientDeletionModal
				open={openDeletionModal}
				handleClose={handleCloseDeletionModal}
				clientId={clientData.id}
			/>
		</>
	);
}
