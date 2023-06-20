import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import { CustomScrollbarContainer } from "../../TablesComponents/TableContainerWithCustomScrollbar";
import ClientsSummaryTableHead from "../TableView/ClientsSummaryTableHead";
import { Client } from "@/types/Clients";
import ClientSummaryCard from "./ClientSummaryCard";

export default function ClientsSummaryCardsView({
	clientsData,
}: {
	clientsData: Client[];
}) {
	return (
		<Paper elevation={4} sx={{ width: "100%", padding: "30px" }}>
			<CustomScrollbarContainer
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "wrap",
					minHeight: 440,
					maxHeight: 440,
				}}
			>
				{clientsData.map((clientData, index) => {
					return (
						<ClientSummaryCard
							clientsData={clientsData}
							index={index}
							clientData={clientData}
						/>
					);
				})}
			</CustomScrollbarContainer>
		</Paper>
	);
}
