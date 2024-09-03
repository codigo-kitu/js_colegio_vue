/*FKs*/
import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';


/*RELACIONES*/


class Pension {
	
	static PENSION = 'pension';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_alumno: number;	
	anio: number;	
	mes: number;	
	valor: number;	
	cobrado: boolean;	
	
	/*---------------- FKs ----------------*/
	
	alumno :Alumno | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.id_alumno=-1;
		this.anio=0;
		this.mes=0;
		this.valor=0.0;
		this.cobrado=false;
		
		/*-------------- FKs --------------*/
		
		this.alumno = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
	
	inicializar() {
		/*-------------- FKs --------------*/
		
		this.alumno = new Alumno();
	}
}

export {Pension};