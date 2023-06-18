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
