import { ClientsSummaryColumns } from "@/types/Clients";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const ClientsSummaryTableHead = ({
	columns,
}: {
	columns: ClientsSummaryColumns;
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

export default ClientsSummaryTableHead;
