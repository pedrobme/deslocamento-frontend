export interface Client {
	id: number;
	numeroDocumento: string;
	tipoDocumento: string;
	nome: string;
	logradouro: string;
	numero: string;
	bairro: string;
	cidade: string;
	uf: string;
}

export interface ClientSummary {
	id: number;
	numeroDocumento: string;
	tipoDocumento: string;
	nome: string;
	uf: string;
}

export type ClientWithoutDocuments = Omit<
	Client,
	"tipoDocumento" | "numeroDocumento"
>;

export interface ClientColumn {
	id: "nome" | "uf" | "tipoDocumento" | "numeroDocumento";
	label: string;
	minWidth?: number;
	align?: "right" | "center";
	format?: (value: number) => string;
}

export type ClientsSummaryRows = ClientSummary[];

export type ClientsSummaryColumns = ClientColumn[];
