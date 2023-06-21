export interface Driver {
	id: number;
	nome: string;
	numeroHabilitacao: string;
	catergoriaHabilitacao: string;
	vencimentoHabilitacao: string;
}

export interface DriverSummary {
	nome: string;
	summary: string;
}

export interface DriverColumn {
	id: "nome" | "summary";
	label: string;
	minWidth?: number;
	align?: "right" | "center";
	format?: (value: number) => string;
}

export type DriversSummaryRows = DriverSummary[];

export type DriversSummaryColumns = DriverColumn[];
