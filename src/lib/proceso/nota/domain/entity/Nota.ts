/*FKs*/
import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import {Docente} from '@/lib/estructura/docente/domain/entity/Docente';


/*RELACIONES*/


class Nota {
	
	static NOTA = 'nota';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_alumno: number;	
	id_materia: number;	
	id_docente: number;	
	nota_prueba: number;	
	nota_trabajo: number;	
	nota_examen: number;	
	nota_final: number;	
	
	/*---------------- FKs ----------------*/
	
	alumno :Alumno | undefined;
	materia :Materia | undefined;
	docente :Docente | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.id_alumno=-1;
		this.id_materia=-1;
		this.id_docente=-1;
		this.nota_prueba=0.0;
		this.nota_trabajo=0.0;
		this.nota_examen=0.0;
		this.nota_final=0.0;
		
		/*-------------- FKs --------------*/
		
		this.alumno = undefined;
		this.materia = undefined;
		this.docente = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
	
	inicializar() {
		/*-------------- FKs --------------*/
		
		this.alumno = new Alumno();
		this.materia = new Materia();
		this.docente = new Docente();
	}
}

export {Nota};