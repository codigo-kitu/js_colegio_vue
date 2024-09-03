<script lang="ts" setup>

import {ref,onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Pension} from '@/lib/financiero/pension/domain/entity/Pension';
import type {PensionReturnView} from '@/lib/financiero/pension/application/util/return/PensionReturnView';

import {procesarTodosDatosData} from '@/lib/financiero/pension/infrastructure/data/PensionData';

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
let title = ref('Buscar Pension');

//------------------ ACCIONES -------------------
let accion_busqueda = ref('todos');
let pagination1 = ref(new Pagination());

//------------------ DATOS ----------------------
let pensions = ref(new Array<Pension>());

	
const getTodosDatos = async () => { 			
	//mostrarLoader();
	getPaginationInicializar();
	accion_busqueda.value = "todos";
	
	await procesarTodosDatos();
	//ocultarLoader();			
	emit(Constantes.UPDATE_DATOS_VIEW,pensions.value);
};

const getPaginationInicializar = () => {			
	pagination1.value = new Pagination();
	
	pagination1.value.skip = 0;
	pagination1.value.limit = Constantes.LIMIT;
};

const procesarTodosDatos = async () => {
	
	const data:PensionReturnView = await procesarTodosDatosData(props.module,props.controller,pagination1.value);

	pensions.value = data.pensions;

};

const anteriores = async () => {
	
	if(pagination1.value.skip - pagination1.value.limit < 0) {
		pagination1.value.skip = 0;
	} else {
		pagination1.value.skip = pagination1.value.skip - pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,pensions.value);
};

const siguientes = async () => {
	
	if(pensions.value != null && pensions.value.length > 0) {
		pagination1.value.skip = pagination1.value.skip + pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,pensions.value);
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


const buscar_FK_Idalumno = async () => {
		//mostrarLoader();

		getPaginationInicializar();

		accion_busqueda.value = 'FK_Idalumno';

		procesar_FK_Idalumno();
	};

const procesar_FK_Idalumno = async () => {

		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + '_FK_Idalumno');

		const data_json = { 
			pagination : pagination1.value
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {

				const data:PensionReturnView = await response_json.json();
					pensions = data.pensions;

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

<div id="div_pension_form_buscar" class="div_buscar_general">
		
		<div class="tabs_general">

			<button class="tab_button" 
					@click="mostrarTabActual($event,'div_FK_Idalumno')">FK_Idalumno</button>

		</div>

					
		<div id="div_FK_Idalumno" class="tab_item">
			<form id="pension_FK_Idalumno_form_buscar" class="form_buscar_general">
				<label for="id_alumno_FK_Idalumno"> Alumno</label>
				<input 	type="text" id="id_alumno_FK_Idalumno" name="id_alumno_FK_Idalumno" 
						placeholder=" Alumno">				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Idalumno" name="buscar_button_FK_Idalumno" 
						value="Buscar" class="button_general" 
						@click="buscar_FK_Idalumno">
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
