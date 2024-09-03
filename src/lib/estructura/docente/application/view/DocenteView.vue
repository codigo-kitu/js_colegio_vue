<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Docente} from '@/lib/estructura/docente/domain/entity/Docente';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import DocenteSearchComp from '@/lib/estructura/docente/application/component/DocenteSearchComp.vue';
import DocenteTableDataComp from '@/lib/estructura/docente/application/component/DocenteTableDataComp.vue';
import DocenteFormComp from '@/lib/estructura/docente/application/component/DocenteFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Docente');

//------------------ ACCIONES -------------------
let module = ref('estructura');
let controller = ref('docente_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let docentes = ref( new Array<Docente>());
let docente = ref(new Docente());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const docenteSearchComp1 = ref<InstanceType<typeof DocenteSearchComp> | null>(null);
const docenteFormComp1 = ref<InstanceType<typeof DocenteFormComp> | null>(null);

const updateDatos = (docentes1:Array<Docente>) => {
	docentes.value = docentes1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	docenteSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	docenteSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	docenteSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	docenteFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (docente1: Docente) => {
	docenteFormComp1.value?.handleAction_ClickTableRow(docente1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	docenteSearchComp1.value?.getTodosDatos();
	docenteFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	docenteSearchComp1.value?.getTodosDatos();
	docenteFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	docenteSearchComp1.value?.getTodosDatos();
	docenteFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ELIMINADO);
	
	headerComp1.value?.ocultarLoader();
};

const setMensajeAlerta = (tipo_mensaje1:string,mensaje1:string) => {
	tipo_mensaje.value = tipo_mensaje1;
	mensaje.value = mensaje1;
	
	alertComp1.value?.setMensajeAlerta();
};

</script>

<template>

<div id="divViewGlobaldocente">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <DocenteSearchComp 
				ref="docenteSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <DocenteTableDataComp 
				:module="module" 
				:controller="controller"
				:docentes="docentes"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <DocenteFormComp 
				ref="docenteFormComp1"
				:module="module" 
				:controller="controller"
				:docente_prop="docente"
				:docentes="docentes"
				@ocultarMensajeAlertaView="ocultarMensajeAlerta"
				@handleAction_ActualizarDatosView="handleAction_ActualizarDatos"
				@handleAction_NuevoDatosView="handleAction_NuevoDatos"
				@handleAction_EliminarDatosView="handleAction_EliminarDatos"/>
	
	<div id="div_auxiliar"></div>
	
	<FooterComp/>
	
</div>
	
</template>

<style lang="scss" scoped>

/*------------------ TITLE GENERAL ----------------------*/
@import "@/scss/components/title/titulo_general";

</style>