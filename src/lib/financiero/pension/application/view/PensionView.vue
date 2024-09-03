<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Pension} from '@/lib/financiero/pension/domain/entity/Pension';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import PensionSearchComp from '@/lib/financiero/pension/application/component/PensionSearchComp.vue';
import PensionTableDataComp from '@/lib/financiero/pension/application/component/PensionTableDataComp.vue';
import PensionFormComp from '@/lib/financiero/pension/application/component/PensionFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Pension');

//------------------ ACCIONES -------------------
let module = ref('financiero');
let controller = ref('pension_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let pensions = ref( new Array<Pension>());
let pension = ref(new Pension());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const pensionSearchComp1 = ref<InstanceType<typeof PensionSearchComp> | null>(null);
const pensionFormComp1 = ref<InstanceType<typeof PensionFormComp> | null>(null);

const updateDatos = (pensions1:Array<Pension>) => {
	pensions.value = pensions1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	pensionSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	pensionSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	pensionSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	pensionFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (pension1: Pension) => {
	pensionFormComp1.value?.handleAction_ClickTableRow(pension1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	pensionSearchComp1.value?.getTodosDatos();
	pensionFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	pensionSearchComp1.value?.getTodosDatos();
	pensionFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	pensionSearchComp1.value?.getTodosDatos();
	pensionFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalpension">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <PensionSearchComp 
				ref="pensionSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <PensionTableDataComp 
				:module="module" 
				:controller="controller"
				:pensions="pensions"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <PensionFormComp 
				ref="pensionFormComp1"
				:module="module" 
				:controller="controller"
				:pension_prop="pension"
				:pensions="pensions"
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