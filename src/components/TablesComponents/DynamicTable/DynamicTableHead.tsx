import { ClientsSummaryColumns } from "@/types/Clients";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { DriversSummaryColumns } from "@/types/Drivers";
import { VehiclesSummaryColumns } from "@/types/Vehicles";
import { DisplacementsSummaryColumns } from "@/types/Displacements";

const DynamicTableHead = ({
	columns,
}: {
	columns:
		| ClientsSummaryColumns
		| DriversSummaryColumns
		| VehiclesSummaryColumns
		| DisplacementsSummaryColumns;
}) => {
	return (
		<TableHead>
			<TableRow>
				{columns.map((column) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}
						sx={{ fontWeight: 800 }}
					>
						{column.label}
					</TableCell>
				))}
				<TableCell key={"editButton"} align={"center"} sx={{ fontWeight: 800 }}>
					{""}
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default DynamicTableHead;
