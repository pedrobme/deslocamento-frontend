import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import { CustomScrollbarContainer } from "../TableContainerWithCustomScrollbar";
import { Client } from "@/types/Clients";
import DynamicTableHead from "./DynamicTableHead";
import { DynamicSummaryTableProps } from "@/types/Tables";
import DynamicTableBody from "./DynamicTableBody";
import { Driver } from "@/types/Drivers";
import { Vehicle } from "@/types/Vehicles";
import { Displacement } from "@/types/Displacements";

export default function DynamicSummaryTable<
	T extends Client[] | Driver[] | Vehicle[] | Displacement[]
>({ columns, rows, data }: DynamicSummaryTableProps<T>) {
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
					<DynamicTableHead columns={columns} />
					<DynamicTableBody
						columns={columns}
						rows={rows}
						data={data}
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
