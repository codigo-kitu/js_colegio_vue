<script lang="ts" setup>

import {ref,onMounted} from 'vue'; //,type PropType

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';


import type {AlumnoMateriaFKReturnView} from '@/lib/estructura/alumno_materia/application/util/return/AlumnoMateriaFKReturnView';


import type {AlumnoMateriaCreateRequest} from '@/lib/estructura/alumno_materia/application/util/request/AlumnoMateriaCreateRequest';
import type {AlumnoMateriaUpdateRequest} from '@/lib/estructura/alumno_materia/application/util/request/AlumnoMateriaUpdateRequest';

/*FKs*/
import type {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import type {Materia} from '@/lib/estructura/materia/domain/entity/Materia';


let titulo = ref('Alumno Materias Lote');

let module = ref("estructura");
let controller = ref("alumno_materia_api");


let alumno_materias = ref( new Array<AlumnoMateria>());
let alumno_materia = ref(new AlumnoMateria());

let id_new = ref(0);
let alumno_materias_eliminar = ref(new Array<AlumnoMateria>());

/*FKs*/

let alumnosFK = ref(new Array<Alumno>());
let materiasFK = ref(new Array<Materia>());

let accion = ref('CANCELAR');

let form_deshabilitado = ref(true);
let nuevo_preparar_display = ref('block');
let actualizar_display = ref('none');
let eliminar_display = ref('none');

onMounted(() => {
	/*FKs*/
	getFks();		
});
	
const onClickRowTable = async (id:number) => {

    let alumno_materia2:AlumnoMateria | undefined  = alumno_materias.value.find(alumno_materia1 => alumno_materia1.id==id);

    Object.assign(alumno_materia.value,alumno_materia2);

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'block'; 

    accion.value='ACTUALIZAR';
    //console.log('onClickRowTable');
};

const getTodosDatos = async () => {
    alumno_materias.value = new Array<AlumnoMateria>();

    let data_json = {
        pagination: {
            skip: 0,
            limit: 25
        }
    };
    
    let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
    
    let url_controller = FuncionGeneral.GetUrlGlobalController(module.value,controller.value,Constantes.RJ_TODOS);
                
    const response_json = await fetch(url_controller, request_options);

    const data = await response_json.json();

    console.log(data);

    alumno_materias.value = data.alumno_materias;

	//console.log('getTodosDatosParent');
};

const nuevoPreparar = () => {
	//console.log('nuevoPrepararParent');

    alumno_materia.value = new AlumnoMateria();
    
	alumno_materia.value.id =-1;
	alumno_materia.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	alumno_materia.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	alumno_materia.value.id_alumno=-1;
	alumno_materia.value.id_materia=-1;
	

    id_new.value--;
    alumno_materia.value.id=id_new.value;
    
    accion.value='NUEVO';

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'none'; 
};

const cancelar = () => {
    alumno_materia.value = new AlumnoMateria();
    //console.log('cancelar');

    accion.value='CANCELAR';

    form_deshabilitado.value=true;

    nuevo_preparar_display.value= 'block';
    actualizar_display.value='none';   
    eliminar_display.value= 'none'; 
};

const actualizar = () => {

    if(accion.value==='NUEVO') {
        alumno_materia.value.id=id_new.value;
        alumno_materias.value.push(alumno_materia.value);

        cancelar();                

    } else if(accion.value==='ACTUALIZAR') {
        //console.log('actualizar');
        
        for(let alumno_materia1 of alumno_materias.value) {
            if(alumno_materia1.id == alumno_materia.value.id) {
                Object.assign(alumno_materia1,alumno_materia.value);
                break;
            }
        }                

        cancelar();
    }

    //console.log('actualizar');
};

const eliminar = () => {	

    let alumno_materias2 = alumno_materias.value.filter((alumno_materia1, index, arr) => { 
        return alumno_materia1.id != alumno_materia.value.id;
    });

    alumno_materias.value = alumno_materias2;

    if(alumno_materia.value.id>0) {
        alumno_materias_eliminar.value.push(alumno_materia.value);
    }

    cancelar();
    //console.log('eliminar');
};

const guardar = async () => {	

    let data_json= prepararGuardarCambios_alumno_materia();

    let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
    
    let url_controller = FuncionGeneral.GetUrlGlobalController(module.value,controller.value,'guardar_cambios');                                    
    
    let response_json = await fetch(url_controller, request_options);                

    let response_data = await response_json.json();
    
    console.log(response_data);            

    alert('Cambios Guardados');
};

const prepararGuardarCambios_alumno_materia = () => {
    let data_json_final = {};
    
    let alumno_materias_nuevos = [];
    let alumno_materias_nuevos_final = [];

    let alumno_materias_actualizars = [];
	let alumno_materias_actualizars_final = [];
	
    let ids_alumno_materias_eliminars = [];
    
    let updates_columnas =['id_alumno','id_materia'];

    alumno_materias_nuevos = alumno_materias.value.filter((alumno_materia1:AlumnoMateria, index, arr) => { 
        return alumno_materia1.id < 0 ;
    });

    alumno_materias_nuevos_final = getAlumnoMateriasNuevosFinal(alumno_materias_nuevos);

    alumno_materias_actualizars = alumno_materias.value.filter((alumno_materia1, index, arr) => { 
        return alumno_materia1.id > 0 ;
    });
	
	alumno_materias_actualizars_final = getAlumnoMateriasActualizarsFinal(alumno_materias_actualizars);
	
    ids_alumno_materias_eliminars = getIdsAlumnoMateriasEliminars();
    
    
    data_json_final = {
        news_alumno_materias : alumno_materias_nuevos_final,
        updates_alumno_materias : alumno_materias_actualizars_final,
        updates_columnas : updates_columnas,
        ids_deletes_alumno_materias: ids_alumno_materias_eliminars
    };
        
    //console.log(data_json_final);
    
    return data_json_final;
};

const getIdsAlumnoMateriasEliminars = () => {
    let ids_alumno_materias_eliminars:Array<number> = [];

    for(let alumno_materia1 of alumno_materias_eliminar.value) {
        ids_alumno_materias_eliminars.push(alumno_materia1.id);
    }

    return ids_alumno_materias_eliminars;
};

const getAlumnoMateriasNuevosFinal = (alumno_materias_nuevos:Array<AlumnoMateria>) => {
    let alumno_materias_nuevos_final:Array<AlumnoMateriaCreateRequest> = [];
    
    for(let alumno_materia1 of alumno_materias_nuevos) {

        let alumno_materia_nuevo_final:AlumnoMateriaCreateRequest = {
			created_at : alumno_materia1.created_at,
			updated_at : alumno_materia1.updated_at,
			id_alumno : alumno_materia1.id_alumno,
			id_materia : alumno_materia1.id_materia,
        };

        alumno_materias_nuevos_final.push(alumno_materia_nuevo_final);
    }

    return alumno_materias_nuevos_final;
};

const getAlumnoMateriasActualizarsFinal = (alumno_materias_actualizars:Array<AlumnoMateria>) => {
    let alumno_materias_actualizars_final:Array<AlumnoMateriaUpdateRequest> = [];
    
    for(let alumno_materia1 of alumno_materias_actualizars) {

        let alumno_materia_actualizar_final:AlumnoMateriaUpdateRequest = {
			id : Number(alumno_materia1.id),		
			created_at : alumno_materia1.created_at,
			updated_at : alumno_materia1.updated_at,
			id_alumno : alumno_materia1.id_alumno,
			id_materia : alumno_materia1.id_materia,
        };

        alumno_materias_actualizars_final.push(alumno_materia_actualizar_final);
    }

    return alumno_materias_actualizars_final;

};



/*FKs*/
const getFks = async () => {
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module.value,controller.value,Constantes.RJ_GET_FKS);										
	const data_json = {};
	
	const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
	
	const response_json = await fetch(url_global_controller, request_options);						
	const data:AlumnoMateriaFKReturnView = await response_json.json();
	
	
	alumnosFK.value = data.alumnosFK;
	materiasFK.value = data.materiasFK;			
};


</script>

<template>
<!-- The Modal -->
<div id="divLoteViewGlobal_alumno_materia">
	
	<!-- Modal content -->
	<div id="div_alumno_materia_form_general" 
		class="form_general">
		
		<h2>
			Alumno Materias Lote
		</h2>			
				
		
		<form id="alumno_materia_form_general" 
			class="form_general">

			<input type="hidden" id="id" name="id" 
					v-model="alumno_materia.id" />
			
			<label id="label_id" name="label_id" for="id">Id</label>				
			<input type="text" id="id" name="id" placeholder="Id"
					v-model="alumno_materia.id"  
					:disabled="form_deshabilitado"/>
			
			<label for="created_at">Created At</label>
			<input type="text" id="created_at" name="created_at" placeholder="Created At"
					v-model="alumno_materia.created_at" 
					:disabled="form_deshabilitado" />
			
			<label for="updated_at">Updated At</label>
			<input type="text" id="updated_at" name="updated_at" placeholder="Updated At"
					v-model="alumno_materia.updated_at" 
					:disabled="form_deshabilitado" />
					
			
			<label for="id_alumno"> Alumno</label>
			<select id="id_alumno" name="id_alumno" placeholder=" Alumno"
					v-model="alumno_materia.id_alumno"
					:disabled="form_deshabilitado" >
				<option v-for="alumno in alumnosFK" :key="alumno.id" :value="alumno.id">
					{{ alumno.nombre }}
				</option>
			</select>	
				
			
			<label for="id_materia"> Materia</label>
			<select id="id_materia" name="id_materia" placeholder=" Materia"
					v-model="alumno_materia.id_materia"
					:disabled="form_deshabilitado" >
				<option v-for="materia in materiasFK" :key="materia.id" :value="materia.id">
					{{ materia.codigo }}
				</option>
			</select>	
				
							
		</form>
	</div>
	
	<div id="div_alumno_materia_actions_form_general">
		
		<form id="alumno_materia_actions_form_general" 
			class="actions_form_general">				
			
			<button type="button" id="recargar_button" name="recargar_button" 
					value="Recargar" class="button_general" 
					@click="getTodosDatos">
				<fai icon="fa-solid fa-sync" />
				Recargar
			</button>
			
			<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
					value="Nuevo" class="button_general" 
					@click="nuevoPreparar"
					:style="{display:nuevo_preparar_display}">
				<fai icon="fa-solid fa-plus-circle" />
				Nuevo
			</button>
			
			<button type="button" id="actualizar_button" name="actualizar_button" 
					class="button_general" value="Actualizar" 
					@click="actualizar"
					:style="{display:actualizar_display}">
				<fai icon="fa-solid fa-save" />
				Actualizar
			</button>
			
			<button type="button" id="eliminar_button" name="eliminar_button" 
					class="button_general" value="Eliminar" 
					@click="eliminar"
					:style="{display:eliminar_display}">
				<fai icon="fa-solid fa-times-circle" />
				Eliminar
			</button>
			
			<button type="button" id="cancelar_button" name="cancelar_button" 
					class="button_general" value="Cancelar"
					@click="cancelar">
				<fai icon="fa-solid fa-minus-circle" />
				Cancelar
			</button>
			
			<button type="button" id="guardar_button" name="guardar_button" 
					class="button_general" value="Guardar"
					@click="guardar">
				<fai icon="fa-solid fa-minus-circle" />
				Guardar
			</button>
			
		</form>
		
	</div>
	
	<div id="div_alumno_materia_tabla_general">					
				
		<table id="alumno_materia_tabla_general" class="table_general">
			
			<thead>
				<tr>					
					<th>Id</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th> Alumno</th>
					<th> Materia</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="alumno_materia1 in alumno_materias" :key="alumno_materia1.id" @click="onClickRowTable(alumno_materia1.id)">						
					<td data-label="Id"> {{ alumno_materia1.id }} </td>
					<td data-label="Created At"> {{ alumno_materia1.created_at }} </td>
					<td data-label="Updated At"> {{ alumno_materia1.updated_at }} </td>
					<td data-label=" Alumno"> {{ alumno_materia1?.alumno?.nombre }} </td>
					<td data-label=" Materia"> {{ alumno_materia1?.materia?.codigo }} </td>
				</tr>						
			</tbody>
			
		</table>
	</div>
	
</div>

</template>

<style lang="scss" scoped>

/*------------------ TITLE GENERAL ----------------------*/
@import "@/scss/components/title/titulo_general";


/*----------------------------- FORMULARIO ---------------------------------*/

/*------------------ BUTTON GENERAL ----------------------*/
@import "@/scss/components/button/button_general";
/*------------------ FORM GENERAL ----------------------*/
@import "@/scss/components/form/form_general";
/*------------------ FORM ACTIONS GENERAL ----------------------*/
@import "@/scss/components/form/actions_form_general";
/*------------------ FORM MODAL GENERAL ----------------------*/
@import "@/scss/components/form/modal_form_general";


/*------------------ RESPONSIVE FORM GENERAL ----------------------*/
@import "@/scss/responsive/form/form_general_responsive";
/*------------------ RESPONSIVE ACTIONS GENERAL ----------------------*/
@import "@/scss/responsive/form/actions_form_general_responsive";


/*----------------------------- TABLA DATOS ---------------------------------*/

/*------------------ TABLE GENERAL ----------------------*/
@import "@/scss/components/table/table_general";
/*------------------ FORM PAGINATION GENERAL ----------------------*/
@import "@/scss/components/form/pagination_form_general";


/*------------------ RESPONSIVE TABLE GENERAL ----------------------*/
@import "@/scss/responsive/table/table_general_responsive";
/*------------------ RESPONSIVE FORM PAGINATION GENERAL ----------------------*/
@import "@/scss/responsive/form/pagination_form_general_responsive";

</style>