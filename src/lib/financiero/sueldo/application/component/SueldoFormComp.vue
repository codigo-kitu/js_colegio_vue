<script lang="ts" setup>

import {ref,type PropType,onMounted} from 'vue';
import {useRouter} from 'vue-router';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Sueldo} from '@/lib/financiero/sueldo/domain/entity/Sueldo';
import type {SueldoReturnView} from '@/lib/financiero/sueldo/application/util/return/SueldoReturnView';

import type {SueldoFKReturnView} from '@/lib/financiero/sueldo/application/util/return/SueldoFKReturnView';

import type {SueldoCreateRequest} from '@/lib/financiero/sueldo/application/util/request/SueldoCreateRequest';
import type {SueldoUpdateRequest} from '@/lib/financiero/sueldo/application/util/request/SueldoUpdateRequest';

import {nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		,
		getFksData
		} from '@/lib/financiero/sueldo/infrastructure/data/SueldoData';

/*FKs*/
import type {Docente} from '@/lib/estructura/docente/domain/entity/Docente';


const router = useRouter();


const props = defineProps({
	
	//------------------ ACCIONES -------------------
	module:{type: String, default: ''},
	controller:{type: String, default: ''},
	
	//------------------ DATOS ----------------------
	sueldos: {type: Array as PropType<Array<Sueldo>>, default: new Array<Sueldo>()},
	sueldo_prop: {type: Sueldo, default: new Sueldo()}
});

const emit = defineEmits([	'ocultarMensajeAlertaView','handleAction_NuevoDatosView',
							'handleAction_ActualizarDatosView','handleAction_EliminarDatosView']);
							
//------------------ GENERAL --------------------
let title = ref('Formulario Sueldo');

//------------------ ACCIONES -------------------
let tipo_accion = ref(Constantes.CANCELAR);

//------------------ ESTILOS -------------------
let display = ref('none');
let style_id_column = ref('');

//------------------ DATOS ----------------------
/*let id = ref(-1);*/
let text_id_aux = ref('-1');

let sueldo = ref(new Sueldo());

/*FKs*/

let docentesFK = ref(new Array<Docente>());

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
	
	
	sueldo.value.id=-1;
	sueldo.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	sueldo.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	sueldo.value.id_docente=-1;
	sueldo.value.anio=0;
	sueldo.value.mes=0;
	sueldo.value.valor=0.0;
	sueldo.value.cobrado=false;
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

const handleAction_ClickTableRow = (sueldo1:Sueldo) => {
	//ocultarMensajeAlerta();			
	tipo_accion.value = Constantes.SELECCIONAR;			
	abrirModalFormGeneral();
	
	if(Constantes.IS_DEVELOPING == true) {
		text_id_aux.value = sueldo1.id.toString();
	}
				
	sueldo.value.id = sueldo1.id;
	sueldo.value.created_at = sueldo1.created_at;
	
	sueldo.value.updated_at = sueldo1.updated_at;
	sueldo.value.id_docente = sueldo1.id_docente;
	sueldo.value.anio = sueldo1.anio;
	sueldo.value.mes = sueldo1.mes;
	sueldo.value.valor = sueldo1.valor;
	sueldo.value.cobrado = Boolean(sueldo1.cobrado);	
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
	
	const data_json:SueldoReturnView = await nuevoDatosData(props.module,props.controller,sueldo.value);

	emit('handleAction_NuevoDatosView',data_json);
};

const actualizarDatos = async () => {	
	
	tipo_accion.value = Constantes.SELECCIONAR;
		
	const data_json:SueldoReturnView = await actualizarDatosData(props.module,props.controller,sueldo.value);
		
	emit('handleAction_ActualizarDatosView',data_json);
			
};

const eliminarDatos = async () => {
	
	const data_json:SueldoReturnView = await eliminarDatosData(props.module,props.controller,sueldo.value);
	
	emit('handleAction_EliminarDatosView',data_json);		
};

/*FKs*/
const getFks = async () => {
	
	const data:SueldoReturnView = await getFksData(props.module,props.controller);
	
	
	docentesFK.value = data.docentesFK;
};


	defineExpose({
		nuevoPreparar,
		handleAction_ClickTableRow,
		cerrarModalFormGeneral
	});

</script>

<template>

<!-- The Modal -->
<div id="divModal_sueldo_form_general" 
		class="modal_form_general"
		:style="{ display:display }">
	
	<!-- Modal content -->
	<div id="divModalContent_sueldo_form_general" 
		class="modal_form_general_content">
		
		<div class="modal_form_general_header">
			
			<span id="spanCloseModal_sueldo_form_general"
					class="close_modal_form_general" 
					@click="cerrarModalFormGeneral">
				&times;
			</span>
			<h2>
				Sueldo
			</h2>
			
		</div>
		
		<div class="modal_form_general_body">
		
			<div id="div_sueldo_form_general">
			
				<form id="sueldo_form_general" 
					class="form_general">

					<input type="hidden" id="id" name="id" 
							v-model="sueldo.id" />
					
					<label id="label_id" name="label_id" for="text_id_aux" class=""
							style="{{ style_id_column }}">Id</label>				
					<input type="text" id="text_id_aux" name="text_id_aux" 
							class="" style="{{ style_id_column }}"
							v-model="text_id_aux" placeholder="Id" readonly/>
					
					<label for="created_at" class="" style="display:none;">Created At</label>
					<input type="text" id="created_at" name="created_at" style="display:none;" 
							class="" placeholder="Created At"
							v-model="sueldo.created_at" />
					
					<label for="updated_at" class="" style="display:none;">Updated At</label>
					<input type="text" id="updated_at" name="updated_at" style="display:none;"
							class="" placeholder="Updated At"
							v-model="sueldo.updated_at" />
							
					
					<label for="id_docente" class=""> Docente</label>
					<select id="id_docente" name="id_docente"
							class="" placeholder=" Docente"
							v-model="sueldo.id_docente" >
						<option v-for="docente in docentesFK" :key="docente.id" :value="docente.id">
							{{ docente.nombre }}
						</option>
					</select>	
						
					
					<label for="anio" class="">Anio</label>
					<input  type="text" 
							id="anio" name="anio"
							class="" placeholder="Anio"
							v-model="sueldo.anio" />
					
					<label for="mes" class="">Mes</label>
					<input  type="text" 
							id="mes" name="mes"
							class="" placeholder="Mes"
							v-model="sueldo.mes" />
					
					<label for="valor" class="">Valor</label>
					<input  type="text" 
							id="valor" name="valor"
							class="" placeholder="Valor"
							v-model="sueldo.valor" />
					
					<label for="cobrado" class="">Cobrado</label>
					<input  type="checkbox" 
							id="cobrado" name="cobrado" 
							value="true" placeholder="Cobrado"
							class=""
							v-model="sueldo.cobrado" />
						
									
				</form>
				
			</div>
			
			<div id="div_sueldo_actions_form_general">
				
				<form id="sueldo_actions_form_general" 
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
