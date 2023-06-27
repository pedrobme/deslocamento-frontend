import * as React from "react";
import Paper from "@mui/material/Paper";
import { CustomScrollbarContainer } from "../../TablesComponents/TableContainerWithCustomScrollbar";
import { TransformedDisplacement } from "@/types/Displacements";
import DisplacementSummaryCard from "./DisplacementSummaryCard";

export default function DisplacementsSummaryCardsView({
	displacementsData,
}: {
	displacementsData: TransformedDisplacement[];
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
				{displacementsData.map((displacementData, index) => {
					return (
						<DisplacementSummaryCard
							displacementsData={displacementsData}
							index={index}
							displacementData={displacementData}
						/>
					);
				})}
			</CustomScrollbarContainer>
		</Paper>
	);
}
