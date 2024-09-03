/*FKs*/
import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';


/*RELACIONES*/


class AlumnoMateria {
	
	static ALUMNO_MATERIA = 'alumno_materia';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_alumno: number;	
	id_materia: number;	
	
	/*---------------- FKs ----------------*/
	
	alumno :Alumno | undefined;
	materia :Materia | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.id_alumno=-1;
		this.id_materia=-1;
		
		/*-------------- FKs --------------*/
		
		this.alumno = undefined;
		this.materia = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
	
	inicializar() {
		/*-------------- FKs --------------*/
		
		this.alumno = new Alumno();
		this.materia = new Materia();
	}
}

export {AlumnoMateria};