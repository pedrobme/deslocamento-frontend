import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TransformedDisplacement } from "@/types/Displacements";
import HoverBox from "../../TablesComponents/HoveredBox";

export default function DisplacementSummaryCard({
	displacementsData,
	index,
	displacementData,
}: {
	displacementsData: TransformedDisplacement[];
	index: number;
	displacementData: TransformedDisplacement;
}) {
	const displacementInitialDateAndTime = new Date(
		displacementData.inicioDeslocamento
	);
	const toLoadInitialDate =
		displacementInitialDateAndTime.toLocaleDateString("pt-BR");
	const toLoadInitialTime =
		displacementInitialDateAndTime.toLocaleTimeString("pt-BR");

	const displacementFinalDateAndTime = new Date(
		displacementData.fimDeslocamento
	);
	const toLoadFinalDate =
		displacementFinalDateAndTime.toLocaleDateString("pt-BR");
	const toLoadFinalTime =
		displacementFinalDateAndTime.toLocaleTimeString("pt-BR");

	return (
		<Card sx={{ wordBreak: "break-word", width: "270px", margin: "15px" }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
					color="text.secondary"
					gutterBottom
				>
					Nome do condutor
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Nome do cliente: {displacementData?.nomeCliente}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Inicio: {toLoadInitialDate} às {toLoadInitialTime}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Fim: {toLoadFinalDate} às {toLoadFinalTime}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Nome do condutor : {displacementData?.nomeCondutor}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Marca/modelo do veículo: {displacementData?.marcaModeloVeiculo}
				</Typography>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CardActions>
					<HoverBox data={displacementsData} index={index} />
				</CardActions>
			</Box>
		</Card>
	);
}
