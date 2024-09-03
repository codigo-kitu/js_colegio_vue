<script lang="ts" setup>

import {ref} from 'vue';    // ,type PropType

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';


import {Materia} from "@/lib/estructura/materia/domain/entity/Materia";

import type {MateriaParamCreate} from "@/lib/estructura/materia/application/util/type/MateriaParamCreate";
import type {MateriaParamUpdate} from "@/lib/estructura/materia/application/util/type/MateriaParamUpdate";


let titulo = ref('Materias Lote');

let module = ref("estructura");
let controller = ref("materia_api");


let materias = ref(new Array<Materia>());
let materia = ref(new Materia());

let id_new = ref(0);
let materias_eliminar = ref(new Array<Materia>());


let accion = ref('CANCELAR');

let form_deshabilitado = ref(true);
let nuevo_preparar_display = ref('block');
let actualizar_display = ref('none');
let eliminar_display = ref('none');


const onClickRowTable = async (id:number) => {

    let materia2:Materia | undefined  = materias.value.find(materia1 => materia1.id==id);

    Object.assign(materia.value,materia2);

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'block'; 

    accion.value='ACTUALIZAR';
    //console.log('onClickRowTable');
};

const getTodosDatos = async() => {
    materias.value = new Array<Materia>();

    let data_json = {
        pagination: {
            skip: 0,
            limit: 10
        }
    };
    
    let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
    
    let url_controller = FuncionGeneral.GetUrlGlobalController(module.value,controller.value,Constantes.RJ_TODOS);
                
    const response_json = await fetch(url_controller, request_options);

    const data = await response_json.json();

    console.log(data);

    materias.value = data.materias;

    //console.log('getTodosDatosParent');
};

const nuevoPreparar = () => {
    //console.log('nuevoPrepararParent');

    materia.value = new Materia();
    
    materia.value.id =-1;
    materia.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
    materia.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
    materia.value.codigo='';
    materia.value.nombre='';
    materia.value.activo=false;
    

    id_new.value--;
    materia.value.id=id_new.value;
    
    accion.value='NUEVO';

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'none'; 
};


const cancelar = () => {
    materia.value = new Materia();
    //console.log('cancelar');

    accion.value='CANCELAR';

    form_deshabilitado.value=true;

    nuevo_preparar_display.value= 'block';
    actualizar_display.value='none';   
    eliminar_display.value= 'none';         
    
};

const actualizar = () => {

    if(accion.value==='NUEVO') {
        materia.value.id = id_new.value;
        materias.value.push(materia.value);                

        cancelar();                

    } else if(accion.value==='ACTUALIZAR') {
        //console.log('actualizar');
        
        for(let materia1 of materias.value) {
            if(materia1.id == materia.value.id) {
                Object.assign(materia1,materia.value);
                break;
            }
        }                

        cancelar();
    }

    //console.log('actualizar');
};

const eliminar = () => {	

    let materias2 = materias.value.filter((materia1, index, arr) => { 
        return materia1.id != materia.value.id;
    });

    materias.value = materias2;

    if(materia.value.id>0) {
        materias_eliminar.value.push(materia.value);
    }

    cancelar();
    //console.log('eliminar');
};

const guardar = async () => {	

    let data_json= prepararGuardarCambios_materia();

    let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			

    let url_controller = FuncionGeneral.GetUrlGlobalController(module.value,controller.value,'guardar_cambios');                                    

    let response_json = await fetch(url_controller, request_options);                

    let response_data = await response_json.json();

    console.log(response_data);            

    alert('Cambios Guardados');
};

const prepararGuardarCambios_materia = () => {
    let data_json_final = {};
    
    let materias_nuevos = [];
    let materias_nuevos_final = [];

    let materias_actualizars = [];
    let materias_actualizars_final = [];
    
    let ids_materias_eliminars = [];
    
    let updates_columnas =['codigo','nombre'];

    materias_nuevos = materias.value.filter((materia1:Materia, index, arr) => { 
        return materia1.id < 0 ;
    });

    materias_nuevos_final = getMateriasNuevosFinal(materias_nuevos);

    materias_actualizars = materias.value.filter((materia1, index, arr) => { 
        return materia1.id > 0 ;
    });
    
    materias_actualizars_final = getMateriasActualizarsFinal(materias_actualizars);
    
    ids_materias_eliminars = getIdsMateriasEliminars();
    
    
    data_json_final = {
        news_materias : materias_nuevos_final,
        updates_materias : materias_actualizars_final,
        updates_columnas : updates_columnas,
        ids_deletes_materias: ids_materias_eliminars
    };
        
    //console.log(data_json_final);
    
    return data_json_final;
};




const getIdsMateriasEliminars = () => {
    let ids_materias_eliminars:Array<number> = [];

    for(let materia1 of materias_eliminar.value) {
        ids_materias_eliminars.push(materia1.id);
    }

    return ids_materias_eliminars;
};

const getMateriasNuevosFinal = (materias_nuevos:Array<Materia>) => {
    let materias_nuevos_final: Array<MateriaParamCreate> = [];
    
    for(let materia1 of materias_nuevos) {

        let materia_nuevo_final:MateriaParamCreate = {
            created_at : materia1.created_at,
            updated_at : materia1.updated_at,
            codigo : materia1.codigo,
            nombre : materia1.nombre,
            activo : materia1.activo,
        };

        materias_nuevos_final.push(materia_nuevo_final);
    }

    return materias_nuevos_final;
};

const getMateriasActualizarsFinal = (materias_actualizars:Array<Materia>) => {
    let materias_actualizars_final:Array<MateriaParamUpdate> = [];
    
    for(let materia1 of materias_actualizars) {

        let materia_actualizar_final:MateriaParamUpdate = {
            id : materia1.id,
            created_at : materia1.created_at,
            updated_at : materia1.updated_at,
            codigo : materia1.codigo,
            nombre : materia1.nombre,
            activo : materia1.activo,
        };

        materias_actualizars_final.push(materia_actualizar_final);
    }

    return materias_actualizars_final;

};

const GetLabelBoolean = (value:string|boolean) => {
    return FuncionGeneral.GetLabelBoolean(value);
};


</script>

<template>
<!-- The Modal -->
<div id="divLoteViewGlobal_materia">
	
	<!-- Modal content -->
	<div id="div_materia_form_general" 
		class="form_general">
		
		<h2>
			Materias Lote
		</h2>			
				
		
		<form id="materia_form_general" 
			class="form_general">

			<input type="hidden" id="id" name="id" 
					v-model="materia.id" />
			
			<label id="label_id" name="label_id" for="id">Id</label>				
			<input type="text" id="id" name="id" placeholder="Id"
					v-model="materia.id"  
					:disabled="form_deshabilitado"/>
			
			<label for="created_at">Created At</label>
			<input type="text" id="created_at" name="created_at" placeholder="Created At"
					v-model="materia.created_at" 
					:disabled="form_deshabilitado" />
			
			<label for="updated_at">Updated At</label>
			<input type="text" id="updated_at" name="updated_at" placeholder="Updated At"
					v-model="materia.updated_at" 
					:disabled="form_deshabilitado" />
					
			
			<label for="codigo">Codigo</label>
			<input  type="text" id="codigo" name="codigo" placeholder="Codigo"
					v-model="materia.codigo" 
					:disabled="form_deshabilitado" />
			
			<label for="nombre">Nombre</label>
			<input  type="text" id="nombre" name="nombre" placeholder="Nombre"
					v-model="materia.nombre" 
					:disabled="form_deshabilitado" />
			
			<label for="activo">Activo</label>
			<input  type="checkbox" id="activo" name="activo" placeholder="Activo"
					v-model="materia.activo" value="true" 
					:disabled="form_deshabilitado" />
				
							
		</form>
	</div>
	
	<div id="div_materia_actions_form_general">
		
		<form id="materia_actions_form_general" 
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
	
	<div id="div_materia_tabla_general">					
				
		<table id="materia_tabla_general" class="table_general">
			
			<thead>
				<tr>					
					<th>Id</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Codigo</th>
					<th>Nombre</th>
					<th style="text-align:center;">Activo</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="materia1 in materias" :key="materia1.id" @click="onClickRowTable(materia1.id)">						
					<td data-label="Id"> {{ materia1.id }} </td>
					<td data-label="Created At"> {{ materia1.created_at }} </td>
					<td data-label="Updated At"> {{ materia1.updated_at }} </td>
					<td data-label="Codigo"> {{ materia1.codigo }} </td>
					<td data-label="Nombre"> {{ materia1.nombre }} </td>
					<td data-label="Activo" style="text-align:center;"> {{ GetLabelBoolean(materia1.activo) }} </td>
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