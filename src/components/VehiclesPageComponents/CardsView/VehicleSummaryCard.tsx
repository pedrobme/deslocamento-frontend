import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Vehicle } from "@/types/Vehicles";
import HoverBox from "../../TablesComponents/HoveredBox";

export default function VehicleSummaryCard({
	vehiclesData,
	index,
	vehicleData,
}: {
	vehiclesData: Vehicle[];
	index: number;
	vehicleData: Vehicle;
}) {
	return (
		<Card sx={{ wordBreak: "break-word", width: "270px", margin: "15px" }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
					color="text.secondary"
					gutterBottom
				>
					Veículo
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Marca/Modelo: {vehicleData?.marcaModelo}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Placa: {vehicleData?.placa}
				</Typography>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CardActions>
					<HoverBox data={vehiclesData} index={index} />
				</CardActions>
			</Box>
		</Card>
	);
}
