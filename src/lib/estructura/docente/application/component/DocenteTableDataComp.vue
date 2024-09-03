<script lang="ts" setup>

import {ref, type PropType} from 'vue';
import {useRouter} from 'vue-router';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import {DocenteReturnView} from '@/lib/estructura/docente/application/util/return/DocenteReturnView';

import DocenteTableRowDataComp from '@/lib/estructura/docente/application/component/DocenteTableRowDataComp.vue';

const router = useRouter();

const props = defineProps({
	//------------------ ACCIONES -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	
	//------------------ DATOS ----------------------
	docentes: {type: Array as PropType<Array<Docente>>, default: new Array<Docente>()}
});

const emit = defineEmits([	'getTodosDatosView','anterioresView',
							'siguientesView','nuevoPrepararView',
							'handleAction_ClickTableRowView']);
							
//------------------ GENERAL --------------------
let title = ref('Tabla Datos Docente');

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

const handleAction_ClickTableRowTableView = async (docente1: Docente) => {		
	tipo_accion.value = Constantes.SELECCIONAR;			
	
	emit('handleAction_ClickTableRowView',docente1);
};

</script>

<template>

<div id="divCompGlobalTabladocente">
	
	<div id="div_docente_tabla_general">					
		
		<input type="hidden" id="docente_tabla_general_length" name="docente_tabla_general_length" 
				value="{{= docente_parametro_view.docentes.length }}" />
		
		<table id="docente_tabla_general" 
				class="table_general">
			
			<thead>
				<tr class="">					
					<th style="{{ style_id_column }}">Id</th>
					<th style="display:none;">Created At</th>
					<th style="display:none;">Updated At</th>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Fecha Nacimiento</th>
					<th style="text-align:center;">Anios Experiencia</th>
					<th style="text-align:center;">Nota Evaluacion</th>
				</tr>
			</thead>
			
			<tbody>
			
				<DocenteTableRowDataComp v-for="docente1 in docentes" 
					:module="module"
					:controller="controller"
					:style_id_column="style_id_column"
					:docente1="docente1" 
					@handleAction_ClickTableRowTableView="handleAction_ClickTableRowTableView" >
					
				</DocenteTableRowDataComp>
				
			</tbody>
			
		</table>
	</div>
	
	
	<div id="div_docente_pagination_form_general">
		
		<form id="docente_pagination_form_general" class="pagination_form_general">							
			
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
	
	<div id="div_docente_actions_general">
	
		<form id="docente_actions_general" class="actions_form_general">
			
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
