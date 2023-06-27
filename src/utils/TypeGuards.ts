import { Client } from "@/types/Clients";
import { Displacement } from "@/types/Displacements";
import { Driver } from "@/types/Drivers";
import { Vehicle } from "@/types/Vehicles";

export function isClient(object: unknown): object is Client {
	return (
		Object.prototype.hasOwnProperty.call(object, "id") &&
		Object.prototype.hasOwnProperty.call(object, "numeroDocumento") &&
		Object.prototype.hasOwnProperty.call(object, "tipoDocumento") &&
		Object.prototype.hasOwnProperty.call(object, "nome") &&
		Object.prototype.hasOwnProperty.call(object, "logradouro") &&
		Object.prototype.hasOwnProperty.call(object, "numero") &&
		Object.prototype.hasOwnProperty.call(object, "bairro") &&
		Object.prototype.hasOwnProperty.call(object, "cidade") &&
		Object.prototype.hasOwnProperty.call(object, "uf")
	);
}

export function isDriver(object: unknown): object is Driver {
	return (
		Object.prototype.hasOwnProperty.call(object, "id") &&
		Object.prototype.hasOwnProperty.call(object, "nome") &&
		Object.prototype.hasOwnProperty.call(object, "numeroHabilitacao") &&
		Object.prototype.hasOwnProperty.call(object, "catergoriaHabilitacao") &&
		Object.prototype.hasOwnProperty.call(object, "vencimentoHabilitacao")
	);
}

export function isVehicle(object: unknown): object is Vehicle {
	return (
		Object.prototype.hasOwnProperty.call(object, "id") &&
		Object.prototype.hasOwnProperty.call(object, "placa") &&
		Object.prototype.hasOwnProperty.call(object, "marcaModelo") &&
		Object.prototype.hasOwnProperty.call(object, "anoFabricacao") &&
		Object.prototype.hasOwnProperty.call(object, "kmAtual")
	);
}

export function isTransformedDisplacement(
	object: unknown
): object is Displacement {
	return (
		Object.prototype.hasOwnProperty.call(object, "id") &&
		Object.prototype.hasOwnProperty.call(object, "kmInicial") &&
		Object.prototype.hasOwnProperty.call(object, "kmFinal") &&
		Object.prototype.hasOwnProperty.call(object, "inicioDeslocamento") &&
		Object.prototype.hasOwnProperty.call(object, "fimDeslocamento") &&
		Object.prototype.hasOwnProperty.call(object, "motivo") &&
		Object.prototype.hasOwnProperty.call(object, "observacao") &&
		Object.prototype.hasOwnProperty.call(object, "nomeCondutor") &&
		Object.prototype.hasOwnProperty.call(object, "marcaModeloVeiculo") &&
		Object.prototype.hasOwnProperty.call(object, "nomeCliente")
	);
}
