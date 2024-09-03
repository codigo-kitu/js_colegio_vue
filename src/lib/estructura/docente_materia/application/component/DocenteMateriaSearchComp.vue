<script lang="ts" setup>

import {ref,onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';
import {Pagination} from '@/lib/base/application/logic/Pagination';

import type {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';
import type {DocenteMateriaReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaReturnView';

import {procesarTodosDatosData} from '@/lib/estructura/docente_materia/infrastructure/data/DocenteMateriaData';

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
let title = ref('Buscar Docente Materia');

//------------------ ACCIONES -------------------
let accion_busqueda = ref('todos');
let pagination1 = ref(new Pagination());

//------------------ DATOS ----------------------
let docente_materias = ref(new Array<DocenteMateria>());

	
const getTodosDatos = async () => { 			
	//mostrarLoader();
	getPaginationInicializar();
	accion_busqueda.value = "todos";
	
	await procesarTodosDatos();
	//ocultarLoader();			
	emit(Constantes.UPDATE_DATOS_VIEW,docente_materias.value);
};

const getPaginationInicializar = () => {			
	pagination1.value = new Pagination();
	
	pagination1.value.skip = 0;
	pagination1.value.limit = Constantes.LIMIT;
};

const procesarTodosDatos = async () => {
	
	const data:DocenteMateriaReturnView = await procesarTodosDatosData(props.module,props.controller,pagination1.value);

	docente_materias.value = data.docente_materias;

};

const anteriores = async () => {
	
	if(pagination1.value.skip - pagination1.value.limit < 0) {
		pagination1.value.skip = 0;
	} else {
		pagination1.value.skip = pagination1.value.skip - pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,docente_materias.value);
};

const siguientes = async () => {
	
	if(docente_materias.value != null && docente_materias.value.length > 0) {
		pagination1.value.skip = pagination1.value.skip + pagination1.value.limit;
	}
	
	await procesarBuscar();
	
	emit(Constantes.UPDATE_DATOS_VIEW,docente_materias.value);
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


const buscar_FK_Iddocente = async () => {
		//mostrarLoader();

		getPaginationInicializar();

		accion_busqueda.value = 'FK_Iddocente';

		procesar_FK_Iddocente();
	};

const procesar_FK_Iddocente = async () => {

		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + '_FK_Iddocente');

		const data_json = { 
			pagination : pagination1.value
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {

				const data:DocenteMateriaReturnView = await response_json.json();
					docente_materias = data.docente_materias;

			} else {

				console.log(await response_json.json());

			}
		} catch(error) {
			console.log(error);
		}
	}
const buscar_FK_Idmateria = async () => {
		//mostrarLoader();

		getPaginationInicializar();

		accion_busqueda.value = 'FK_Idmateria';

		procesar_FK_Idmateria();
	};

const procesar_FK_Idmateria = async () => {

		let url_global_controller = FuncionGeneral.GetUrlGlobalController(props.module,props.controller,Constantes.RJ_BUSCAR + '_FK_Idmateria');

		const data_json = { 
			pagination : pagination1.value
		};

		try {

			const request_options = FuncionGeneral.GetRequestOptions('POST',data_json);

			const response_json = await fetch(url_global_controller, request_options);

			if(response_json?.ok) {

				const data:DocenteMateriaReturnView = await response_json.json();
					docente_materias = data.docente_materias;

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

<div id="div_docente_materia_form_buscar" class="div_buscar_general">
		
		<div class="tabs_general">

			<button class="tab_button" 
					@click="mostrarTabActual($event,'div_FK_Iddocente')">FK_Iddocente</button>
			<button class="tab_button" 
					@click="mostrarTabActual($event,'div_FK_Idmateria')">FK_Idmateria</button>

		</div>

					
		<div id="div_FK_Iddocente" class="tab_item">
			<form id="docente_materia_FK_Iddocente_form_buscar" class="form_buscar_general">
				<label for="id_docente_FK_Iddocente"> Docente</label>
				<input 	type="text" id="id_docente_FK_Iddocente" name="id_docente_FK_Iddocente" 
						placeholder=" Docente">				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Iddocente" name="buscar_button_FK_Iddocente" 
						value="Buscar" class="button_general" 
						@click="buscar_FK_Iddocente">
					<fai icon="fa-solid fa-search" />
					Buscar
				</button>
				
			</form>
		</div>
					
		<div id="div_FK_Idmateria" class="tab_item">
			<form id="docente_materia_FK_Idmateria_form_buscar" class="form_buscar_general">
				<label for="id_materia_FK_Idmateria"> Materia</label>
				<input 	type="text" id="id_materia_FK_Idmateria" name="id_materia_FK_Idmateria" 
						placeholder=" Materia">				
				
				<p></p>
				<button type="button" id="buscar_button_FK_Idmateria" name="buscar_button_FK_Idmateria" 
						value="Buscar" class="button_general" 
						@click="buscar_FK_Idmateria">
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
