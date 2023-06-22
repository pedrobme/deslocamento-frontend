import * as React from "react";
import Paper from "@mui/material/Paper";
import { CustomScrollbarContainer } from "../../TablesComponents/TableContainerWithCustomScrollbar";
import { Vehicle } from "@/types/Vehicles";
import VehicleSummaryCard from "./VehicleSummaryCard";

export default function VehiclesSummaryCardsView({
	vehiclesData,
}: {
	vehiclesData: Vehicle[];
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
				{vehiclesData.map((vehicleData, index) => {
					return (
						<VehicleSummaryCard
							vehiclesData={vehiclesData}
							index={index}
							vehicleData={vehicleData}
						/>
					);
				})}
			</CustomScrollbarContainer>
		</Paper>
	);
}
