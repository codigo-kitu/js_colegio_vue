<template>

<div id="div_materia_form_buscar" class="row">
		
		<div class="tabs_general">


		</div>

</div>

</template>


<script lang="ts">

import {defineComponent} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Materia} from "@/lib/estructura/materia/domain/entity/Materia";
import type {MateriaReturnView} from "@/lib/estructura/materia/application/util/dto/MateriaReturnView";

export default defineComponent( {
	
	name: 'BuscarMateriaComp',
	
	props: {
		//------------------ ACCIONES -------------------
		module: {type: String, default: ''},
		controller: {type: String, default: ''},
		tipo_busqueda: {type: String, default: ''}
	},
	
	data() {
		
		return {			
			//------------------ GENERAL --------------------
			title : "Buscar Materia",			
			//------------------ ACCIONES -------------------
			accion_busqueda : "todos",
			pagination1 : new Pagination(),
			//------------------ DATOS ----------------------
			materias: new Array<Materia>()
		}
	},

	watch : {
		
	},

    methods : {
		
		getTodosDatos : async function() { 			
			//this.mostrarLoader();
			this.getPaginationInicializar();
			this.accion_busqueda = "todos";
			await this.procesarTodosDatos();
			//this.ocultarLoader();			
			this.$emit('updateDatosParent',this.materias);
		},		
		getPaginationInicializar : function() {
			this.pagination1 = new Pagination();
			this.pagination1.skip = 0;
			this.pagination1.limit = Constantes.LIMIT;
		},		
		procesarTodosDatos : async function () {

			const url_global_controller=FuncionGeneral.GetUrlGlobalController(this.module,this.controller,Constantes.RJ_TODOS);
				
			const data_json = { 
				pagination : this.pagination1
			}			
			
			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
			
			const response_json = await fetch(url_global_controller, request_options);
			
			const data:MateriaReturnView = await response_json.json();
			this.materias = data.materias;
		},		
		anteriores : async function() {
			if(this.pagination1.skip - this.pagination1.limit < 0) {
				this.pagination1.skip = 0;
			} else {
				this.pagination1.skip = this.pagination1.skip - this.pagination1.limit;
			}
			
			await this.procesarBuscar();
			this.$emit('updateDatosParent',this.materias);
		},		
		siguientes : async function() {	
			if(this.materias != null && this.materias.length > 0) {
				this.pagination1.skip = this.pagination1.skip + this.pagination1.limit;
			}
			
			await this.procesarBuscar();
			this.$emit('updateDatosParent',this.materias);
		},	
		procesarBuscar : async function() {			
			if(this.accion_busqueda == "todos") {
				await this.procesarTodosDatos();
	
			} else if(this.accion_busqueda == "buscar") {
				//await this.getBuscarGeneralDatos();
			}			
		}
		
		
	},
	
	created() {
		this.getTodosDatos();
	}
})

</script>


<style lang="scss" scoped>

</style>