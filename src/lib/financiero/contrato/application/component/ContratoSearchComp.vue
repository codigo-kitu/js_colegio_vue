<script lang="ts" setup>

import {ref,onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';
import type {ContratoReturnView} from '@/lib/financiero/contrato/application/util/return/ContratoReturnView';

import {procesarTodosDatosData} from '@/lib/financiero/contrato/infrastructure/data/ContratoData';

const props = defineProps({
	//------------------ ACCIONES -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	tipo_busqueda: {type: String, default: ''}
});

const emit = defineEmits([Constantes.UPDATE_DATOS_VIEW]);

onMounted(() => {
	getTodosDatos();
});

			
//------------------ GENERAL --------------------
let title = ref('Buscar Contrato');

//------------------ ACCIONES -------------------
let accion_busqueda = ref('todos');
let pagination1 = ref(new Pagination());

//------------------ DATOS ----------------------
let contratos = ref(new Array<Contrato>());

	
const getTodosDatos = async () => { 			
	//mostrarLoader();
	getPaginationInicializar();
	accion_busqueda.value = "todos";
	
	await procesarTodosDatos();
	//ocultarLoader();			
	emit(Constantes.UPDATE_DATOS_VIEW,contratos.value);
};

const getPaginationInicializar = () => {			
	pagination1.value = new Pagination();
	
	pagination1.value.skip = 0;
	pagination1.value.limit = Constantes.LIMIT;
};

const procesarTodosDatos = async () => {
	
	const data:ContratoReturnView = await procesarTodosDatosData(props.module,props.controller,pagination1.value);

	contratos.value = data.contratos;

};

const anteriores = async () => {
	
	if(pagination1.value.skip - pagination1.value.limit < 0) {
		pagination1.value.skip = 0;
	} else {
		pagination1.value.skip = pagination1.value.skip - pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,contratos.value);
};

const siguientes = async () => {
	
	if(contratos.value != null && contratos.value.length > 0) {
		pagination1.value.skip = pagination1.value.skip + pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,contratos.value);
};

const procesarBuscar = async () => {
	
	if(accion_busqueda.value == 'todos') {
		await procesarTodosDatos();

	} else if(accion_busqueda.value == 'buscar') {
		//await getBuscarGeneralDatos();
	}
};

const mostrarTabActual = (evt:Event,tab1:string) => {
	FuncionGeneral.mostrarTabActual(evt,tab1);
};


const buscar_FK_Iddocenteid = async () => {
		//mostrarLoader();

		getPaginationInicializar();

		accion_busqueda.value = 'FK_Iddocenteid';

		procesar_FK_Iddocenteid();
	};

const procesar_FK_Iddocenteid = async () => {

		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + '_FK_Iddocenteid');

		const data_json = { 
			pagination : pagination1.value
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {

				const data:ContratoReturnView = await response_json.json();
					contratos = data.contratos;

			} else {

				console.log(await response_json.json());

			}
		} catch(error) {
			console.log(error);
		}
	}
	
defineExpose({
	getTodosDatos,
	anteriores,
	siguientes
});

</script>

<template>

<div id="div_contrato_form_buscar" class="div_buscar_general">
		
		<div class="tabs_general">

			<button class="tab_button" 
					@click="mostrarTabActual($event,'div_FK_Iddocenteid')">FK_Iddocenteid</button>

		</div>

					
		<div id="div_FK_Iddocenteid" class="tab_item">
			<form id="contrato_FK_Iddocenteid_form_buscar" class="form_buscar_general">
				<label for="ConstantesSql.ID_FK_Iddocenteid"></label>
				<input 	type="text" id="ConstantesSql.ID_FK_Iddocenteid" name="ConstantesSql.ID_FK_Iddocenteid" 
						placeholder="">				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Iddocenteid" name="buscar_button_FK_Iddocenteid" 
						value="Buscar" class="button_general" 
						@click="buscar_FK_Iddocenteid">
					<fai icon="fa-solid fa-search" />
					Buscar
				</button>
				
			</form>
		</div>
</div>  

</template>

<style lang="scss" scoped>

/*------------------ BUSCAR GENERAL ----------------------*/
@import "@/scss/components/div/div_buscar_general";
/*------------------ TABS GENERAL ----------------------*/
@import "@/scss/components/tabs/tabs_general";


/*------------------ RESPONSIVE FORM BUSCAR GENERAL ----------------------*/
@import "@/scss/responsive/form/form_buscar_general_responsive";

</style>
