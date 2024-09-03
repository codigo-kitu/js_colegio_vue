/*FKs*/
import {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';


/*RELACIONES*/


class DocenteMateria {
	
	static DOCENTE_MATERIA = 'docente_materia';
		
	/*---------------- CAMPOS ----------------*/
	id: number;
	created_at: string; /*Date*/
	updated_at: string; /*Date*/
	
	id_docente: number;	
	id_materia: number;	
	
	/*---------------- FKs ----------------*/
	
	docente :Docente | undefined;
	materia :Materia | undefined;
	
	/*---------------- RELACIONES ----------------*/
	
	
	constructor() {
				
		/*-------------- CAMPOS --------------*/
		this.id=0;
		this.created_at = '2001-01-01 01:01:01'; /*new Date();*/
		this.updated_at = '2001-01-01 01:01:01'; /*new Date();*/
		
		this.id_docente=-1;
		this.id_materia=-1;
		
		/*-------------- FKs --------------*/
		
		this.docente = undefined;
		this.materia = undefined;
		
		/*-------------- RELACIONES --------------*/
		
	}
	
	inicializar() {
		/*-------------- FKs --------------*/
		
		this.docente = new Docente();
		this.materia = new Materia();
	}
}

export {DocenteMateria};