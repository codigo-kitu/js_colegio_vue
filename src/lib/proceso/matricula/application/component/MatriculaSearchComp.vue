<script lang="ts" setup>

import {ref,onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {Matricula} from '@/lib/proceso/matricula/domain/entity/Matricula';
import type {MatriculaReturnView} from '@/lib/proceso/matricula/application/util/return/MatriculaReturnView';

import {procesarTodosDatosData} from '@/lib/proceso/matricula/infrastructure/data/MatriculaData';

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
let title = ref('Buscar Matricula');

//------------------ ACCIONES -------------------
let accion_busqueda = ref('todos');
let pagination1 = ref(new Pagination());

//------------------ DATOS ----------------------
let matriculas = ref(new Array<Matricula>());

	
const getTodosDatos = async () => { 			
	//mostrarLoader();
	getPaginationInicializar();
	accion_busqueda.value = "todos";
	
	await procesarTodosDatos();
	//ocultarLoader();			
	emit(Constantes.UPDATE_DATOS_VIEW,matriculas.value);
};

const getPaginationInicializar = () => {			
	pagination1.value = new Pagination();
	
	pagination1.value.skip = 0;
	pagination1.value.limit = Constantes.LIMIT;
};

const procesarTodosDatos = async () => {
	
	const data:MatriculaReturnView = await procesarTodosDatosData(props.module,props.controller,pagination1.value);

	matriculas.value = data.matriculas;

};

const anteriores = async () => {
	
	if(pagination1.value.skip - pagination1.value.limit < 0) {
		pagination1.value.skip = 0;
	} else {
		pagination1.value.skip = pagination1.value.skip - pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,matriculas.value);
};

const siguientes = async () => {
	
	if(matriculas.value != null && matriculas.value.length > 0) {
		pagination1.value.skip = pagination1.value.skip + pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,matriculas.value);
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


const buscar_FK_Idalumnoid = async () => {
		//mostrarLoader();

		getPaginationInicializar();

		accion_busqueda.value = 'FK_Idalumnoid';

		procesar_FK_Idalumnoid();
	};

const procesar_FK_Idalumnoid = async () => {

		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + '_FK_Idalumnoid');

		const data_json = { 
			pagination : pagination1.value
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {

				const data:MatriculaReturnView = await response_json.json();
					matriculas = data.matriculas;

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

<div id="div_matricula_form_buscar" class="div_buscar_general">
		
		<div class="tabs_general">

			<button class="tab_button" 
					@click="mostrarTabActual($event,'div_FK_Idalumnoid')">FK_Idalumnoid</button>

		</div>

					
		<div id="div_FK_Idalumnoid" class="tab_item">
			<form id="matricula_FK_Idalumnoid_form_buscar" class="form_buscar_general">
				<label for="ConstantesSql.ID_FK_Idalumnoid"></label>
				<input 	type="text" id="ConstantesSql.ID_FK_Idalumnoid" name="ConstantesSql.ID_FK_Idalumnoid" 
						placeholder="">				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Idalumnoid" name="buscar_button_FK_Idalumnoid" 
						value="Buscar" class="button_general" 
						@click="buscar_FK_Idalumnoid">
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
