"use client";
import ClientsSummaryCardsView from "@/components/ClientsPageComponents/CardsView/ClientSummaryCardsView";
import HorizontalToggleButtons from "@/components/TablesComponents/DataViewTypeButtons";
import {
	Client,
	ClientsSummaryColumns,
	ClientsSummaryRows,
} from "@/types/Clients";
import axios from "axios";
import React from "react";
import DynamicSummaryTable from "@/components/TablesComponents/DynamicTable/DynamicTableView";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Typography } from "@mui/material";
import CreateNewClientModal from "@/components/ClientsPageComponents/CreateNewClientModal";
import CustomizedSnackbar from "@/components/CustomizedSnackBar";
import Link from "next/link";

const columns: ClientsSummaryColumns = [
	{ id: "nome", label: "Nome", minWidth: 170, align: "center" },
	{ id: "uf", label: "UF", minWidth: 100, align: "center" },
	{
		id: "tipoDocumento",
		label: "Tipo\u00a0de\u00a0Documento",
		minWidth: 170,
		align: "center",
	},
	{
		id: "numeroDocumento",
		label: "Numero\u00a0do\u00a0Documento",
		minWidth: 170,
		align: "center",
		format: (value: number) => value.toString(),
	},
];

const ClientsPage = () => {
	const [clientsData, setClientsData] = React.useState<Client[]>([]);
	const [viewType, setViewType] = React.useState("list");

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Cliente"
				);
				setClientsData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const transformedClientsData: ClientsSummaryRows = clientsData.map(
		(clientObj) => {
			return {
				id: clientObj.id,
				numeroDocumento: clientObj.nome,
				tipoDocumento: clientObj.tipoDocumento,
				nome: clientObj.nome,
				uf: clientObj.uf,
			};
		}
	);

	const rows: ClientsSummaryRows = transformedClientsData;

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
				<Link href={"/clients/create"}>
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
							Adicionar novo Cliente
						</Typography>
					</Button>
				</Link>
			</Box>

			{clientsData.length === 0 && (
				<h1>Não há clientes registrados no momento.</h1>
			)}

			{clientsData.length > 0 && viewType === "list" && (
				<DynamicSummaryTable columns={columns} rows={rows} data={clientsData} />
			)}
			{clientsData.length > 0 && viewType === "cards" && (
				<ClientsSummaryCardsView clientsData={clientsData} />
			)}
		</>
	);
};

export default ClientsPage;
