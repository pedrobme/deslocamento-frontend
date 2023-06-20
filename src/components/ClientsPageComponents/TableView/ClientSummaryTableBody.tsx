import {
	Client,
	ClientsSummaryColumns,
	ClientsSummaryRows,
} from "@/types/Clients";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody } from "@mui/material";
import HoverBox from "../../TablesComponents/HoveredBox";

const ClientsSummaryTableBody = ({
	columns,
	rows,
	clientsData,
	page,
	rowsPerPage,
}: {
	columns: ClientsSummaryColumns;
	rows: ClientsSummaryRows;
	clientsData: Client[];
	page: number;
	rowsPerPage: number;
}) => {
	return (
		<TableBody>
			{rows
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row, index) => {
					return (
						<TableRow hover role="checkbox" tabIndex={-1} key={index}>
							{columns.map((column) => {
								let value = row[column.id];

								return (
									<TableCell key={column.id} align={column.align}>
										{column.format && typeof value === "number"
											? column.format(value)
											: value}
									</TableCell>
								);
							})}
							<TableCell key={`editButton ${index}`} align={"center"}>
								<HoverBox clientsData={clientsData} index={index} />
							</TableCell>
						</TableRow>
					);
				})}
		</TableBody>
	);
};

export default ClientsSummaryTableBody;
