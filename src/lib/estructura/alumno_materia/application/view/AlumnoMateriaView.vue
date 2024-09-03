<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import AlumnoMateriaSearchComp from '@/lib/estructura/alumno_materia/application/component/AlumnoMateriaSearchComp.vue';
import AlumnoMateriaTableDataComp from '@/lib/estructura/alumno_materia/application/component/AlumnoMateriaTableDataComp.vue';
import AlumnoMateriaFormComp from '@/lib/estructura/alumno_materia/application/component/AlumnoMateriaFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Alumno Materia');

//------------------ ACCIONES -------------------
let module = ref('estructura');
let controller = ref('alumno_materia_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let alumno_materias = ref( new Array<AlumnoMateria>());
let alumno_materia = ref(new AlumnoMateria());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const alumno_materiaSearchComp1 = ref<InstanceType<typeof AlumnoMateriaSearchComp> | null>(null);
const alumno_materiaFormComp1 = ref<InstanceType<typeof AlumnoMateriaFormComp> | null>(null);

const updateDatos = (alumno_materias1:Array<AlumnoMateria>) => {
	alumno_materias.value = alumno_materias1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	alumno_materiaSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	alumno_materiaSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	alumno_materiaSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	alumno_materiaFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (alumno_materia1: AlumnoMateria) => {
	alumno_materiaFormComp1.value?.handleAction_ClickTableRow(alumno_materia1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	alumno_materiaSearchComp1.value?.getTodosDatos();
	alumno_materiaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	alumno_materiaSearchComp1.value?.getTodosDatos();
	alumno_materiaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	alumno_materiaSearchComp1.value?.getTodosDatos();
	alumno_materiaFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalalumno_materia">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <AlumnoMateriaSearchComp 
				ref="alumno_materiaSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <AlumnoMateriaTableDataComp 
				:module="module" 
				:controller="controller"
				:alumno_materias="alumno_materias"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <AlumnoMateriaFormComp 
				ref="alumno_materiaFormComp1"
				:module="module" 
				:controller="controller"
				:alumno_materia_prop="alumno_materia"
				:alumno_materias="alumno_materias"
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