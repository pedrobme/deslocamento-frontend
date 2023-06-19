import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Client, ClientWithoutDocuments } from "@/types/Clients";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export default function EditClientDetailsCard({
	setIsEditing,
	clientData,
	setSuccessSnackbarIsOpen,
	setFailureSnackbarIsOpen,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	clientData: Client;
	setSuccessSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFailureSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { tipoDocumento, numeroDocumento, ...requisitionBodyObject } =
		clientData;

	const [updatedClientData, setUpdatedClientData] =
		React.useState<ClientWithoutDocuments>(requisitionBodyObject);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof ClientWithoutDocuments
	) => {
		setUpdatedClientData((prevData) => ({
			...prevData,
			[field]: event.target.value,
		}));
	};

	const updateOneClientById = async (id: number) => {
		try {
			const response = await axios.put(
				`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
				updatedClientData
			);

			setSuccessSnackbarIsOpen(true);
			setIsEditing(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setFailureSnackbarIsOpen(true);
		}
	};

	return (
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
					Nome:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						onChange={(e) => handleInputChange(e, "nome")}
						defaultValue={clientData?.nome}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Tipo de documento:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						value={clientData?.tipoDocumento}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Número do documento:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						value={clientData?.numeroDocumento}
						disabled={true}
					></OutlinedInput>
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
						Logradouro:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "logradouro")}
							defaultValue={clientData?.logradouro}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Numero:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "numero")}
							defaultValue={clientData?.numero}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Bairro:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "bairro")}
							defaultValue={clientData?.bairro}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Cidade:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "cidade")}
							defaultValue={clientData?.cidade}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						UF:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "uf")}
							defaultValue={clientData?.uf}
						></OutlinedInput>
					</Typography>
				</Paper>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<CardActions>
					<Button
						onClick={() =>
							updateOneClientById(clientData?.id ? clientData.id : 0)
						}
						size="small"
					>
						<SaveIcon sx={{ marginRight: "5px" }} />
						Salvar
					</Button>
					<Button onClick={() => setIsEditing(false)} size="small">
						<CancelIcon sx={{ marginRight: "5px" }} />
						Cancelar
					</Button>
				</CardActions>
			</Box>
		</Card>
	);
}
