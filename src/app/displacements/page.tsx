"use client";
import DisplacementsSummaryCardsView from "@/components/DisplacementsPageComponents/CardsView/DisplacementsSummaryCardsView";
import HorizontalToggleButtons from "@/components/TablesComponents/DataViewTypeButtons";
import {
	Displacement,
	DisplacementsSummaryColumns,
	DisplacementsSummaryRows,
	TransformedDisplacement,
} from "@/types/Displacements";
import axios from "axios";
import React from "react";
import DynamicSummaryTable from "@/components/TablesComponents/DynamicTable/DynamicTableView";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { Client } from "@/types/Clients";
import { Driver } from "@/types/Drivers";
import { Vehicle } from "@/types/Vehicles";

const columns: DisplacementsSummaryColumns = [
	{ id: "nomeCliente", label: "Cliente", minWidth: 170, align: "center" },
	{ id: "nomeCondutor", label: "Condutor", minWidth: 100, align: "center" },
	{
		id: "marcaModeloVeiculo",
		label: "Marca/modelo do veículo",
		minWidth: 170,
		align: "center",
	},
	{
		id: "inicioDeslocamento",
		label: "Início do deslocamento",
		minWidth: 170,
		align: "center",
	},
	{
		id: "fimDeslocamento",
		label: "Fim do deslocamento",
		minWidth: 170,
		align: "center",
		format: (value: number) => value.toString(),
	},
];

const DisplacementsPage = () => {
	const [displacementsData, setDisplacementsData] = React.useState<
		Displacement[]
	>([]);
	const [clientsHashmap, setClientsHashmap] = React.useState<{
		[id: number]: string;
	}>({});
	const [driversHashmap, setDriversHashmap] = React.useState<{
		[id: number]: string;
	}>({});
	const [vehiclesHashmap, setVehiclesHashmap] = React.useState<{
		[id: number]: string;
	}>({});

	const [viewType, setViewType] = React.useState("list");

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const responseDisplacement = axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Deslocamento"
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

				const [displacementsData, clientsData, driversData, vehiclesData] =
					await Promise.all([
						responseDisplacement,
						responseClients,
						responseDrivers,
						responseVehicles,
					]);

				setDisplacementsData(displacementsData.data);
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
	}, []);

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

	const TransformedDisplacementData: TransformedDisplacement[] =
		displacementsData.map((displacementObj) => {
			let nomeCliente = clientsHashmap[displacementObj.idCliente];
			let nomeCondutor = driversHashmap[displacementObj.idCondutor];
			let marcaModeloVeiculo = vehiclesHashmap[displacementObj.idVeiculo];

			if (!nomeCliente) {
				nomeCliente = "Cliente não encontrado";
			}

			if (!nomeCondutor) {
				nomeCondutor = "Condutor não encontrado";
			}

			if (!marcaModeloVeiculo) {
				marcaModeloVeiculo = "Veiculo não encontrado";
			}

			const { idCliente, idCondutor, idVeiculo, ...rest } = displacementObj;

			return {
				...rest,
				nomeCondutor,
				marcaModeloVeiculo,
				nomeCliente,
			};
		});

	const transformedDisplacementsSummaryData: DisplacementsSummaryRows =
		displacementsData.map((displacementObj) => {
			let nomeCliente = clientsHashmap[displacementObj.idCliente];
			let nomeCondutor = driversHashmap[displacementObj.idCondutor];
			let marcaModeloVeiculo = vehiclesHashmap[displacementObj.idVeiculo];

			if (!nomeCliente) {
				nomeCliente = "Cliente não encontrado";
			}

			if (!nomeCondutor) {
				nomeCondutor = "Condutor não encontrado";
			}

			if (!marcaModeloVeiculo) {
				marcaModeloVeiculo = "Veiculo não encontrado";
			}

			return {
				inicioDeslocamento: displacementObj.inicioDeslocamento,
				fimDeslocamento: displacementObj.fimDeslocamento,
				nomeCondutor: nomeCondutor,
				marcaModeloVeiculo: marcaModeloVeiculo,
				nomeCliente: nomeCliente,
			};
		});

	const rows: DisplacementsSummaryRows = transformedDisplacementsSummaryData;

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<HorizontalToggleButtons
					viewType={viewType}
					setViewType={setViewType}
				/>
				<Link
					href={"/displacements/create"}
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<Button
						variant="contained"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							maxWidth: "180px",
						}}
					>
						<AddCircleIcon />
						<Typography sx={{ fontSize: "13px" }}>
							Adicionar novo Deslocamento
						</Typography>
					</Button>
				</Link>
			</Box>

			{displacementsData.length === 0 && (
				<h1>Não há deslocamentos registrados no momento.</h1>
			)}

			{displacementsData.length > 0 && viewType === "list" && (
				<DynamicSummaryTable
					columns={columns}
					rows={rows}
					data={TransformedDisplacementData}
				/>
			)}
			{displacementsData.length > 0 && viewType === "cards" && (
				<DisplacementsSummaryCardsView
					displacementsData={TransformedDisplacementData}
				/>
			)}
		</>
	);
};

export default DisplacementsPage;
