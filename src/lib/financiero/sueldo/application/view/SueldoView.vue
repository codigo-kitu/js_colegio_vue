<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Sueldo} from '@/lib/financiero/sueldo/domain/entity/Sueldo';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import SueldoSearchComp from '@/lib/financiero/sueldo/application/component/SueldoSearchComp.vue';
import SueldoTableDataComp from '@/lib/financiero/sueldo/application/component/SueldoTableDataComp.vue';
import SueldoFormComp from '@/lib/financiero/sueldo/application/component/SueldoFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Sueldo');

//------------------ ACCIONES -------------------
let module = ref('financiero');
let controller = ref('sueldo_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let sueldos = ref( new Array<Sueldo>());
let sueldo = ref(new Sueldo());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const sueldoSearchComp1 = ref<InstanceType<typeof SueldoSearchComp> | null>(null);
const sueldoFormComp1 = ref<InstanceType<typeof SueldoFormComp> | null>(null);

const updateDatos = (sueldos1:Array<Sueldo>) => {
	sueldos.value = sueldos1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	sueldoSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	sueldoSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	sueldoSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	sueldoFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (sueldo1: Sueldo) => {
	sueldoFormComp1.value?.handleAction_ClickTableRow(sueldo1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	sueldoSearchComp1.value?.getTodosDatos();
	sueldoFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	sueldoSearchComp1.value?.getTodosDatos();
	sueldoFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	sueldoSearchComp1.value?.getTodosDatos();
	sueldoFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalsueldo">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <SueldoSearchComp 
				ref="sueldoSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <SueldoTableDataComp 
				:module="module" 
				:controller="controller"
				:sueldos="sueldos"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <SueldoFormComp 
				ref="sueldoFormComp1"
				:module="module" 
				:controller="controller"
				:sueldo_prop="sueldo"
				:sueldos="sueldos"
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