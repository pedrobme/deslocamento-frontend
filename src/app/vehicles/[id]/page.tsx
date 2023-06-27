"use client";
import VehicleDetailsCard from "@/components/VehiclesPageComponents/VehicleDetailsCard";
import EditVehicleDetailsCard from "@/components/VehiclesPageComponents/EditVehicleDetailsCard";
import CustomizedSnackbar from "@/components/CustomizedSnackBar";
import { Vehicle } from "@/types/Vehicles";
import axios from "axios";
import React from "react";
import { useParams } from "next/navigation";

const VehicleDetailsPage = () => {
	const [vehicleData, setVehicleData] = React.useState<Vehicle>({
		id: 0,
		anoFabricacao: 0,
		kmAtual: 0,
		marcaModelo: "",
		placa: "",
	});

	const [isEditing, setIsEditing] = React.useState(false);
	const [successSnackbarIsOpen, setSuccessSnackbarIsOpen] =
		React.useState(false);
	const [failureSnackbarIsOpen, setFailureSnackbarIsOpen] =
		React.useState(false);
	const params = useParams();

	React.useEffect(() => {
		const vehicleId = params.id;

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${vehicleId}`
				);
				setVehicleData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [isEditing]);

	return isEditing ? (
		<>
			<EditVehicleDetailsCard
				setIsEditing={setIsEditing}
				vehicleData={vehicleData}
				setSuccessSnackbarIsOpen={setSuccessSnackbarIsOpen}
				setFailureSnackbarIsOpen={setFailureSnackbarIsOpen}
			/>
			<CustomizedSnackbar
				severity="error"
				message="Erro! Tente novamente em alguns instantes."
				openState={failureSnackbarIsOpen}
				setOpenState={setFailureSnackbarIsOpen}
			/>
		</>
	) : (
		<>
			<VehicleDetailsCard
				setIsEditing={setIsEditing}
				vehicleData={vehicleData}
			/>
			<CustomizedSnackbar
				severity="success"
				message="Vehiclee atualizado com sucesso!"
				openState={successSnackbarIsOpen}
				setOpenState={setSuccessSnackbarIsOpen}
			/>
		</>
	);
};

export default VehicleDetailsPage;
