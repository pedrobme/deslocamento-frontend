"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Vehicle } from "@/types/Vehicles";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewVehiclePage = () => {
	const [newVehicleData, setNewVehicleData] = React.useState<
		Omit<Vehicle, "id">
	>({
		placa: "",
		marcaModelo: "",
		anoFabricacao: 0,
		kmAtual: 0,
	});

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Omit<Vehicle, "id">
	) => {
		setNewVehicleData((prevData) => ({
			...prevData,
			[field]: event.target.value,
		}));
	};

	const router = useRouter();

	const createNewVehicle = async (newVehicleData: Omit<Vehicle, "id">) => {
		try {
			const response = await axios.post(
				`https://api-deslocamento.herokuapp.com/api/v1/Veiculo`,
				newVehicleData
			);

			router.push("/vehicles");
		} catch (error) {
			console.error("Error fetching data:", error);
			router.push("/vehicles");
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
						Detalhes do veículo
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Marca/Modelo:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "marcaModelo")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Placa:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "placa")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Quilometragem:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "kmAtual")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Ano de fabricação:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "anoFabricacao")}
						></OutlinedInput>
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<CardActions>
						<Button
							onClick={() => createNewVehicle(newVehicleData)}
							size="small"
						>
							<SaveIcon sx={{ marginRight: "5px" }} />
							Salvar
						</Button>
					</CardActions>
				</Box>
			</Card>
		</div>
	);
};

export default NewVehiclePage;
