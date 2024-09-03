<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Matricula} from '@/lib/proceso/matricula/domain/entity/Matricula';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import MatriculaSearchComp from '@/lib/proceso/matricula/application/component/MatriculaSearchComp.vue';
import MatriculaTableDataComp from '@/lib/proceso/matricula/application/component/MatriculaTableDataComp.vue';
import MatriculaFormComp from '@/lib/proceso/matricula/application/component/MatriculaFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Matricula');

//------------------ ACCIONES -------------------
let module = ref('proceso');
let controller = ref('matricula_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let matriculas = ref( new Array<Matricula>());
let matricula = ref(new Matricula());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const matriculaSearchComp1 = ref<InstanceType<typeof MatriculaSearchComp> | null>(null);
const matriculaFormComp1 = ref<InstanceType<typeof MatriculaFormComp> | null>(null);

const updateDatos = (matriculas1:Array<Matricula>) => {
	matriculas.value = matriculas1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	matriculaSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	matriculaSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	matriculaSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	matriculaFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (matricula1: Matricula) => {
	matriculaFormComp1.value?.handleAction_ClickTableRow(matricula1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	matriculaSearchComp1.value?.getTodosDatos();
	matriculaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	matriculaSearchComp1.value?.getTodosDatos();
	matriculaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	matriculaSearchComp1.value?.getTodosDatos();
	matriculaFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalmatricula">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <MatriculaSearchComp 
				ref="matriculaSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <MatriculaTableDataComp 
				:module="module" 
				:controller="controller"
				:matriculas="matriculas"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <MatriculaFormComp 
				ref="matriculaFormComp1"
				:module="module" 
				:controller="controller"
				:matricula_prop="matricula"
				:matriculas="matriculas"
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