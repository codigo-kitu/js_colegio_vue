<script lang="ts" setup>

import {ref} from 'vue'; //,type PropType

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';




import type {AlumnoCreateRequest} from '@/lib/estructura/alumno/application/util/request/AlumnoCreateRequest';
import type {AlumnoUpdateRequest} from '@/lib/estructura/alumno/application/util/request/AlumnoUpdateRequest';

/*FKs*/


let titulo = ref('Alumnos Lote');

let module = ref("estructura");
let controller = ref("alumno_api");


let alumnos = ref( new Array<Alumno>());
let alumno = ref(new Alumno());

let id_new = ref(0);
let alumnos_eliminar = ref(new Array<Alumno>());


let accion = ref('CANCELAR');

let form_deshabilitado = ref(true);
let nuevo_preparar_display = ref('block');
let actualizar_display = ref('none');
let eliminar_display = ref('none');

	
const onClickRowTable = async (id:number) => {

    let alumno2:Alumno | undefined  = alumnos.value.find(alumno1 => alumno1.id==id);

    Object.assign(alumno.value,alumno2);

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'block'; 

    accion.value='ACTUALIZAR';
    //console.log('onClickRowTable');
};

const getTodosDatos = async () => {
    alumnos.value = new Array<Alumno>();

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

    alumnos.value = data.alumnos;

	//console.log('getTodosDatosParent');
};

const nuevoPreparar = () => {
	//console.log('nuevoPrepararParent');

    alumno.value = new Alumno();
    
	alumno.value.id =-1;
	alumno.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	alumno.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	alumno.value.nombre='';
	alumno.value.apellido='';
	alumno.value.fecha_nacimiento=FuncionGeneral.GetLabelDate(new Date());
	

    id_new.value--;
    alumno.value.id=id_new.value;
    
    accion.value='NUEVO';

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'none'; 
};

const cancelar = () => {
    alumno.value = new Alumno();
    //console.log('cancelar');

    accion.value='CANCELAR';

    form_deshabilitado.value=true;

    nuevo_preparar_display.value= 'block';
    actualizar_display.value='none';   
    eliminar_display.value= 'none'; 
};

const actualizar = () => {

    if(accion.value==='NUEVO') {
        alumno.value.id=id_new.value;
        alumnos.value.push(alumno.value);

        cancelar();                

    } else if(accion.value==='ACTUALIZAR') {
        //console.log('actualizar');
        
        for(let alumno1 of alumnos.value) {
            if(alumno1.id == alumno.value.id) {
                Object.assign(alumno1,alumno.value);
                break;
            }
        }                

        cancelar();
    }

    //console.log('actualizar');
};

const eliminar = () => {	

    let alumnos2 = alumnos.value.filter((alumno1, index, arr) => { 
        return alumno1.id != alumno.value.id;
    });

    alumnos.value = alumnos2;

    if(alumno.value.id>0) {
        alumnos_eliminar.value.push(alumno.value);
    }

    cancelar();
    //console.log('eliminar');
};

const guardar = async () => {	

    let data_json= prepararGuardarCambios_alumno();

    let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
    
    let url_controller = FuncionGeneral.GetUrlGlobalController(module.value,controller.value,'guardar_cambios');                                    
    
    let response_json = await fetch(url_controller, request_options);                

    let response_data = await response_json.json();
    
    console.log(response_data);            

    alert('Cambios Guardados');
};

const prepararGuardarCambios_alumno = () => {
    let data_json_final = {};
    
    let alumnos_nuevos = [];
    let alumnos_nuevos_final = [];

    let alumnos_actualizars = [];
	let alumnos_actualizars_final = [];
	
    let ids_alumnos_eliminars = [];
    
    let updates_columnas =['nombre','apellido'];

    alumnos_nuevos = alumnos.value.filter((alumno1:Alumno, index, arr) => { 
        return alumno1.id < 0 ;
    });

    alumnos_nuevos_final = getAlumnosNuevosFinal(alumnos_nuevos);

    alumnos_actualizars = alumnos.value.filter((alumno1, index, arr) => { 
        return alumno1.id > 0 ;
    });
	
	alumnos_actualizars_final = getAlumnosActualizarsFinal(alumnos_actualizars);
	
    ids_alumnos_eliminars = getIdsAlumnosEliminars();
    
    
    data_json_final = {
        news_alumnos : alumnos_nuevos_final,
        updates_alumnos : alumnos_actualizars_final,
        updates_columnas : updates_columnas,
        ids_deletes_alumnos: ids_alumnos_eliminars
    };
        
    //console.log(data_json_final);
    
    return data_json_final;
};

const getIdsAlumnosEliminars = () => {
    let ids_alumnos_eliminars:Array<number> = [];

    for(let alumno1 of alumnos_eliminar.value) {
        ids_alumnos_eliminars.push(alumno1.id);
    }

    return ids_alumnos_eliminars;
};

const getAlumnosNuevosFinal = (alumnos_nuevos:Array<Alumno>) => {
    let alumnos_nuevos_final:Array<AlumnoCreateRequest> = [];
    
    for(let alumno1 of alumnos_nuevos) {

        let alumno_nuevo_final:AlumnoCreateRequest = {
			created_at : alumno1.created_at,
			updated_at : alumno1.updated_at,
			nombre : alumno1.nombre,
			apellido : alumno1.apellido,
			fecha_nacimiento : alumno1.fecha_nacimiento,
        };

        alumnos_nuevos_final.push(alumno_nuevo_final);
    }

    return alumnos_nuevos_final;
};

const getAlumnosActualizarsFinal = (alumnos_actualizars:Array<Alumno>) => {
    let alumnos_actualizars_final:Array<AlumnoUpdateRequest> = [];
    
    for(let alumno1 of alumnos_actualizars) {

        let alumno_actualizar_final:AlumnoUpdateRequest = {
			id : Number(alumno1.id),		
			created_at : alumno1.created_at,
			updated_at : alumno1.updated_at,
			nombre : alumno1.nombre,
			apellido : alumno1.apellido,
			fecha_nacimiento : alumno1.fecha_nacimiento,
        };

        alumnos_actualizars_final.push(alumno_actualizar_final);
    }

    return alumnos_actualizars_final;

};




</script>

<template>
<!-- The Modal -->
<div id="divLoteViewGlobal_alumno">
	
	<!-- Modal content -->
	<div id="div_alumno_form_general" 
		class="form_general">
		
		<h2>
			Alumnos Lote
		</h2>			
				
		
		<form id="alumno_form_general" 
			class="form_general">

			<input type="hidden" id="id" name="id" 
					v-model="alumno.id" />
			
			<label id="label_id" name="label_id" for="id">Id</label>				
			<input type="text" id="id" name="id" placeholder="Id"
					v-model="alumno.id"  
					:disabled="form_deshabilitado"/>
			
			<label for="created_at">Created At</label>
			<input type="text" id="created_at" name="created_at" placeholder="Created At"
					v-model="alumno.created_at" 
					:disabled="form_deshabilitado" />
			
			<label for="updated_at">Updated At</label>
			<input type="text" id="updated_at" name="updated_at" placeholder="Updated At"
					v-model="alumno.updated_at" 
					:disabled="form_deshabilitado" />
					
			
			<label for="nombre">Nombre</label>
			<input  type="text" id="nombre" name="nombre" placeholder="Nombre"
					v-model="alumno.nombre" 
					:disabled="form_deshabilitado" />
			
			<label for="apellido">Apellido</label>
			<input  type="text" id="apellido" name="apellido" placeholder="Apellido"
					v-model="alumno.apellido" 
					:disabled="form_deshabilitado" />
			
			<label for="fecha_nacimiento">Fecha Nacimiento</label>
			<input  type="date" id="fecha_nacimiento" name="fecha_nacimiento" placeholder="Fecha Nacimiento"
					v-model="alumno.fecha_nacimiento" 
					:disabled="form_deshabilitado" />
							
		</form>
	</div>
	
	<div id="div_alumno_actions_form_general">
		
		<form id="alumno_actions_form_general" 
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
	
	<div id="div_alumno_tabla_general">					
				
		<table id="alumno_tabla_general" class="table_general">
			
			<thead>
				<tr>					
					<th>Id</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Fecha Nacimiento</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="alumno1 in alumnos" :key="alumno1.id" @click="onClickRowTable(alumno1.id)">						
					<td data-label="Id"> {{ alumno1.id }} </td>
					<td data-label="Created At"> {{ alumno1.created_at }} </td>
					<td data-label="Updated At"> {{ alumno1.updated_at }} </td>
					<td data-label="Nombre"> {{ alumno1.nombre }} </td>
					<td data-label="Apellido"> {{ alumno1.apellido }} </td>
					<td data-label="Fecha Nacimiento"> {{ alumno1.fecha_nacimiento }} </td>
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