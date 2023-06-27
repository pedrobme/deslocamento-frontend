"use client";
import DisplacementDetailsCard from "@/components/DisplacementsPageComponents/DisplacementDetailsCard";
import EditDisplacementDetailsCard from "@/components/DisplacementsPageComponents/EditDisplacementDetailsCard";
import CustomizedSnackbar from "@/components/CustomizedSnackBar";
import { Displacement, TransformedDisplacement } from "@/types/Displacements";
import axios from "axios";
import React from "react";
import { Client } from "@/types/Clients";
import { Driver } from "@/types/Drivers";
import { Vehicle } from "@/types/Vehicles";

const DisplacementDetailsPage = () => {
	const [displacementData, setDisplacementData] = React.useState<Displacement>({
		id: 0,
		checkList: "",
		fimDeslocamento: "",
		idCliente: 0,
		idCondutor: 0,
		idVeiculo: 0,
		inicioDeslocamento: "",
		kmFinal: 0,
		kmInicial: 0,
		motivo: "",
		observacao: "",
	});

	const [isEditing, setIsEditing] = React.useState(false);
	const [successSnackbarIsOpen, setSuccessSnackbarIsOpen] =
		React.useState(false);
	const [failureSnackbarIsOpen, setFailureSnackbarIsOpen] =
		React.useState(false);
	const [clientsHashmap, setClientsHashmap] = React.useState<{
		[id: number]: string;
	}>({});
	const [driversHashmap, setDriversHashmap] = React.useState<{
		[id: number]: string;
	}>({});
	const [vehiclesHashmap, setVehiclesHashmap] = React.useState<{
		[id: number]: string;
	}>({});

	React.useEffect(() => {
		const displacementId = window.location.pathname.split("/").pop();

		const fetchData = async () => {
			try {
				const responseDisplacementById = axios.get(
					`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${displacementId}`
				);
				const responseClients = axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Cliente"
				);
				const responseDrivers = axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Condutor"
				);
				const responseVehicles = axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Veiculo"
				);

				const [displacementByIdData, clientsData, driversData, vehiclesData] =
					await Promise.all([
						responseDisplacementById,
						responseClients,
						responseDrivers,
						responseVehicles,
					]);
				setDisplacementData(displacementByIdData.data);
				createLookUpHashMaps(
					clientsData.data,
					driversData.data,
					vehiclesData.data
				);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [isEditing]);

	const createLookUpHashMaps = (
		clientsData: Client[],
		driversData: Driver[],
		vehiclesData: Vehicle[]
	) => {
		const clientsLookup: { [id: number]: string } = {};
		const driversLookup: { [id: number]: string } = {};
		const vehiclesLookup: { [id: number]: string } = {};

		clientsData.forEach((clientObj) => {
			clientsLookup[clientObj.id] = clientObj.nome;
		});

		driversData.forEach((driverObj) => {
			driversLookup[driverObj.id] = driverObj.nome;
		});

		vehiclesData.forEach((vehicleObj) => {
			vehiclesLookup[vehicleObj.id] = vehicleObj.marcaModelo;
		});

		setClientsHashmap(clientsLookup);
		setDriversHashmap(driversLookup);
		setVehiclesHashmap(vehiclesLookup);
	};

	let nomeCliente = clientsHashmap[displacementData.idCliente];
	let nomeCondutor = driversHashmap[displacementData.idCondutor];
	let marcaModeloVeiculo = vehiclesHashmap[displacementData.idVeiculo];

	if (!nomeCliente) {
		nomeCliente = "Cliente não encontrado";
	}

	if (!nomeCondutor) {
		nomeCondutor = "Condutor não encontrado";
	}

	if (!marcaModeloVeiculo) {
		marcaModeloVeiculo = "Veiculo não encontrado";
	}

	const { idCliente, idCondutor, idVeiculo, ...rest } = displacementData;

	const transformedDisplacementData: TransformedDisplacement = {
		...rest,
		nomeCliente,
		nomeCondutor,
		marcaModeloVeiculo,
	};

	return isEditing ? (
		<>
			<EditDisplacementDetailsCard
				setIsEditing={setIsEditing}
				displacementData={transformedDisplacementData}
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
			<DisplacementDetailsCard
				setIsEditing={setIsEditing}
				displacementData={transformedDisplacementData}
			/>
			<CustomizedSnackbar
				severity="success"
				message="Deslocamento atualizado com sucesso!"
				openState={successSnackbarIsOpen}
				setOpenState={setSuccessSnackbarIsOpen}
			/>
		</>
	);
};

export default DisplacementDetailsPage;
