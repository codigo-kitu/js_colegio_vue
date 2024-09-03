<script lang="ts" setup>

import {ref,type PropType,onMounted} from 'vue';
import {useRouter} from 'vue-router';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';
import type {DocenteMateriaReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaReturnView';

import type {DocenteMateriaFKReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaFKReturnView';

import type {DocenteMateriaCreateRequest} from '@/lib/estructura/docente_materia/application/util/request/DocenteMateriaCreateRequest';
import type {DocenteMateriaUpdateRequest} from '@/lib/estructura/docente_materia/application/util/request/DocenteMateriaUpdateRequest';

import {nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		,
		getFksData
		} from '@/lib/estructura/docente_materia/infrastructure/data/DocenteMateriaData';

/*FKs*/
import type {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import type {Materia} from '@/lib/estructura/materia/domain/entity/Materia';


const router = useRouter();


const props = defineProps({
	
	//------------------ ACCIONES -------------------
	module:{type: String, default: ''},
	controller:{type: String, default: ''},
	
	//------------------ DATOS ----------------------
	docente_materias: {type: Array as PropType<Array<DocenteMateria>>, default: new Array<DocenteMateria>()},
	docente_materia_prop: {type: DocenteMateria, default: new DocenteMateria()}
});

const emit = defineEmits([	'ocultarMensajeAlertaView','handleAction_NuevoDatosView',
							'handleAction_ActualizarDatosView','handleAction_EliminarDatosView']);
							
//------------------ GENERAL --------------------
let title = ref('Formulario Docente Materia');

//------------------ ACCIONES -------------------
let tipo_accion = ref(Constantes.CANCELAR);

//------------------ ESTILOS -------------------
let display = ref('none');
let style_id_column = ref('');

//------------------ DATOS ----------------------
/*let id = ref(-1);*/
let text_id_aux = ref('-1');

let docente_materia = ref(new DocenteMateria());

/*FKs*/

let docentesFK = ref(new Array<Docente>());
let materiasFK = ref(new Array<Materia>());

let aux = ref("aux");

onMounted(() => {
	//FKs
	getFks();
});
	
const home = () => {
	router.push('/main');
};

const nuevoPreparar = () => {
	
	tipo_accion.value=Constantes.NUEVO;	
	abrirModalFormGeneral();
	
	emit('ocultarMensajeAlertaView');
	//ocultarMensajeAlerta();
	
	/*id = -1;*/
	text_id_aux.value='-1';
	
	
	docente_materia.value.id=-1;
	docente_materia.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	docente_materia.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	docente_materia.value.id_docente=-1;
	docente_materia.value.id_materia=-1;
};

const cancelar = () => {			
	tipo_accion.value=Constantes.CANCELAR;			
	cerrarModalFormGeneral();
};

const abrirModalFormGeneral = () => {
	display.value='block';
};

const cerrarModalFormGeneral = () => {
	display.value='none';
};

const showConfirm = (mensaje:string) => {
	return window.confirm(mensaje);
};

const handleAction_ClickTableRow = (docente_materia1:DocenteMateria) => {
	//ocultarMensajeAlerta();			
	tipo_accion.value = Constantes.SELECCIONAR;			
	abrirModalFormGeneral();
	
	if(Constantes.IS_DEVELOPING == true) {
		text_id_aux.value = docente_materia1.id.toString();
	}
				
	docente_materia.value.id = docente_materia1.id;
	docente_materia.value.created_at = docente_materia1.created_at;
	
	docente_materia.value.updated_at = docente_materia1.updated_at;
	docente_materia.value.id_docente = docente_materia1.id_docente;
	docente_materia.value.id_materia = docente_materia1.id_materia;
};

const actualizar = () => {
	
	if(tipo_accion.value == Constantes.NUEVO) {
		nuevoDatos();				
		
	} else if(tipo_accion.value == Constantes.SELECCIONAR) {
		actualizarDatos();			
		
	} else if(tipo_accion.value == Constantes.ELIMINAR) {
		eliminarDatos();
	}
};

const eliminar = () => {			
	tipo_accion.value = Constantes.ELIMINAR;
	
	if(showConfirm(Constantes.MENSAJE_ELIMINAR_SINO)) {
		actualizar();
	}
};

const nuevoDatos = async () => {
	
	const data_json:DocenteMateriaReturnView = await nuevoDatosData(props.module,props.controller,docente_materia.value);

	emit('handleAction_NuevoDatosView',data_json);
};

const actualizarDatos = async () => {	
	
	tipo_accion.value = Constantes.SELECCIONAR;
		
	const data_json:DocenteMateriaReturnView = await actualizarDatosData(props.module,props.controller,docente_materia.value);
		
	emit('handleAction_ActualizarDatosView',data_json);
			
};

const eliminarDatos = async () => {
	
	const data_json:DocenteMateriaReturnView = await eliminarDatosData(props.module,props.controller,docente_materia.value);
	
	emit('handleAction_EliminarDatosView',data_json);		
};

/*FKs*/
const getFks = async () => {
	
	const data:DocenteMateriaReturnView = await getFksData(props.module,props.controller);
	
	
	docentesFK.value = data.docentesFK;
	materiasFK.value = data.materiasFK;
};


	defineExpose({
		nuevoPreparar,
		handleAction_ClickTableRow,
		cerrarModalFormGeneral
	});

</script>

<template>

<!-- The Modal -->
<div id="divModal_docente_materia_form_general" 
		class="modal_form_general"
		:style="{ display:display }">
	
	<!-- Modal content -->
	<div id="divModalContent_docente_materia_form_general" 
		class="modal_form_general_content">
		
		<div class="modal_form_general_header">
			
			<span id="spanCloseModal_docente_materia_form_general"
					class="close_modal_form_general" 
					@click="cerrarModalFormGeneral">
				&times;
			</span>
			<h2>
				Docente Materia
			</h2>
			
		</div>
		
		<div class="modal_form_general_body">
		
			<div id="div_docente_materia_form_general">
			
				<form id="docente_materia_form_general" 
					class="form_general">

					<input type="hidden" id="id" name="id" 
							v-model="docente_materia.id" />
					
					<label id="label_id" name="label_id" for="text_id_aux" class=""
							style="{{ style_id_column }}">Id</label>				
					<input type="text" id="text_id_aux" name="text_id_aux" 
							class="" style="{{ style_id_column }}"
							v-model="text_id_aux" placeholder="Id" readonly/>
					
					<label for="created_at" class="" style="display:none;">Created At</label>
					<input type="text" id="created_at" name="created_at" style="display:none;" 
							class="" placeholder="Created At"
							v-model="docente_materia.created_at" />
					
					<label for="updated_at" class="" style="display:none;">Updated At</label>
					<input type="text" id="updated_at" name="updated_at" style="display:none;"
							class="" placeholder="Updated At"
							v-model="docente_materia.updated_at" />
							
					
					<label for="id_docente" class=""> Docente</label>
					<select id="id_docente" name="id_docente"
							class="" placeholder=" Docente"
							v-model="docente_materia.id_docente" >
						<option v-for="docente in docentesFK" :key="docente.id" :value="docente.id">
							{{ docente.nombre }}
						</option>
					</select>	
						
					
					<label for="id_materia" class=""> Materia</label>
					<select id="id_materia" name="id_materia"
							class="" placeholder=" Materia"
							v-model="docente_materia.id_materia" >
						<option v-for="materia in materiasFK" :key="materia.id" :value="materia.id">
							{{ materia.codigo }}
						</option>
					</select>	
						
									
				</form>
				
			</div>
			
			<div id="div_docente_materia_actions_form_general">
				
				<form id="docente_materia_actions_form_general" 
					class="actions_form_general">				
					
					<button type="button" id="actualizar_button" name="actualizar_button" 
							class="button_general" value="Actualizar" 
							@click="actualizar">
						<fai icon="fa-solid fa-save" />
						Actualizar
					</button>
					
					<button type="button" id="eliminar_button" name="eliminar_button" 
							class="button_general" value="Eliminar" 
							@click="eliminar">
						<fai icon="fa-solid fa-times-circle" />
						Eliminar
					</button>
					
					<button type="button" id="cancelar_button" name="cancelar_button" 
							class="button_general" value="Cancelar"
							@click="cancelar">
						<fai icon="fa-solid fa-minus-circle" />
						Cancelar
					</button>
					
				</form>
				
			</div>
			
		</div>
		
	</div>
	
</div>

</template>

<style lang="scss" scoped>

/*------------------ BUTTON GENERAL ----------------------*/
@import "@/scss/components/button/button_general";
/*------------------ FORM GENERAL ----------------------*/
@import "@/scss/components/form/form_general";
/*------------------ FORM ACTIONS GENERAL ----------------------*/
@import "@/scss/components/form/actions_form_general";
/*------------------ FORM MODAL GENERAL ----------------------*/
@import "@/scss/components/form/modal_form_general";


/*------------------ RESPONSIVE FORM GENERAL ----------------------*/
@import "@/scss/responsive/form/form_general_responsive";
/*------------------ RESPONSIVE ACTIONS GENERAL ----------------------*/
@import "@/scss/responsive/form/actions_form_general_responsive";

</style>
