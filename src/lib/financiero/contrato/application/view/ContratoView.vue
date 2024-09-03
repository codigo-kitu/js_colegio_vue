<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import ContratoSearchComp from '@/lib/financiero/contrato/application/component/ContratoSearchComp.vue';
import ContratoTableDataComp from '@/lib/financiero/contrato/application/component/ContratoTableDataComp.vue';
import ContratoFormComp from '@/lib/financiero/contrato/application/component/ContratoFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Contrato');

//------------------ ACCIONES -------------------
let module = ref('financiero');
let controller = ref('contrato_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let contratos = ref( new Array<Contrato>());
let contrato = ref(new Contrato());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const contratoSearchComp1 = ref<InstanceType<typeof ContratoSearchComp> | null>(null);
const contratoFormComp1 = ref<InstanceType<typeof ContratoFormComp> | null>(null);

const updateDatos = (contratos1:Array<Contrato>) => {
	contratos.value = contratos1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	contratoSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	contratoSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	contratoSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	contratoFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (contrato1: Contrato) => {
	contratoFormComp1.value?.handleAction_ClickTableRow(contrato1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	contratoSearchComp1.value?.getTodosDatos();
	contratoFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	contratoSearchComp1.value?.getTodosDatos();
	contratoFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	contratoSearchComp1.value?.getTodosDatos();
	contratoFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalcontrato">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <ContratoSearchComp 
				ref="contratoSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <ContratoTableDataComp 
				:module="module" 
				:controller="controller"
				:contratos="contratos"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <ContratoFormComp 
				ref="contratoFormComp1"
				:module="module" 
				:controller="controller"
				:contrato_prop="contrato"
				:contratos="contratos"
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