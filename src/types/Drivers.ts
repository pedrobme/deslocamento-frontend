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
