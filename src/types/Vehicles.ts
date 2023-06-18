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
