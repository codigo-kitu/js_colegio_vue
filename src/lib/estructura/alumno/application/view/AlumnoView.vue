<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import AlumnoSearchComp from '@/lib/estructura/alumno/application/component/AlumnoSearchComp.vue';
import AlumnoTableDataComp from '@/lib/estructura/alumno/application/component/AlumnoTableDataComp.vue';
import AlumnoFormComp from '@/lib/estructura/alumno/application/component/AlumnoFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Alumno');

//------------------ ACCIONES -------------------
let module = ref('estructura');
let controller = ref('alumno_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let alumnos = ref( new Array<Alumno>());
let alumno = ref(new Alumno());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const alumnoSearchComp1 = ref<InstanceType<typeof AlumnoSearchComp> | null>(null);
const alumnoFormComp1 = ref<InstanceType<typeof AlumnoFormComp> | null>(null);

const updateDatos = (alumnos1:Array<Alumno>) => {
	alumnos.value = alumnos1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	alumnoSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	alumnoSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	alumnoSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	alumnoFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (alumno1: Alumno) => {
	alumnoFormComp1.value?.handleAction_ClickTableRow(alumno1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	alumnoSearchComp1.value?.getTodosDatos();
	alumnoFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	alumnoSearchComp1.value?.getTodosDatos();
	alumnoFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	alumnoSearchComp1.value?.getTodosDatos();
	alumnoFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalalumno">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <AlumnoSearchComp 
				ref="alumnoSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <AlumnoTableDataComp 
				:module="module" 
				:controller="controller"
				:alumnos="alumnos"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <AlumnoFormComp 
				ref="alumnoFormComp1"
				:module="module" 
				:controller="controller"
				:alumno_prop="alumno"
				:alumnos="alumnos"
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