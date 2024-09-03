<script lang="ts" setup>

import {ref,type PropType} from 'vue';
import { useRouter } from 'vue-router';	//useRoute

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import type {Materia} from "@/lib/estructura/materia/domain/entity/Materia";
import type {MateriaReturnView} from "@/lib/estructura/materia/application/util/dto/MateriaReturnView";

const router = useRouter();
//const route = useRoute();

const props = defineProps({
	//------------------ ACCIONES -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	
	//------------------ DATOS ----------------------
	materias: {type: Array as PropType<Array<Materia>>, default: new Array<Materia>()}
});

const emit = defineEmits(['getTodosDatosView','anterioresView',
							'siguientesView','nuevoPrepararView',
							'handleAction_ClickTableRowView']);

//------------------ GENERAL --------------------
let title = ref('Tabla Datos Materia');
			
//------------------ ACCIONES -------------------
let tipo_accion = ref(Constantes.CANCELAR);

//------------------ ESTILOS -------------------
let style_id_column = ref('');

const home = () => {
	router.push('/main');
};

const atras = () => {
	window.history.back();
};

const getTodosDatos = () => {
	emit('getTodosDatosView');
};

const anteriores = () => {
	emit('anterioresView');
};

const siguientes = () => {
	emit('siguientesView');
};

const nuevoPreparar = () => {
	emit('nuevoPrepararView');
};

const onClickTableRow = async (id:number) => {		
	tipo_accion.value = Constantes.SELECCIONAR;			
	//abrir_modal_form_general();
	
	let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.SELECCIONAR);

	var id_json = { 
		id : id 
	};			
	
	const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
	
	const response_json = await fetch(url_global_controller,request_options);
	
	const data_json:MateriaReturnView = await response_json.json();
	
	emit('handleAction_ClickTableRowView',data_json.materia1);
};

const GetLabelBoolean = (value:string|boolean) => {
	return FuncionGeneral.GetLabelBoolean(value);
};

</script>

<template>
  
<div id="divCompGlobalTablamateria">
	
	<div id="div_materia_tabla_general">					
		
		<input type="hidden" id="materia_tabla_general_length" name="materia_tabla_general_length" 
				value="{{= materia_parametro_view.materias.length }}" />
		
		<table id="materia_tabla_general" 
				class="table_general">
			
			<thead>
				<tr class="">					
					<th style="{{ style_id_column }}">Id</th>
					<th style="display:none;">Created At</th>
					<th style="display:none;">Updated At</th>
					<th>Codigo</th>
					<th>Nombre</th>
					<th style="text-align:center;">Activo</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="materia1 in props.materias" :key="materia1.id"
					class=""
					@click="onClickTableRow(materia1.id)">						
					<td data-label="Id" style="{{ style_id_column }}"> {{ materia1.id }} </td>
					<td data-label="Created At" style="display:none;"> {{ materia1.created_at }} </td>
					<td data-label="Updated At" style="display:none;"> {{ materia1.updated_at }} </td>
					<td data-label="Codigo"> {{ materia1.codigo }} </td>
					<td data-label="Nombre"> {{ materia1.nombre }} </td>
					<td data-label="Activo" style="text-align:center;"> {{ GetLabelBoolean(materia1.activo) }} </td>
				</tr>						
			</tbody>
			
		</table>
	</div>
	
	
	<div id="div_materia_pagination_form_general">
		
		<form id="materia_pagination_form_general" class="pagination_form_general">							
			
			<button type="button" id="anteriores_button" name="anteriores_button" 
					value="Anteriores" class="button_general" 
					@click="anteriores">
				<fai icon="fa-solid fa-arrow-alt-circle-left" />
				Anteriores
			</button>
			
			<button type="button" id="siguientes_button" name="siguientes_button" 
					value="Siguientes" class="button_general" 
					@click="siguientes">
				<fai icon="fa-solid fa-arrow-alt-circle-right" />
				Siguientes
			</button>
			
		</form>
	</div>
	
	<div id="div_materia_actions_general">
	
		<form id="materia_actions_general" class="actions_form_general">
			
			<button type="button" id="home_button" name="home_button"
					value="Home" class="button_general"
					@click="home">
				<fai icon="fa-solid fa-home" />
				Home
			</button>
			
			<button type="button" id="atras_button" name="atras_button" 
					value="Atras" class="button_general" 
					@click="atras">
				<fai icon="fa-solid fa-arrow-circle-left" />
				Atras
			</button>
			
			<button type="button" id="recargar_button" name="recargar_button" 
					value="Recargar" class="button_general" 
					@click="getTodosDatos">
				<fai icon="fa-solid fa-sync" />
				Recargar
			</button>
			
			<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
					value="Nuevo" class="button_general" 
					@click="nuevoPreparar">
				<fai icon="fa-solid fa-plus-circle" />
				Nuevo
			</button>
			
		</form>
	</div>		
</div>

</template>


<style lang="scss" scoped>

/*------------------ GENERAL (Importado en table_general.scss) ----------------------*/
//@import "@/scss/general";
/*------------------ BUTTON GENERAL ----------------------*/
@import "@/scss/components/button/button_general";
/*------------------ TABLE GENERAL ----------------------*/
@import "@/scss/components/table/table_general";
/*------------------ FORM PAGINATION GENERAL ----------------------*/
@import "@/scss/components/form/pagination_form_general";
/*------------------ FORM ACTIONS GENERAL ----------------------*/
@import "@/scss/components/form/actions_form_general";


/*------------------ RESPONSIVE TABLE GENERAL ----------------------*/
@import "@/scss/responsive/table/table_general_responsive";
/*------------------ RESPONSIVE ACTIONS GENERAL ----------------------*/
@import "@/scss/responsive/form/actions_form_general_responsive";
/*------------------ RESPONSIVE FORM PAGINATION GENERAL ----------------------*/
@import "@/scss/responsive/form/pagination_form_general_responsive";

</style>