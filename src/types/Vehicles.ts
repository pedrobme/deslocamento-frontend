export interface Vehicle {
	id: number;
	placa: string;
	marcaModelo: string;
	anoFabricacao: number;
	kmAtual: number;
}

export interface VehicleSummary {
	placa: string;
	marcaModelo: string;
}

export interface VehicleColumn {
	id: "placa" | "marcaModelo";
	label: string;
	minWidth?: number;
	align?: "right" | "center";
	format?: (value: number) => string;
}

export type VehiclesSummaryRows = VehicleSummary[];

export type VehiclesSummaryColumns = VehicleColumn[];
