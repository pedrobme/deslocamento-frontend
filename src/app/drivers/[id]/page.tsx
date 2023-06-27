"use client";
import DriverDetailsCard from "@/components/DriversPageComponents/DriverDetailsCard";
import EditDriverDetailsCard from "@/components/DriversPageComponents/EditDriverDetailsCard";
import CustomizedSnackbar from "@/components/CustomizedSnackBar";
import { Driver } from "@/types/Drivers";
import axios from "axios";
import React from "react";
import { useParams } from "next/navigation";

const DriverDetailsPage = () => {
	const [driverData, setDriverData] = React.useState<Driver>({
		id: 0,
		nome: "",
		catergoriaHabilitacao: "",
		numeroHabilitacao: "",
		vencimentoHabilitacao: "",
	});

	const [isEditing, setIsEditing] = React.useState(false);
	const [successSnackbarIsOpen, setSuccessSnackbarIsOpen] =
		React.useState(false);
	const [failureSnackbarIsOpen, setFailureSnackbarIsOpen] =
		React.useState(false);
	const params = useParams();

	React.useEffect(() => {
		const driverId = params.id;

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${driverId}`
				);
				setDriverData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [isEditing]);

	return isEditing ? (
		<>
			<EditDriverDetailsCard
				setIsEditing={setIsEditing}
				driverData={driverData}
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
			<DriverDetailsCard setIsEditing={setIsEditing} driverData={driverData} />
			<CustomizedSnackbar
				severity="success"
				message="Condutor atualizado com sucesso!"
				openState={successSnackbarIsOpen}
				setOpenState={setSuccessSnackbarIsOpen}
			/>
		</>
	);
};

export default DriverDetailsPage;
