<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import DocenteMateriaSearchComp from '@/lib/estructura/docente_materia/application/component/DocenteMateriaSearchComp.vue';
import DocenteMateriaTableDataComp from '@/lib/estructura/docente_materia/application/component/DocenteMateriaTableDataComp.vue';
import DocenteMateriaFormComp from '@/lib/estructura/docente_materia/application/component/DocenteMateriaFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Docente Materia');

//------------------ ACCIONES -------------------
let module = ref('estructura');
let controller = ref('docente_materia_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let docente_materias = ref( new Array<DocenteMateria>());
let docente_materia = ref(new DocenteMateria());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const docente_materiaSearchComp1 = ref<InstanceType<typeof DocenteMateriaSearchComp> | null>(null);
const docente_materiaFormComp1 = ref<InstanceType<typeof DocenteMateriaFormComp> | null>(null);

const updateDatos = (docente_materias1:Array<DocenteMateria>) => {
	docente_materias.value = docente_materias1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	docente_materiaSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	docente_materiaSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	docente_materiaSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	docente_materiaFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (docente_materia1: DocenteMateria) => {
	docente_materiaFormComp1.value?.handleAction_ClickTableRow(docente_materia1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	docente_materiaSearchComp1.value?.getTodosDatos();
	docente_materiaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	docente_materiaSearchComp1.value?.getTodosDatos();
	docente_materiaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	docente_materiaSearchComp1.value?.getTodosDatos();
	docente_materiaFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobaldocente_materia">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <DocenteMateriaSearchComp 
				ref="docente_materiaSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <DocenteMateriaTableDataComp 
				:module="module" 
				:controller="controller"
				:docente_materias="docente_materias"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <DocenteMateriaFormComp 
				ref="docente_materiaFormComp1"
				:module="module" 
				:controller="controller"
				:docente_materia_prop="docente_materia"
				:docente_materias="docente_materias"
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