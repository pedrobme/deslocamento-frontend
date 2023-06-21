export interface Displacement {
	id: number;
	kmInicial: string;
	kmFinal: string;
	inicioDeslocamento: string;
	fimDeslocamento: string;
	motivo: string;
	observacao: string;
	idCondutor: number;
	idVeiculo: number;
	idDisplacemente: number;
}

export interface DisplacementSummary {
	inicioDeslocamento: string;
	fimDeslocamento: string;
	nomeCondutor: number;
	marcaModeloVeiculo: number;
	nomeDisplacemente: number;
}

export interface DisplacementColumn {
	id:
		| "inicioDeslocamento"
		| "fimDeslocamento"
		| "nomeCondutor"
		| "marcaModeloVeiculo"
		| "nomeDisplacemente";
	label: string;
	minWidth?: number;
	align?: "right" | "center";
	format?: (value: number) => string;
}

export type DisplacementsSummaryRows = DisplacementSummary[];

export type DisplacementsSummaryColumns = DisplacementColumn[];
