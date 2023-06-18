import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import { CustomScrollbarContainer } from "../TablesComponents/TableContainerWithCustomScrollbar";
import ClientsSummaryTableHead from "./ClientsSummaryTableHead";
import {
	Client,
	ClientsSummaryColumns,
	ClientsSummaryRows,
} from "@/types/Clients";
import ClientsSummaryTableBody from "./ClientSummaryTableBody";

export default function ClientsSummaryTable({
	columns,
	rows,
	clientsData,
}: {
	columns: ClientsSummaryColumns;
	rows: ClientsSummaryRows;
	clientsData: Client[];
}) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper elevation={4} sx={{ width: "100%", overflow: "hidden" }}>
			<CustomScrollbarContainer sx={{ minHeight: 440, maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<ClientsSummaryTableHead columns={columns} />
					<ClientsSummaryTableBody
						columns={columns}
						rows={rows}
						clientsData={clientsData}
						page={page}
						rowsPerPage={rowsPerPage}
					/>
				</Table>
			</CustomScrollbarContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
