import { Client, ClientsSummaryColumns, ClientsSummaryRows } from "./Clients";
import {
	Displacement,
	DisplacementsSummaryColumns,
	DisplacementsSummaryRows,
} from "./Displacements";
import { Driver, DriversSummaryColumns, DriversSummaryRows } from "./Drivers";
import {
	Vehicle,
	VehiclesSummaryColumns,
	VehiclesSummaryRows,
} from "./Vehicles";

export interface DriverColumn {
	id: "nome";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export interface DisplacementColumn {
	id:
		| "nomeCliente"
		| "nomeCondutor"
		| "marcaModeloVeiculo"
		| "inicioDeslocamento"
		| "fimDeslocamento";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export interface VehicleColumn {
	id: "marcaModelo" | "placa";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export interface WeatherColumn {
	id: "date" | "temperatureC" | "temperatureF" | "summary";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export type DynamicSummaryTableProps<T> = T extends Client[]
	? {
			columns: ClientsSummaryColumns;
			rows: ClientsSummaryRows;
			data: T;
	  }
	: T extends Driver[]
	? {
			columns: DriversSummaryColumns;
			rows: DriversSummaryRows;
			data: T;
	  }
	: T extends Vehicle[]
	? {
			columns: VehiclesSummaryColumns;
			rows: VehiclesSummaryRows;
			data: T;
	  }
	: T extends Displacement[]
	? {
			columns: DisplacementsSummaryColumns;
			rows: DisplacementsSummaryRows;
			data: T;
	  }
	: never;

export type DynamicTableBodyProps<T> = T extends Client[]
	? {
			columns: ClientsSummaryColumns;
			rows: ClientsSummaryRows;
			data: T;
			page: number;
			rowsPerPage: number;
	  }
	: T extends Driver[]
	? {
			columns: DriversSummaryColumns;
			rows: DriversSummaryRows;
			data: T;
			page: number;
			rowsPerPage: number;
	  }
	: T extends Vehicle[]
	? {
			columns: VehiclesSummaryColumns;
			rows: VehiclesSummaryRows;
			data: T;
			page: number;
			rowsPerPage: number;
	  }
	: T extends Displacement[]
	? {
			columns: DisplacementsSummaryColumns;
			rows: DisplacementsSummaryRows;
			data: T;
			page: number;
			rowsPerPage: number;
	  }
	: never;
