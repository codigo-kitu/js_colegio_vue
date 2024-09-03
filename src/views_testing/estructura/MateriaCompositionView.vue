<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/ts/general/util/FuncionGeneral'; 

import {Materia} from "@/lib/estructura/materia/domain/entity/Materia";

import HeaderComp from '@/components_testing/composition/HeaderComp.vue';
import FooterComp from '@/components_testing/composition/FooterComp.vue';
import AlertComp from '@/components_testing/composition/AlertComp.vue';

import BuscarMateriaComp from '@/components_testing/estructura/materia/composition/BuscarMateriaComp.vue';
import TablaDatosMateriaComp from '@/components_testing/estructura/materia/composition/TablaDatosMateriaComp.vue';
import FormularioMateriaComp from '@/components_testing/estructura/materia/composition/FormularioMateriaComp.vue';

//------------------ GENERAL --------------------
let title = ref("Materia");
			
//------------------ ACCIONES -------------------
let module = ref("estructura");
let controller = ref("materia_api");
let tipo_busqueda = ref("ninguno");

//------------------ DATOS ----------------------
let materias = ref(new Array<Materia>());
let materia = ref(new Materia());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref("NONE");
let mensaje = ref("NONE");

const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref(null);

//const headerComp1 = ref(null);
//const alertComp1 = ref(null);
//const headerComp1 = ref<InstanceType<typeof HeaderComp>>();

const buscarMateriaComp1 = ref<InstanceType<typeof BuscarMateriaComp> | null>(null);
const formularioMateriaComp1 = ref<InstanceType<typeof FormularioMateriaComp> | null>(null);

//const buscarMateriaComp1 = ref(null);
//const formularioMateriaComp1 = ref(null);
//const tablaDatosMateriaComp1 = ref(null);

/*
//--------------- PAGINA GENERAL ---------------
components: {
	HeaderComp,
	FooterComp,
	AlertComp,
	
	//--------------- PAGINA TABLA ---------------
	BuscarMateriaComp,
	TablaDatosMateriaComp,
	FormularioMateriaComp
},
*/


const updateDatos = (materias1:Array<Materia>) => {
	materias.value = materias1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	buscarMateriaComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	buscarMateriaComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const  siguientes = () => {
	headerComp1.value?.mostrarLoader();
	buscarMateriaComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
	mensaje.value = "";
	
	alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	formularioMateriaComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (materia1: Materia) => {
	formularioMateriaComp1.value?.handleAction_ClickTableRow(materia1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	buscarMateriaComp1.value?.getTodosDatos();
	formularioMateriaComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	buscarMateriaComp1.value?.getTodosDatos();
	formularioMateriaComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	buscarMateriaComp1.value?.getTodosDatos();
	formularioMateriaComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalmateria">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <BuscarMateriaComp 
				ref="buscarMateriaComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <TablaDatosMateriaComp 
				:module="module" 
				:controller="controller"
				:materias="materias"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <FormularioMateriaComp 
				ref="formularioMateriaComp1"
				:module="module" 
				:controller="controller"
				:materia_prop="materia"
				:materias="materias"
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