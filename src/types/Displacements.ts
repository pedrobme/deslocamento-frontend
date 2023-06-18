export interface Displacment {
	id: number;
	kmInicial: string;
	kmFinal: string;
	inicioDeslocamento: string;
	fimDeslocamento: string;
	motivo: string;
	observacao: string;
	idCondutor: number;
	idVeiculo: number;
	idCliente: number;
}

export interface DisplacmentSummary {
	inicioDeslocamento: string;
	fimDeslocamento: string;
	nomeCondutor: number;
	marcaModeloVeiculo: number;
	nomeCliente: number;
}
