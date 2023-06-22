import * as React from "react";
import Paper from "@mui/material/Paper";
import { CustomScrollbarContainer } from "../../TablesComponents/TableContainerWithCustomScrollbar";
import { Driver } from "@/types/Drivers";
import DriversSummaryCard from "./DriverSummaryCard";

export default function ClientsSummaryCardsView({
	driversData,
}: {
	driversData: Driver[];
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
				{driversData.map((driverData, index) => {
					return (
						<DriversSummaryCard
							driversData={driversData}
							index={index}
							driverData={driverData}
						/>
					);
				})}
			</CustomScrollbarContainer>
		</Paper>
	);
}
