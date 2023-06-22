export interface Driver {
	id: number;
	nome: string;
	numeroHabilitacao: string;
	catergoriaHabilitacao: string;
	categoriaHabilitacao?: string;
	vencimentoHabilitacao: string;
}

export interface DriverSummary {
	nome: string;
	catergoriaHabilitacao: string;
}

export interface DriverEditObject {
	id: number;
	catergoriaHabilitacao: string;
	vencimentoHabilitacao: string;
}

export interface DriverColumn {
	id: "nome" | "catergoriaHabilitacao";
	label: string;
	minWidth?: number;
	align?: "right" | "center";
	format?: (value: number) => string;
}

export type DriversSummaryRows = DriverSummary[];

export type DriversSummaryColumns = DriverColumn[];
