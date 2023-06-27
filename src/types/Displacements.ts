export interface Displacement {
	id: number;
	kmInicial: number;
	kmFinal: number;
	inicioDeslocamento: string;
	fimDeslocamento: string;
	checkList: string;
	motivo: string;
	observacao: string;
	idCondutor: number;
	idVeiculo: number;
	idCliente: number;
}

export interface TransformedDisplacement {
	id: number;
	kmInicial: number;
	kmFinal: number;
	inicioDeslocamento: string;
	fimDeslocamento: string;
	checkList: string;
	motivo: string;
	observacao: string;
	nomeCondutor: string;
	marcaModeloVeiculo: string;
	nomeCliente: string;
}

export interface FinishDisplacementObject {
	id: number;
	kmFinal: number;
	fimDeslocamento: string;
	observacao: string;
}

export interface DisplacementSummary {
	inicioDeslocamento: string;
	fimDeslocamento: string;
	nomeCondutor: string;
	marcaModeloVeiculo: string;
	nomeCliente: string;
}

export interface DisplacementColumn {
	id:
		| "inicioDeslocamento"
		| "fimDeslocamento"
		| "nomeCondutor"
		| "marcaModeloVeiculo"
		| "nomeCliente";
	label: string;
	minWidth?: number;
	align?: "right" | "center";
	format?: (value: number) => string;
}

export type DisplacementsSummaryRows = DisplacementSummary[];

export type DisplacementsSummaryColumns = DisplacementColumn[];
