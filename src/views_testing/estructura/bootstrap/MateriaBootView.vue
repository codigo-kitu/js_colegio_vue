<template>

<div id="divViewGlobalmateria" class="row">

	<div class="col-12">
	<HeaderComp ref="headerComp1"/>
	</div>

	<div class="col-12">
    <h3 class="bg-warning">
		{{ title }}
	</h3>
	</div>

	<div class="col-12">
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    </div>
	
    <BuscarMateriaComp 
				ref="buscarMateriaComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosParent="updateDatos"/>
				
    <TablaDatosMateriaComp 
				:module="module" 
				:controller="controller"
				:materias="materias"
				@getTodosDatosParent="getTodosDatos" 
				@anterioresParent="anteriores" 
				@siguientesParent="siguientes"
				@nuevoPrepararParent="nuevoPreparar"
				@handleAction_ClickRowTable_Parent="handleAction_ClickRowTable"/>
				
    <FormularioMateriaComp 
				ref="formularioMateriaComp1"
				:module="module" 
				:controller="controller"
				:materia_prop="materia"
				:materias="materias"
				@ocultarMensajeAlertaParent="ocultarMensajeAlerta"
				@handleAction_ActualizarDatos_Parent="handleAction_ActualizarDatos"
				@handleAction_NuevoDatos_Parent="handleAction_NuevoDatos"
				@handleAction_EliminarDatos_Parent="handleAction_EliminarDatos"/>
	
	<div id="div_auxiliar"></div>
	
	<FooterComp/>
	
</div>
	
</template>


<script lang="ts">

import {defineComponent} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/ts/general/util/FuncionGeneral';

import {Materia} from "@/lib/estructura/materia/domain/entity/Materia";

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import BuscarMateriaComp from '@/components_testing/estructura/materia/bootstrap/BuscarMateriaComp.vue';
import TablaDatosMateriaComp from '@/components_testing/estructura/materia/bootstrap/TablaDatosMateriaComp.vue';
import FormularioMateriaComp from '@/components_testing/estructura/materia/bootstrap/FormularioMateriaComp.vue';

export default defineComponent({
	
    name: 'MateriaView',

    components: {
		
		//--------------- PAGINA GENERAL ---------------
		HeaderComp,
		FooterComp,
		AlertComp,		
		//--------------- PAGINA TABLA ---------------
        BuscarMateriaComp,
        TablaDatosMateriaComp,
        FormularioMateriaComp
    },
	
	data() {
		
		return {
			
			//------------------ GENERAL --------------------
			title : "Materia",
			//------------------ ACCIONES -------------------
			module : "estructura",
			controller : "materia_api",
			tipo_busqueda : "ninguno",
			//------------------ DATOS ----------------------
			materias : new Array<Materia>(),
			materia : new Materia(),			
			//------------------ MENSAJE ALERT --------------
            tipo_mensaje:"NONE",
            mensaje:"NONE"
		}
	},

    methods : {
		
		updateDatos : function(materias:Array<Materia>) {
			this.materias = materias;
		},		
		getTodosDatos : function() {
			(this.$refs as (typeof HeaderComp)).headerComp1.mostrarLoader();
			(this.$refs as (typeof BuscarMateriaComp)).buscarMateriaComp1.getTodosDatos();
			(this.$refs as (typeof HeaderComp)).headerComp1.ocultarLoader();
		},		
		anteriores : function() {
			(this.$refs as (typeof HeaderComp)).headerComp1.mostrarLoader();
			(this.$refs as (typeof BuscarMateriaComp)).buscarMateriaComp1.anteriores();
			(this.$refs as (typeof HeaderComp)).headerComp1.ocultarLoader();
		},		
		siguientes : function() {
			(this.$refs as (typeof HeaderComp)).headerComp1.mostrarLoader();
			(this.$refs as (typeof BuscarMateriaComp)).buscarMateriaComp1.siguientes();
			(this.$refs as (typeof HeaderComp)).headerComp1.ocultarLoader();
		},		
		ocultarMensajeAlerta : function() {
			this.tipo_mensaje = "NONE";
            this.mensaje = "";
            (this.$refs as (typeof AlertComp)).alertComp1.closeAlertGeneral();
		},		
		nuevoPreparar : function() {
			(this.$refs as (typeof FormularioMateriaComp)).formularioMateriaComp1.nuevoPreparar();
		},				
		handleAction_ClickRowTable : function(materia1: Materia) {
			(this.$refs as (typeof FormularioMateriaComp)).formularioMateriaComp1.handleAction_ClickRowTable(materia1);
		},
		handleAction_NuevoDatos : function() { //data_json
			(this.$refs as (typeof BuscarMateriaComp)).buscarMateriaComp1.getTodosDatos();
			(this.$refs as (typeof FormularioMateriaComp)).formularioMateriaComp1.cerrarModalFormGeneral();
			this.setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
			(this.$refs as (typeof HeaderComp)).headerComp1.ocultarLoader();
		},
		handleAction_ActualizarDatos : function() { //data_json
			(this.$refs as (typeof BuscarMateriaComp)).buscarMateriaComp1.getTodosDatos();
			(this.$refs as (typeof FormularioMateriaComp)).formularioMateriaComp1.cerrarModalFormGeneral();
			this.setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
			(this.$refs as (typeof HeaderComp)).headerComp1.ocultarLoader();
		},						
		handleAction_EliminarDatos : function() { //data_json
			(this.$refs as (typeof BuscarMateriaComp)).buscarMateriaComp1.getTodosDatos();
			(this.$refs as (typeof FormularioMateriaComp)).formularioMateriaComp1.cerrarModalFormGeneral();
			this.setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ELIMINADO);
			(this.$refs as (typeof HeaderComp)).headerComp1.ocultarLoader();
		},						
		setMensajeAlerta : function(tipo_mensaje:string,mensaje:string) {
			this.tipo_mensaje = tipo_mensaje;
			this.mensaje = mensaje;
			(this.$refs as (typeof AlertComp)).alertComp1.setMensajeAlerta();
		}
	}
})

</script>


<style lang="scss" scoped>

</style>