<script lang="ts" setup>

import {ref,onMounted} from 'vue'; //,type PropType

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';


import type {NotaFKReturnView} from '@/lib/proceso/nota/application/util/return/NotaFKReturnView';


import type {NotaCreateRequest} from '@/lib/proceso/nota/application/util/request/NotaCreateRequest';
import type {NotaUpdateRequest} from '@/lib/proceso/nota/application/util/request/NotaUpdateRequest';

/*FKs*/
import type {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import type {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import type {Docente} from '@/lib/estructura/docente/domain/entity/Docente';


let titulo = ref('Notas Lote');

let module = ref("proceso");
let controller = ref("nota_api");


let notas = ref( new Array<Nota>());
let nota = ref(new Nota());

let id_new = ref(0);
let notas_eliminar = ref(new Array<Nota>());

/*FKs*/

let alumnosFK = ref(new Array<Alumno>());
let materiasFK = ref(new Array<Materia>());
let docentesFK = ref(new Array<Docente>());

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

    let nota2:Nota | undefined  = notas.value.find(nota1 => nota1.id==id);

    Object.assign(nota.value,nota2);

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'block'; 

    accion.value='ACTUALIZAR';
    //console.log('onClickRowTable');
};

const getTodosDatos = async () => {
    notas.value = new Array<Nota>();

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

    notas.value = data.notas;

	//console.log('getTodosDatosParent');
};

const nuevoPreparar = () => {
	//console.log('nuevoPrepararParent');

    nota.value = new Nota();
    
	nota.value.id =-1;
	nota.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	nota.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	nota.value.id_alumno=-1;
	nota.value.id_materia=-1;
	nota.value.id_docente=-1;
	nota.value.nota_prueba=0.0;
	nota.value.nota_trabajo=0.0;
	nota.value.nota_examen=0.0;
	nota.value.nota_final=0.0;
	

    id_new.value--;
    nota.value.id=id_new.value;
    
    accion.value='NUEVO';

    form_deshabilitado.value=false;

    nuevo_preparar_display.value= 'none';
    actualizar_display.value='block';
    eliminar_display.value= 'none'; 
};

const cancelar = () => {
    nota.value = new Nota();
    //console.log('cancelar');

    accion.value='CANCELAR';

    form_deshabilitado.value=true;

    nuevo_preparar_display.value= 'block';
    actualizar_display.value='none';   
    eliminar_display.value= 'none'; 
};

const actualizar = () => {

    if(accion.value==='NUEVO') {
        nota.value.id=id_new.value;
        notas.value.push(nota.value);

        cancelar();                

    } else if(accion.value==='ACTUALIZAR') {
        //console.log('actualizar');
        
        for(let nota1 of notas.value) {
            if(nota1.id == nota.value.id) {
                Object.assign(nota1,nota.value);
                break;
            }
        }                

        cancelar();
    }

    //console.log('actualizar');
};

const eliminar = () => {	

    let notas2 = notas.value.filter((nota1, index, arr) => { 
        return nota1.id != nota.value.id;
    });

    notas.value = notas2;

    if(nota.value.id>0) {
        notas_eliminar.value.push(nota.value);
    }

    cancelar();
    //console.log('eliminar');
};

const guardar = async () => {	

    let data_json= prepararGuardarCambios_nota();

    let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
    
    let url_controller = FuncionGeneral.GetUrlGlobalController(module.value,controller.value,'guardar_cambios');                                    
    
    let response_json = await fetch(url_controller, request_options);                

    let response_data = await response_json.json();
    
    console.log(response_data);            

    alert('Cambios Guardados');
};

const prepararGuardarCambios_nota = () => {
    let data_json_final = {};
    
    let notas_nuevos = [];
    let notas_nuevos_final = [];

    let notas_actualizars = [];
	let notas_actualizars_final = [];
	
    let ids_notas_eliminars = [];
    
    let updates_columnas =['id_alumno','id_materia'];

    notas_nuevos = notas.value.filter((nota1:Nota, index, arr) => { 
        return nota1.id < 0 ;
    });

    notas_nuevos_final = getNotasNuevosFinal(notas_nuevos);

    notas_actualizars = notas.value.filter((nota1, index, arr) => { 
        return nota1.id > 0 ;
    });
	
	notas_actualizars_final = getNotasActualizarsFinal(notas_actualizars);
	
    ids_notas_eliminars = getIdsNotasEliminars();
    
    
    data_json_final = {
        news_notas : notas_nuevos_final,
        updates_notas : notas_actualizars_final,
        updates_columnas : updates_columnas,
        ids_deletes_notas: ids_notas_eliminars
    };
        
    //console.log(data_json_final);
    
    return data_json_final;
};

const getIdsNotasEliminars = () => {
    let ids_notas_eliminars:Array<number> = [];

    for(let nota1 of notas_eliminar.value) {
        ids_notas_eliminars.push(nota1.id);
    }

    return ids_notas_eliminars;
};

const getNotasNuevosFinal = (notas_nuevos:Array<Nota>) => {
    let notas_nuevos_final:Array<NotaCreateRequest> = [];
    
    for(let nota1 of notas_nuevos) {

        let nota_nuevo_final:NotaCreateRequest = {
			created_at : nota1.created_at,
			updated_at : nota1.updated_at,
			id_alumno : nota1.id_alumno,
			id_materia : nota1.id_materia,
			id_docente : nota1.id_docente,
			nota_prueba : nota1.nota_prueba,
			nota_trabajo : nota1.nota_trabajo,
			nota_examen : nota1.nota_examen,
			nota_final : nota1.nota_final,
        };

        notas_nuevos_final.push(nota_nuevo_final);
    }

    return notas_nuevos_final;
};

const getNotasActualizarsFinal = (notas_actualizars:Array<Nota>) => {
    let notas_actualizars_final:Array<NotaUpdateRequest> = [];
    
    for(let nota1 of notas_actualizars) {

        let nota_actualizar_final:NotaUpdateRequest = {
			id : Number(nota1.id),		
			created_at : nota1.created_at,
			updated_at : nota1.updated_at,
			id_alumno : nota1.id_alumno,
			id_materia : nota1.id_materia,
			id_docente : nota1.id_docente,
			nota_prueba : nota1.nota_prueba,
			nota_trabajo : nota1.nota_trabajo,
			nota_examen : nota1.nota_examen,
			nota_final : nota1.nota_final,
        };

        notas_actualizars_final.push(nota_actualizar_final);
    }

    return notas_actualizars_final;

};



/*FKs*/
const getFks = async () => {
	
	const url_global_controller=FuncionGeneral.GetUrlGlobalController(module.value,controller.value,Constantes.RJ_GET_FKS);										
	const data_json = {};
	
	const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
	
	const response_json = await fetch(url_global_controller, request_options);						
	const data:NotaFKReturnView = await response_json.json();
	
	
	alumnosFK.value = data.alumnosFK;
	materiasFK.value = data.materiasFK;
	docentesFK.value = data.docentesFK;			
};


</script>

<template>
<!-- The Modal -->
<div id="divLoteViewGlobal_nota">
	
	<!-- Modal content -->
	<div id="div_nota_form_general" 
		class="form_general">
		
		<h2>
			Notas Lote
		</h2>			
				
		
		<form id="nota_form_general" 
			class="form_general">

			<input type="hidden" id="id" name="id" 
					v-model="nota.id" />
			
			<label id="label_id" name="label_id" for="id">Id</label>				
			<input type="text" id="id" name="id" placeholder="Id"
					v-model="nota.id"  
					:disabled="form_deshabilitado"/>
			
			<label for="created_at">Created At</label>
			<input type="text" id="created_at" name="created_at" placeholder="Created At"
					v-model="nota.created_at" 
					:disabled="form_deshabilitado" />
			
			<label for="updated_at">Updated At</label>
			<input type="text" id="updated_at" name="updated_at" placeholder="Updated At"
					v-model="nota.updated_at" 
					:disabled="form_deshabilitado" />
					
			
			<label for="id_alumno"> Alumno</label>
			<select id="id_alumno" name="id_alumno" placeholder=" Alumno"
					v-model="nota.id_alumno"
					:disabled="form_deshabilitado" >
				<option v-for="alumno in alumnosFK" :key="alumno.id" :value="alumno.id">
					{{ alumno.nombre }}
				</option>
			</select>	
				
			
			<label for="id_materia"> Materia</label>
			<select id="id_materia" name="id_materia" placeholder=" Materia"
					v-model="nota.id_materia"
					:disabled="form_deshabilitado" >
				<option v-for="materia in materiasFK" :key="materia.id" :value="materia.id">
					{{ materia.codigo }}
				</option>
			</select>	
				
			
			<label for="id_docente"> Docente</label>
			<select id="id_docente" name="id_docente" placeholder=" Docente"
					v-model="nota.id_docente"
					:disabled="form_deshabilitado" >
				<option v-for="docente in docentesFK" :key="docente.id" :value="docente.id">
					{{ docente.nombre }}
				</option>
			</select>	
				
			
			<label for="nota_prueba">Nota Prueba</label>
			<input  type="text" id="nota_prueba" name="nota_prueba" placeholder="Nota Prueba"
					v-model="nota.nota_prueba" 
					:disabled="form_deshabilitado" />
			
			<label for="nota_trabajo">Nota Trabajo</label>
			<input  type="text" id="nota_trabajo" name="nota_trabajo" placeholder="Nota Trabajo"
					v-model="nota.nota_trabajo" 
					:disabled="form_deshabilitado" />
			
			<label for="nota_examen">Nota Examen</label>
			<input  type="text" id="nota_examen" name="nota_examen" placeholder="Nota Examen"
					v-model="nota.nota_examen" 
					:disabled="form_deshabilitado" />
			
			<label for="nota_final">Nota Final</label>
			<input  type="text" id="nota_final" name="nota_final" placeholder="Nota Final"
					v-model="nota.nota_final" 
					:disabled="form_deshabilitado" />
							
		</form>
	</div>
	
	<div id="div_nota_actions_form_general">
		
		<form id="nota_actions_form_general" 
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
	
	<div id="div_nota_tabla_general">					
				
		<table id="nota_tabla_general" class="table_general">
			
			<thead>
				<tr>					
					<th>Id</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th> Alumno</th>
					<th> Materia</th>
					<th> Docente</th>
					<th style="text-align:center;">Nota Prueba</th>
					<th style="text-align:center;">Nota Trabajo</th>
					<th style="text-align:center;">Nota Examen</th>
					<th style="text-align:center;">Nota Final</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="nota1 in notas" :key="nota1.id" @click="onClickRowTable(nota1.id)">						
					<td data-label="Id"> {{ nota1.id }} </td>
					<td data-label="Created At"> {{ nota1.created_at }} </td>
					<td data-label="Updated At"> {{ nota1.updated_at }} </td>
					<td data-label=" Alumno"> {{ nota1?.alumno?.nombre }} </td>
					<td data-label=" Materia"> {{ nota1?.materia?.codigo }} </td>
					<td data-label=" Docente"> {{ nota1?.docente?.nombre }} </td>
					<td data-label="Nota Prueba" style="text-align:center;"> {{ nota1.nota_prueba }} </td>
					<td data-label="Nota Trabajo" style="text-align:center;"> {{ nota1.nota_trabajo }} </td>
					<td data-label="Nota Examen" style="text-align:center;"> {{ nota1.nota_examen }} </td>
					<td data-label="Nota Final" style="text-align:center;"> {{ nota1.nota_final }} </td>
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