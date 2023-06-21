"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Client } from "@/types/Clients";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewClientPage = () => {
	const [newClientData, setNewClientData] = React.useState({
		nome: "",
		tipoDocumento: "",
		numeroDocumento: "",
		logradouro: "",
		numero: "",
		bairro: "",
		cidade: "",
		uf: "",
	});

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Omit<Client, "id">
	) => {
		setNewClientData((prevData) => ({
			...prevData,
			[field]: event.target.value,
		}));
	};

	const router = useRouter();

	const createNewClient = async (newClientData: Omit<Client, "id">) => {
		try {
			const response = await axios.post(
				`https://api-deslocamento.herokuapp.com/api/v1/Cliente`,
				newClientData
			);

			router.push("/clients");
		} catch (error) {
			console.error("Error fetching data:", error);
			router.push("/clients");
		}
	};

	return (
		<div>
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
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Tipo de documento:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "tipoDocumento")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Número do documento:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "numeroDocumento")}
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
							></OutlinedInput>
						</Typography>
					</Paper>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<CardActions>
						<Button onClick={() => createNewClient(newClientData)} size="small">
							<SaveIcon sx={{ marginRight: "5px" }} />
							Salvar
						</Button>
					</CardActions>
				</Box>
			</Card>
		</div>
	);
};

export default NewClientPage;
