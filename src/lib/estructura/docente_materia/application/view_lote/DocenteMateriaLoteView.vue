<script lang="ts" setup>

import {ref,onMounted} from 'vue'; //,type PropType

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';


import type {DocenteMateriaFKReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaFKReturnView';


import type {DocenteMateriaCreateRequest} from '@/lib/estructura/docente_materia/application/util/request/DocenteMateriaCreateRequest';
import type {DocenteMateriaUpdateRequest} from '@/lib/estructura/docente_materia/application/util/request/DocenteMateriaUpdateRequest';

/*FKs*/
import type {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import type {Materia} from '@/lib/estructura/materia/domain/entity/Materia';


let titulo = ref('Docente Materias Lote');

let module = ref("estructura");
let controller = ref("docente_materia_api");


let docente_materias = ref( new Array<DocenteMateria>());
let docente_materia = ref(new DocenteMateria());

let id_new = ref(0);
let docente_materias_eliminar = ref(new Array<DocenteMateria>());

/*FKs*/

let docentesFK = ref(new Array<Docente>());
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

    let docente_materia2:DocenteMateria | undefined  = docente_materias.value.find(docente_materia1 => docente_materia1.id==id);

    Object.assign(docente_materia.value,docente_materia2);

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'block'; 

    accion.value='ACTUALIZAR';
    //console.log('onClickRowTable');
};

const getTodosDatos = async () => {
    docente_materias.value = new Array<DocenteMateria>();

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

    docente_materias.value = data.docente_materias;

	//console.log('getTodosDatosParent');
};

const nuevoPreparar = () => {
	//console.log('nuevoPrepararParent');

    docente_materia.value = new DocenteMateria();
    
	docente_materia.value.id =-1;
	docente_materia.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	docente_materia.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	docente_materia.value.id_docente=-1;
	docente_materia.value.id_materia=-1;
	

    id_new.value--;
    docente_materia.value.id=id_new.value;
    
    accion.value='NUEVO';

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'none'; 
};

const cancelar = () => {
    docente_materia.value = new DocenteMateria();
    //console.log('cancelar');

    accion.value='CANCELAR';

    form_deshabilitado.value=true;

    nuevo_preparar_display.value= 'block';
    actualizar_display.value='none';   
    eliminar_display.value= 'none'; 
};

const actualizar = () => {

    if(accion.value==='NUEVO') {
        docente_materia.value.id=id_new.value;
        docente_materias.value.push(docente_materia.value);

        cancelar();                

    } else if(accion.value==='ACTUALIZAR') {
        //console.log('actualizar');
        
        for(let docente_materia1 of docente_materias.value) {
            if(docente_materia1.id == docente_materia.value.id) {
                Object.assign(docente_materia1,docente_materia.value);
                break;
            }
        }                

        cancelar();
    }

    //console.log('actualizar');
};

const eliminar = () => {	

    let docente_materias2 = docente_materias.value.filter((docente_materia1, index, arr) => { 
        return docente_materia1.id != docente_materia.value.id;
    });

    docente_materias.value = docente_materias2;

    if(docente_materia.value.id>0) {
        docente_materias_eliminar.value.push(docente_materia.value);
    }

    cancelar();
    //console.log('eliminar');
};

const guardar = async () => {	

    let data_json= prepararGuardarCambios_docente_materia();

    let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
    
    let url_controller = FuncionGeneral.GetUrlGlobalController(module.value,controller.value,'guardar_cambios');                                    
    
    let response_json = await fetch(url_controller, request_options);                

    let response_data = await response_json.json();
    
    console.log(response_data);            

    alert('Cambios Guardados');
};

const prepararGuardarCambios_docente_materia = () => {
    let data_json_final = {};
    
    let docente_materias_nuevos = [];
    let docente_materias_nuevos_final = [];

    let docente_materias_actualizars = [];
	let docente_materias_actualizars_final = [];
	
    let ids_docente_materias_eliminars = [];
    
    let updates_columnas =['id_docente','id_materia'];

    docente_materias_nuevos = docente_materias.value.filter((docente_materia1:DocenteMateria, index, arr) => { 
        return docente_materia1.id < 0 ;
    });

    docente_materias_nuevos_final = getDocenteMateriasNuevosFinal(docente_materias_nuevos);

    docente_materias_actualizars = docente_materias.value.filter((docente_materia1, index, arr) => { 
        return docente_materia1.id > 0 ;
    });
	
	docente_materias_actualizars_final = getDocenteMateriasActualizarsFinal(docente_materias_actualizars);
	
    ids_docente_materias_eliminars = getIdsDocenteMateriasEliminars();
    
    
    data_json_final = {
        news_docente_materias : docente_materias_nuevos_final,
        updates_docente_materias : docente_materias_actualizars_final,
        updates_columnas : updates_columnas,
        ids_deletes_docente_materias: ids_docente_materias_eliminars
    };
        
    //console.log(data_json_final);
    
    return data_json_final;
};

const getIdsDocenteMateriasEliminars = () => {
    let ids_docente_materias_eliminars:Array<number> = [];

    for(let docente_materia1 of docente_materias_eliminar.value) {
        ids_docente_materias_eliminars.push(docente_materia1.id);
    }

    return ids_docente_materias_eliminars;
};

const getDocenteMateriasNuevosFinal = (docente_materias_nuevos:Array<DocenteMateria>) => {
    let docente_materias_nuevos_final:Array<DocenteMateriaCreateRequest> = [];
    
    for(let docente_materia1 of docente_materias_nuevos) {

        let docente_materia_nuevo_final:DocenteMateriaCreateRequest = {
			created_at : docente_materia1.created_at,
			updated_at : docente_materia1.updated_at,
			id_docente : docente_materia1.id_docente,
			id_materia : docente_materia1.id_materia,
        };

        docente_materias_nuevos_final.push(docente_materia_nuevo_final);
    }

    return docente_materias_nuevos_final;
};

const getDocenteMateriasActualizarsFinal = (docente_materias_actualizars:Array<DocenteMateria>) => {
    let docente_materias_actualizars_final:Array<DocenteMateriaUpdateRequest> = [];
    
    for(let docente_materia1 of docente_materias_actualizars) {

        let docente_materia_actualizar_final:DocenteMateriaUpdateRequest = {
			id : Number(docente_materia1.id),		
			created_at : docente_materia1.created_at,
			updated_at : docente_materia1.updated_at,
			id_docente : docente_materia1.id_docente,
			id_materia : docente_materia1.id_materia,
        };

        docente_materias_actualizars_final.push(docente_materia_actualizar_final);
    }

    return docente_materias_actualizars_final;

};



/*FKs*/
const getFks = async () => {
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module.value,controller.value,Constantes.RJ_GET_FKS);										
	const data_json = {};
	
	const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
	
	const response_json = await fetch(url_global_controller, request_options);						
	const data:DocenteMateriaFKReturnView = await response_json.json();
	
	
	docentesFK.value = data.docentesFK;
	materiasFK.value = data.materiasFK;			
};


</script>

<template>
<!-- The Modal -->
<div id="divLoteViewGlobal_docente_materia">
	
	<!-- Modal content -->
	<div id="div_docente_materia_form_general" 
		class="form_general">
		
		<h2>
			Docente Materias Lote
		</h2>			
				
		
		<form id="docente_materia_form_general" 
			class="form_general">

			<input type="hidden" id="id" name="id" 
					v-model="docente_materia.id" />
			
			<label id="label_id" name="label_id" for="id">Id</label>				
			<input type="text" id="id" name="id" placeholder="Id"
					v-model="docente_materia.id"  
					:disabled="form_deshabilitado"/>
			
			<label for="created_at">Created At</label>
			<input type="text" id="created_at" name="created_at" placeholder="Created At"
					v-model="docente_materia.created_at" 
					:disabled="form_deshabilitado" />
			
			<label for="updated_at">Updated At</label>
			<input type="text" id="updated_at" name="updated_at" placeholder="Updated At"
					v-model="docente_materia.updated_at" 
					:disabled="form_deshabilitado" />
					
			
			<label for="id_docente"> Docente</label>
			<select id="id_docente" name="id_docente" placeholder=" Docente"
					v-model="docente_materia.id_docente"
					:disabled="form_deshabilitado" >
				<option v-for="docente in docentesFK" :key="docente.id" :value="docente.id">
					{{ docente.nombre }}
				</option>
			</select>	
				
			
			<label for="id_materia"> Materia</label>
			<select id="id_materia" name="id_materia" placeholder=" Materia"
					v-model="docente_materia.id_materia"
					:disabled="form_deshabilitado" >
				<option v-for="materia in materiasFK" :key="materia.id" :value="materia.id">
					{{ materia.codigo }}
				</option>
			</select>	
				
							
		</form>
	</div>
	
	<div id="div_docente_materia_actions_form_general">
		
		<form id="docente_materia_actions_form_general" 
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
	
	<div id="div_docente_materia_tabla_general">					
				
		<table id="docente_materia_tabla_general" class="table_general">
			
			<thead>
				<tr>					
					<th>Id</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th> Docente</th>
					<th> Materia</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="docente_materia1 in docente_materias" :key="docente_materia1.id" @click="onClickRowTable(docente_materia1.id)">						
					<td data-label="Id"> {{ docente_materia1.id }} </td>
					<td data-label="Created At"> {{ docente_materia1.created_at }} </td>
					<td data-label="Updated At"> {{ docente_materia1.updated_at }} </td>
					<td data-label=" Docente"> {{ docente_materia1?.docente?.nombre }} </td>
					<td data-label=" Materia"> {{ docente_materia1?.materia?.codigo }} </td>
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