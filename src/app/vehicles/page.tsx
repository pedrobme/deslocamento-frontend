"use client";
import VehiclesSummaryCardsView from "@/components/VehiclesPageComponents/CardsView/VehicleSummaryCardsView";
import HorizontalToggleButtons from "@/components/TablesComponents/DataViewTypeButtons";
import {
	Vehicle,
	VehiclesSummaryColumns,
	VehiclesSummaryRows,
} from "@/types/Vehicles";
import axios from "axios";
import React from "react";
import DynamicSummaryTable from "@/components/TablesComponents/DynamicTable/DynamicTableView";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Link from "next/link";

const columns: VehiclesSummaryColumns = [
	{ id: "marcaModelo", label: "Marca/Modelo", minWidth: 100, align: "center" },
	{ id: "placa", label: "Placa", minWidth: 170, align: "center" },
];

const VehiclesPage = () => {
	const [vehiclesData, setVehiclesData] = React.useState<Vehicle[]>([]);
	const [viewType, setViewType] = React.useState("list");
	const [isFetchingData, setIsFetchingData] = React.useState(true);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Veiculo"
				);
				setVehiclesData(response.data);
				setIsFetchingData(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const transformedVehiclesData: VehiclesSummaryRows = vehiclesData.map(
		(vehicleObj) => {
			return {
				placa: vehicleObj.placa,
				marcaModelo: vehicleObj.marcaModelo,
			};
		}
	);

	const rows: VehiclesSummaryRows = transformedVehiclesData;

	return isFetchingData ? (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress />
		</Box>
	) : (
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
					href={"/vehicles/create"}
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
							Adicionar novo Veículo
						</Typography>
					</Button>
				</Link>
			</Box>

			{vehiclesData.length === 0 && (
				<h1>Não há veículos registrados no momento.</h1>
			)}

			{vehiclesData.length > 0 && viewType === "list" && (
				<DynamicSummaryTable
					columns={columns}
					rows={rows}
					data={vehiclesData}
				/>
			)}
			{vehiclesData.length > 0 && viewType === "cards" && (
				<VehiclesSummaryCardsView vehiclesData={vehiclesData} />
			)}
		</>
	);
};

export default VehiclesPage;
