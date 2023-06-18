"use client";
import ClientsSummaryTable from "@/components/ClientsPageComponents/ClientsSummaryTable";
import {
	Client,
	ClientsSummaryColumns,
	ClientsSummaryRows,
} from "@/types/Clients";
import axios from "axios";
import React from "react";

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
			<ClientsSummaryTable
				clientsData={clientsData}
				columns={columns}
				rows={rows}
			/>
		</>
	);
};

export default ClientsPage;
