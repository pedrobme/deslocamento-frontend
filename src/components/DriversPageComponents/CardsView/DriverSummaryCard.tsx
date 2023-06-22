import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Driver } from "@/types/Drivers";
import HoverBox from "../../TablesComponents/HoveredBox";

export default function DriversSummaryCard({
	driversData,
	index,
	driverData,
}: {
	driversData: Driver[];
	index: number;
	driverData: Driver;
}) {
	return (
		<Card sx={{ wordBreak: "break-word", width: "270px", margin: "15px" }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
					color="text.secondary"
					gutterBottom
				>
					condutor
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Nome: {driverData?.nome}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Categoria da habilitação: {driverData?.catergoriaHabilitacao}
				</Typography>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CardActions>
					<HoverBox data={driversData} index={index} />
				</CardActions>
			</Box>
		</Card>
	);
}
