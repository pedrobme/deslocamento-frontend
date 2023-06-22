import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Vehicle, VehicleEditObject } from "@/types/Vehicles";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export default function EditVehicleDetailsCard({
	setIsEditing,
	vehicleData,
	setSuccessSnackbarIsOpen,
	setFailureSnackbarIsOpen,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	vehicleData: Vehicle;
	setSuccessSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFailureSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { placa, ...requisitionBodyObject } = vehicleData;

	const [updatedVehicleData, setUpdatedVehicleData] = React.useState<
		Omit<Vehicle, "placa">
	>(requisitionBodyObject);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof VehicleEditObject
	) => {
		setUpdatedVehicleData((prevData) => ({
			...prevData,
			[field]: event.target.value,
		}));
	};

	const updateOneVehicleById = async (id: number) => {
		try {
			const response = await axios.put(
				`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`,
				updatedVehicleData
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
					Detalhes do veículo
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Marca/Modelo:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						onChange={(e) => handleInputChange(e, "marcaModelo")}
						defaultValue={vehicleData?.marcaModelo}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Placa:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						value={vehicleData?.placa}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Quilometragem:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						onChange={(e) => handleInputChange(e, "kmAtual")}
						defaultValue={vehicleData?.kmAtual}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Ano de fabricação:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						onChange={(e) => handleInputChange(e, "anoFabricacao")}
						defaultValue={vehicleData?.anoFabricacao}
					></OutlinedInput>
				</Typography>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<CardActions>
					<Button
						onClick={() =>
							updateOneVehicleById(vehicleData?.id ? vehicleData.id : 0)
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
