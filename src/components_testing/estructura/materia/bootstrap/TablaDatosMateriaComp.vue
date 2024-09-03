<template>
  
<div id="divCompGlobalTablamateria">
	
	<div id="div_materia_tabla_general">					
		
		<input type="hidden" id="materia_tabla_general_length" name="materia_tabla_general_length" 
				value="{{= materia_parametro_view.materias.length }}" />
		
		<table id="materia_tabla_general" 
				class="table table-striped table-hover">
			
			<thead>
				<tr class="table-success">					
					<th style="{{ style_id_column }}">Id</th>
					<th style="display:none;">Created At</th>
					<th style="display:none;">Updated At</th>
					<th>Codigo</th>
					<th>Nombre</th>
					<th style="text-align:center;">Activo</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="materia1 in materias" :key="materia1.id"
					class=""
					@click="onClickRowTable(materia1.id)">						
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
		
		<form id="materia_pagination_form_general" class="row">													

			<div class="col-2 offset-4">
			<button type="button" id="anteriores_button" name="anteriores_button" 
					value="Anteriores" class="btn btn-primary" 
					@click="anterioresChild">
				<fai icon="fa-solid fa-arrow-alt-circle-left" />
				Anteriores
			</button>
			</div>

			<div class="col-2">
			<button type="button" id="siguientes_button" name="siguientes_button" 
					value="Siguientes" class="btn btn-primary" 
					@click="siguientesChild">
				<fai icon="fa-solid fa-arrow-alt-circle-right" />
				Siguientes
			</button>
			</div>
			
		</form>
	</div>
	
	<div id="div_materia_actions_general">
	
		<form id="materia_actions_general" class="row mt-3">
						
			<div class="col-1 offset-4">
			<button type="button" id="home_button" name="home_button"
					value="Home" class="btn btn-primary"
					@click="home">
				<fai icon="fa-solid fa-home" />
				Home
			</button>
			</div>

			<div class="col-1">
			<button type="button" id="atras_button" name="atras_button" 
					value="Atras" class="btn btn-primary" 
					@click="atras">
				<fai icon="fa-solid fa-arrow-circle-left" />
				Atras
			</button>
			</div>

			<div class="col-1">
			<button type="button" id="recargar_button" name="recargar_button" 
					value="Recargar" class="btn btn-primary" 
					@click="getTodosDatosChild">
				<fai icon="fa-solid fa-sync" />
				Recargar
			</button>
			</div>

			<div class="col-1">
			<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
					value="Nuevo" class="btn btn-primary" 
					@click="nuevoPrepararChild">
				<fai icon="fa-solid fa-plus-circle" />
				Nuevo
			</button>
			</div>			

		</form>
	</div>		
</div>

</template>


<script lang="ts">

import {defineComponent,type PropType} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import type {Materia} from "@/lib/estructura/materia/domain/entity/Materia";
import type {MateriaReturnView} from "@/lib/estructura/materia/application/util/dto/MateriaReturnView";

export default defineComponent({
	
	name: 'TablaDatosMateriaComp',
	
	props: {
		//------------------ ACCIONES -------------------
		module: {type: String, default: ''},
		controller: {type: String, default: ''},
		//------------------ DATOS ----------------------
		materias: {type: Array as PropType<Array<Materia>>, default: new Array<Materia>()}
	},
	
	data() {
		
		return {			
			//------------------ GENERAL --------------------
			title : 'Tabla Datos Materia',
			//------------------ ACCIONES -------------------
			tipo_accion : Constantes.CANCELAR,
			//------------------ ESTILOS -------------------
			style_id_column : ''
		}
	},

    methods : {
		
		home : function() {
			this.$router.push('/main');
		},		
		atras : function() {
			window.history.back();
		},		
		getTodosDatosChild : function() {
			this.$emit('getTodosDatosParent');
		},		
		anterioresChild : function() {
			this.$emit('anterioresParent');
		},		
		siguientesChild : function() {
			this.$emit('siguientesParent');
		},		
		nuevoPrepararChild : function() {
			this.$emit('nuevoPrepararParent');
		},		
		onClickRowTable : async function(id:number){		
			this.tipo_accion=Constantes.SELECCIONAR;			
			//this.abrir_modal_form_general();
			
			let url_global_controller = FuncionGeneral.GetUrlGlobalController(this.module,this.controller,Constantes.SELECCIONAR);
	
			var id_json = { 
				id : id 
			};			
			
			const request_options = FuncionGeneral.GetRequestOptions('POST',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);
			
			const data_json:MateriaReturnView = await response_json.json();
			
			this.$emit('handleAction_ClickRowTable_Parent',data_json.materia1);
		},
		GetLabelBoolean : function(value:boolean) {
			return FuncionGeneral.GetLabelBoolean(value);
		}
	}
})

</script>


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