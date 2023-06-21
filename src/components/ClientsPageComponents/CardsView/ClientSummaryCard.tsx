import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Client } from "@/types/Clients";
import HoverBox from "../../TablesComponents/HoveredBox";

export default function ClientSummaryCard({
	clientsData,
	index,
	clientData,
}: {
	clientsData: Client[];
	index: number;
	clientData: Client;
}) {
	return (
		<Card sx={{ wordBreak: "break-word", width: "270px", margin: "15px" }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
					color="text.secondary"
					gutterBottom
				>
					cliente
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Nome: {clientData?.nome}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Tipo de documento: {clientData?.tipoDocumento}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Número do documento: {clientData?.numeroDocumento}
				</Typography>

				<Typography
					sx={{ fontSize: 14, mb: "10px" }}
					color="text.secondary"
					gutterBottom
				>
					UF: {clientData?.uf}
				</Typography>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CardActions>
					<HoverBox data={clientsData} index={index} />
				</CardActions>
			</Box>
		</Card>
	);
}
