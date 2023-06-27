"use client";
import DriversSummaryCardsView from "@/components/DriversPageComponents/CardsView/DriverSummaryCardsView";
import HorizontalToggleButtons from "@/components/TablesComponents/DataViewTypeButtons";
import axios from "axios";
import React from "react";
import DynamicSummaryTable from "@/components/TablesComponents/DynamicTable/DynamicTableView";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import {
	Driver,
	DriversSummaryColumns,
	DriversSummaryRows,
} from "@/types/Drivers";

const columns: DriversSummaryColumns = [
	{ id: "nome", label: "Nome", minWidth: 170, align: "center" },
	{
		id: "catergoriaHabilitacao",
		label: "Categoria da Habilitação",
		minWidth: 100,
		align: "center",
	},
];

const DriversPage = () => {
	const [driversData, setDriversData] = React.useState<Driver[]>([]);
	const [viewType, setViewType] = React.useState("list");
	const [isFetchingData, setIsFetchingData] = React.useState(true);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Condutor"
				);
				setDriversData(response.data);
				setIsFetchingData(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const transformedDriversData: DriversSummaryRows = driversData.map(
		(driverObj) => {
			return {
				id: driverObj.id,
				nome: driverObj.nome,
				catergoriaHabilitacao: driverObj.catergoriaHabilitacao,
			};
		}
	);

	console.log(driversData);

	const rows: DriversSummaryRows = transformedDriversData;

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
					href={"/drivers/create"}
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
							Adicionar novo Motorista
						</Typography>
					</Button>
				</Link>
			</Box>

			{driversData.length === 0 && (
				<h1>Não há condutores registrados no momento.</h1>
			)}

			{driversData.length > 0 && viewType === "list" && (
				<DynamicSummaryTable columns={columns} rows={rows} data={driversData} />
			)}
			{driversData.length > 0 && viewType === "cards" && (
				<DriversSummaryCardsView driversData={driversData} />
			)}
		</>
	);
};

export default DriversPage;
