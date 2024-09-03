type ContratoUpdateRequest = {
	
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/

	/*CAMPOS*/
	anio: number;
	valor: number;
	fecha: string;
	firmado: boolean;
}

export type {ContratoUpdateRequest};