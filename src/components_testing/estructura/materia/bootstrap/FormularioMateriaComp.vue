<template>
<!-- The Modal -->
<div id="divModal_materia_form_general" 
		class="modal_form_general"
		:style="{ display:display }">
	
	<!-- Modal content -->
	<div id="divModalContent_materia_form_general" 
		class="modal_form_general_content">
		
		<div class="modal_form_general_header">
			
			<span id="spanCloseModal_materia_form_general"
					class="close_modal_form_general" 
					@click="cerrarModalFormGeneral">
				&times;
			</span>
			<h2>
				Materia
			</h2>
			
		</div>
		
		<div class="modal_form_general_body">
		
			<div id="div_materia_form_general">
			
				<form id="materia_form_general">

					<div class="row">
					<div class="col-6 offset-3">
					<input type="hidden" id="id" name="id" 
							v-model="materia.id" />
					</div>
					</div>

					<div class="row">
					<div class="col-3 offset-3">
					<label id="label_id" name="label_id" for="text_id_aux" class="form-label"
							style="{{ style_id_column }}">Id</label>				
					</div>
					<div class="col-3">
					<input type="text" id="text_id_aux" name="text_id_aux" 
							class="form-control" style="{{ style_id_column }}"
							v-model="text_id_aux" placeholder="Id" readonly/>
					</div>
					</div>

					<div class="row">
					<div class="col-3 offset-3">
					<label for="created_at" class="form-label" style="display:none;">Created At</label>
					</div>
					<div class="col-3">
					<input type="text" id="created_at" name="created_at" style="display:none;" 
							class="form-control" placeholder="Created At"
							v-model="materia.created_at" />
					</div>
					</div>

					<div class="row">
					<div class="col-3 offset-3">
					<label for="updated_at" class="form-label" style="display:none;">Updated At</label>
					</div>
					<div class="col-3">
					<input type="text" id="updated_at" name="updated_at" style="display:none;"
							class="form-control" placeholder="Updated At"
							v-model="materia.updated_at" />
					</div>
					</div>

					<div class="row">
					<div class="col-3 offset-3">
					<label for="codigo" class="form-label">Codigo</label>
					</div>
					<div class="col-3">
					<input  type="text" 
							id="codigo" name="codigo"
							class="form-control" placeholder="Codigo"
							v-model="materia.codigo" />
					</div>
					</div>

					<div class="row">
					<div class="col-3 offset-3">
					<label for="nombre" class="form-label">Nombre</label>
					</div>
					<div class="col-3">
					<input  type="text" 
							id="nombre" name="nombre"
							class="form-control" placeholder="Nombre"
							v-model="materia.nombre" />
					</div>
					</div>

					<div class="row">
					<div class="col-3 offset-3">
					<label for="activo" class="form-label">Activo</label>
					</div>
					<div class="col-3">
					<input  type="checkbox" 
							id="activo" name="activo" 
							value="true"
							class="form-check-input"
							v-model="materia.activo" />
					</div>
					</div>		
				</form>
				
			</div>
			
			<div id="div_materia_actions_form_general">
				
				<form id="materia_actions_form_general" 
					class="row">				
					
					<div class="col-2 offset-3">
					<button type="button" id="actualizar_button" name="actualizar_button" 
							class="btn btn-primary" value="Actualizar" 
							@click="actualizar">
						<fai icon="fa-solid fa-save" />
						Actualizar
					</button>
					</div>

					<div class="col-2">
					<button type="button" id="eliminar_button" name="eliminar_button" 
							class="btn btn-primary" value="Eliminar" 
							@click="eliminar">
						<fai icon="fa-solid fa-times-circle" />
						Eliminar
					</button>
					</div>

					<div class="col-2">
					<button type="button" id="cancelar_button" name="cancelar_button" 
							class="btn btn-primary" value="Cancelar"
							@click="cancelar">
						<fai icon="fa-solid fa-minus-circle" />
						Cancelar
					</button>
					</div>
					
				</form>
				
			</div>
			
		</div>
		
	</div>
	
</div>

</template>


<script lang="ts">

import {defineComponent,type PropType} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Materia} from "@/lib/estructura/materia/domain/entity/Materia";
import type {MateriaReturnView} from "@/lib/estructura/materia/application/util/dto/MateriaReturnView";


import type {MateriaParamCreate} from "@/lib/estructura/materia/application/util/type/MateriaParamCreate";
import type {MateriaParamUpdate} from "@/lib/estructura/materia/application/util/type/MateriaParamUpdate";

/*FKs*/


export default defineComponent({
	
	name: "FormularioMateriaComp",
	
	props: {
		//------------------ ACCIONES -------------------
		module:{type: String, default: ''},
		controller:{type: String, default: ''},
		//------------------ DATOS ----------------------
		materias: {type: Array as PropType<Array<Materia>>, default: new Array<Materia>()},
		materia_prop: {type: Materia, default: new Materia()}
	},
	
	data() {
		
		return {			
			//------------------ GENERAL --------------------
			title : 'Formulario Materia',
			//------------------ ACCIONES -------------------
			tipo_accion : Constantes.CANCELAR,
			//------------------ ESTILOS -------------------
			display : 'none',
			style_id_column : '',
			//------------------ DATOS ----------------------
			/*id : -1,*/
			text_id_aux : '-1',
			
			materia : new Materia(),
			
			
			aux : "aux"
		}
	},

    methods : {
		
		home : function() {
			this.$router.push("/main");
		},		
		nuevoPreparar : function() {			
			this.tipo_accion=Constantes.NUEVO;	
			this.abrirModalFormGeneral();	
			this.$emit("ocultarMensajeAlertaParent");
			//this.ocultarMensajeAlerta();
			
			/*this.id = -1;*/
			this.text_id_aux = '-1';
			
			
			this.materia.id =-1;
			this.materia.created_at=FuncionGeneral.GetLabelDateTime(new Date());
			this.materia.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
			this.materia.codigo="";
			this.materia.nombre="";
			this.materia.activo=false;
		},		
		cancelar : function() {			
			this.tipo_accion=Constantes.CANCELAR;			
			this.cerrarModalFormGeneral();
		},						
		abrirModalFormGeneral : function() {
			this.display = "block";
		},		
		cerrarModalFormGeneral : function() {
			this.display = "none";
		},						
		showConfirm : function(mensaje:string) {
			return window.confirm(mensaje);
		},		
		handleAction_ClickRowTable : function(materia1:Materia) {
			//this.ocultarMensajeAlerta();			
			this.tipo_accion = Constantes.SELECCIONAR;			
			this.abrirModalFormGeneral();
			
			if(Constantes.IS_DEVELOPING == true) {
				this.text_id_aux = materia1.id.toString();
			}
						
			this.materia.id = materia1.id;
			this.materia.created_at = materia1.created_at;
			
			this.materia.updated_at = materia1.updated_at;
			this.materia.codigo = materia1.codigo;
			this.materia.nombre = materia1.nombre;
			this.materia.activo = Boolean(materia1.activo);	
		},		
		actualizar : function() {		
			if(this.tipo_accion == Constantes.NUEVO) {
				this.nuevoDatos();				
			} else if(this.tipo_accion == Constantes.SELECCIONAR) {
				this.actualizarDatos();			
			} else if(this.tipo_accion == Constantes.ELIMINAR) {
				this.eliminarDatos();
			}
		},		
		eliminar : function() {			
			this.tipo_accion = Constantes.ELIMINAR;
			
			if (this.showConfirm(Constantes.MENSAJE_ELIMINAR_SINO)) {
				this.actualizar();
			}
		},						
		nuevoDatos : async function() {		
			//this.mostrarLoader();			
			let url_global_controller = FuncionGeneral.GetUrlGlobalController(this.module,this.controller,Constantes.NUEVO);
						
			var form_json:MateriaParamCreate = {
				created_at : this.materia.created_at,
				updated_at : this.materia.updated_at,
				codigo : this.materia.codigo,
				nombre : this.materia.nombre,
				activo : this.materia.activo,
			};
			
			var data_json = { 
				materia: form_json
			};
			
			
			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);
									
			const response_json = await fetch(url_global_controller,request_options);
			
			const data:MateriaReturnView = await response_json.json();
			
			this.$emit('handleAction_NuevoDatos_Parent',data);
		},		
		actualizarDatos : async function() {			
			//this.mostrarLoader();			
			this.tipo_accion = Constantes.SELECCIONAR;
			let url_global_controller = FuncionGeneral.GetUrlGlobalController(this.module,this.controller,Constantes.ACTUALIZAR);
				
			var form_json:MateriaParamUpdate = {
				id : this.materia.id,
				created_at : this.materia.created_at,
				updated_at : this.materia.updated_at,
				codigo : this.materia.codigo,
				nombre : this.materia.nombre,
				activo : this.materia.activo,
			};
			
			var data_json = { 
				materia: form_json
			};
			
			const request_options = FuncionGeneral.GetRequestOptions('PUT',data_json);									
			
			const response_json = await fetch(url_global_controller,request_options);
			
			const data:MateriaReturnView = await response_json.json();
			
			this.$emit('handleAction_ActualizarDatos_Parent',data);
		},		
		eliminarDatos : async function(){		
			//this.mostrarLoader();			
			let url_global_controller = FuncionGeneral.GetUrlGlobalController(this.module,this.controller,Constantes.ELIMINAR);
			/*let id = this.materia.id;*/
			
			var id_json = { 
				id : this.materia.id 
			};			
			
			const request_options = FuncionGeneral.GetRequestOptions('DELETE',id_json);
			
			const response_json = await fetch(url_global_controller,request_options);			
			const data_json:MateriaReturnView = await response_json.json();
			
			this.$emit('handleAction_EliminarDatos_Parent',data_json);
		}
	}
	
})

</script>


<style lang="scss" scoped>

/*------------------ FORM MODAL GENERAL ----------------------*/
@import "@/scss/components/form/modal_form_general";


</style>