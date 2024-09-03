<script lang="ts" setup>

import {ref} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
//import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';

import HeaderComp from '@/lib/base/application/component/HeaderComp.vue';
import FooterComp from '@/lib/base/application/component/FooterComp.vue';
import AlertComp from '@/lib/base/application/component/AlertComp.vue';

import NotaSearchComp from '@/lib/proceso/nota/application/component/NotaSearchComp.vue';
import NotaTableDataComp from '@/lib/proceso/nota/application/component/NotaTableDataComp.vue';
import NotaFormComp from '@/lib/proceso/nota/application/component/NotaFormComp.vue';

			
//------------------ GENERAL --------------------
let title = ref('Nota');

//------------------ ACCIONES -------------------
let module = ref('proceso');
let controller = ref('nota_api');
let tipo_busqueda = ref('ninguno');

//------------------ DATOS ----------------------
let notas = ref( new Array<Nota>());
let nota = ref(new Nota());

//------------------ MENSAJE ALERT --------------
let tipo_mensaje = ref('NONE');
let mensaje = ref('NONE');
		
const headerComp1 = ref<InstanceType<typeof HeaderComp> | null>(null);
const alertComp1 = ref<InstanceType<typeof AlertComp> | null>(null);
//const footerComp1 = ref<InstanceType<typeof FooterComp> | null>(null);

const notaSearchComp1 = ref<InstanceType<typeof NotaSearchComp> | null>(null);
const notaFormComp1 = ref<InstanceType<typeof NotaFormComp> | null>(null);

const updateDatos = (notas1:Array<Nota>) => {
	notas.value = notas1;
};

const getTodosDatos = () => {
	headerComp1.value?.mostrarLoader();
	notaSearchComp1.value?.getTodosDatos();
	headerComp1.value?.ocultarLoader();
};

const anteriores = () => {
	headerComp1.value?.mostrarLoader();
	notaSearchComp1.value?.anteriores();
	headerComp1.value?.ocultarLoader();
};

const siguientes = () => {
	headerComp1.value?.mostrarLoader();
	notaSearchComp1.value?.siguientes();
	headerComp1.value?.ocultarLoader();
};

const ocultarMensajeAlerta = () => {
	tipo_mensaje.value = "NONE";
    mensaje.value = "";
	
    alertComp1.value?.closeAlertGeneral();
};

const nuevoPreparar = () => {
	notaFormComp1.value?.nuevoPreparar();
};

const handleAction_ClickTableRow = (nota1: Nota) => {
	notaFormComp1.value?.handleAction_ClickTableRow(nota1);
};

const handleAction_NuevoDatos = () => { 
	//data_json
	notaSearchComp1.value?.getTodosDatos();
	notaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_INGRESADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_ActualizarDatos = () => { //data_json
	notaSearchComp1.value?.getTodosDatos();
	notaFormComp1.value?.cerrarModalFormGeneral();
	
	setMensajeAlerta(Constantes.SUCCESS,Constantes.MENSAJE_ACTUALIZADO);
	
	headerComp1.value?.ocultarLoader();
};

const handleAction_EliminarDatos = () => { //data_json
	notaSearchComp1.value?.getTodosDatos();
	notaFormComp1.value?.cerrarModalFormGeneral();
	
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

<div id="divViewGlobalnota">

	<HeaderComp ref="headerComp1"/>
	
    <h3 class="titulo_general">
		{{ title }}
	</h3>
	
	<AlertComp ref="alertComp1"
				:tipo_mensaje="tipo_mensaje" 
				:mensaje="mensaje"/>
    
    <NotaSearchComp 
				ref="notaSearchComp1"
				:module="module" 
				:controller="controller"
				:tipo_busqueda="tipo_busqueda"
				@updateDatosView="updateDatos"/>
				
    <NotaTableDataComp 
				:module="module" 
				:controller="controller"
				:notas="notas"
				@getTodosDatosView="getTodosDatos" 
				@anterioresView="anteriores" 
				@siguientesView="siguientes"
				@nuevoPrepararView="nuevoPreparar"
				@handleAction_ClickTableRowView="handleAction_ClickTableRow"/>
				
    <NotaFormComp 
				ref="notaFormComp1"
				:module="module" 
				:controller="controller"
				:nota_prop="nota"
				:notas="notas"
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