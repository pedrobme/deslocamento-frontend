import {
	Client,
	ClientsSummaryColumns,
	ClientsSummaryRows,
} from "@/types/Clients";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody } from "@mui/material";
import HoverBox from "../HoveredBox";
import { DynamicTableBodyProps } from "@/types/Tables";
import {
	Driver,
	DriversSummaryColumns,
	DriversSummaryRows,
} from "@/types/Drivers";
import {
	Vehicle,
	VehiclesSummaryColumns,
	VehiclesSummaryRows,
} from "@/types/Vehicles";
import {
	Displacement,
	DisplacementsSummaryColumns,
	DisplacementsSummaryRows,
	TransformedDisplacement,
} from "@/types/Displacements";

export default function DynamicTableBody<
	T extends Client[] | Driver[] | Vehicle[] | TransformedDisplacement[]
>({
	columns,
	rows,
	data,
	page,
	rowsPerPage,
}: {
	columns:
		| ClientsSummaryColumns
		| DriversSummaryColumns
		| VehiclesSummaryColumns
		| DisplacementsSummaryColumns;
	rows:
		| ClientsSummaryRows
		| DriversSummaryRows
		| VehiclesSummaryRows
		| DisplacementsSummaryRows;
	data: T;
	page: number;
	rowsPerPage: number;
}) {
	return (
		<TableBody>
			{rows
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row, index) => {
					return (
						<TableRow hover role="checkbox" tabIndex={-1} key={index}>
							{columns.map((column) => {
								let value;

								if ("id" in column && column.id in row) {
									value = row[column.id as keyof typeof row];
								} else {
									value = "";
								}

								if (column.id === "inicioDeslocamento") {
									const displacementInitialDateAndTime = new Date(value);
									const toLoadInitialDate =
										displacementInitialDateAndTime.toLocaleDateString("pt-BR");
									const toLoadInitialTime =
										displacementInitialDateAndTime.toLocaleTimeString("pt-BR");

									return (
										<TableCell key={column.id} align={column.align}>
											{column.format && typeof value === "number"
												? column.format(value)
												: `${toLoadInitialDate} às ${toLoadInitialTime}`}
										</TableCell>
									);
								}

								if (column.id === "fimDeslocamento") {
									const displacementFinalDateAndTime = new Date(value);
									const toLoadFinalDate =
										displacementFinalDateAndTime.toLocaleDateString("pt-BR");
									const toLoadFinalTime =
										displacementFinalDateAndTime.toLocaleTimeString("pt-BR");

									return (
										<TableCell key={column.id} align={column.align}>
											{column.format && typeof value === "number"
												? column.format(value)
												: `${toLoadFinalDate} às ${toLoadFinalTime}`}
										</TableCell>
									);
								}

								return (
									<TableCell key={column.id} align={column.align}>
										{column.format && typeof value === "number"
											? column.format(value)
											: value}
									</TableCell>
								);
							})}
							<TableCell key={`editButton ${index}`} align={"center"}>
								<HoverBox data={data} index={index} />
							</TableCell>
						</TableRow>
					);
				})}
		</TableBody>
	);
}
