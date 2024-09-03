<script lang="ts" setup>

import {ref,type PropType,onMounted} from 'vue';
import {useRouter} from 'vue-router';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';
import type {ContratoReturnView} from '@/lib/financiero/contrato/application/util/return/ContratoReturnView';

import type {ContratoFKReturnView} from '@/lib/financiero/contrato/application/util/return/ContratoFKReturnView';

import type {ContratoCreateRequest} from '@/lib/financiero/contrato/application/util/request/ContratoCreateRequest';
import type {ContratoUpdateRequest} from '@/lib/financiero/contrato/application/util/request/ContratoUpdateRequest';

import {nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		,
		getFksData
		} from '@/lib/financiero/contrato/infrastructure/data/ContratoData';

/*FKs*/
import type {Docente} from '@/lib/estructura/docente/domain/entity/Docente';


const router = useRouter();


const props = defineProps({
	
	//------------------ ACCIONES -------------------
	module:{type: String, default: ''},
	controller:{type: String, default: ''},
	
	//------------------ DATOS ----------------------
	contratos: {type: Array as PropType<Array<Contrato>>, default: new Array<Contrato>()},
	contrato_prop: {type: Contrato, default: new Contrato()}
});

const emit = defineEmits([	'ocultarMensajeAlertaView','handleAction_NuevoDatosView',
							'handleAction_ActualizarDatosView','handleAction_EliminarDatosView']);
							
//------------------ GENERAL --------------------
let title = ref('Formulario Contrato');

//------------------ ACCIONES -------------------
let tipo_accion = ref(Constantes.CANCELAR);

//------------------ ESTILOS -------------------
let display = ref('none');
let style_id_column = ref('');

//------------------ DATOS ----------------------
/*let id = ref(-1);*/
let text_id_aux = ref('-1');

let contrato = ref(new Contrato());

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
	
	
	contrato.value.id=-1;
	contrato.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	contrato.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	contrato.value.anio=0;
	contrato.value.valor=0.0;
	contrato.value.fecha=FuncionGeneral.GetLabelDate(new Date());
	contrato.value.firmado=false;
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

const handleAction_ClickTableRow = (contrato1:Contrato) => {
	//ocultarMensajeAlerta();			
	tipo_accion.value = Constantes.SELECCIONAR;			
	abrirModalFormGeneral();
	
	if(Constantes.IS_DEVELOPING == true) {
		text_id_aux.value = contrato1.id.toString();
	}
				
	contrato.value.id = contrato1.id;
	contrato.value.created_at = contrato1.created_at;
	
	contrato.value.updated_at = contrato1.updated_at;
	contrato.value.anio = contrato1.anio;
	contrato.value.valor = contrato1.valor;
	contrato.value.fecha = contrato1.fecha;
	
	contrato.value.firmado = Boolean(contrato1.firmado);	
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
	
	const data_json:ContratoReturnView = await nuevoDatosData(props.module,props.controller,contrato.value);

	emit('handleAction_NuevoDatosView',data_json);
};

const actualizarDatos = async () => {	
	
	tipo_accion.value = Constantes.SELECCIONAR;
		
	const data_json:ContratoReturnView = await actualizarDatosData(props.module,props.controller,contrato.value);
		
	emit('handleAction_ActualizarDatosView',data_json);
			
};

const eliminarDatos = async () => {
	
	const data_json:ContratoReturnView = await eliminarDatosData(props.module,props.controller,contrato.value);
	
	emit('handleAction_EliminarDatosView',data_json);		
};

/*FKs*/
const getFks = async () => {
	
	const data:ContratoReturnView = await getFksData(props.module,props.controller);
	
	
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
<div id="divModal_contrato_form_general" 
		class="modal_form_general"
		:style="{ display:display }">
	
	<!-- Modal content -->
	<div id="divModalContent_contrato_form_general" 
		class="modal_form_general_content">
		
		<div class="modal_form_general_header">
			
			<span id="spanCloseModal_contrato_form_general"
					class="close_modal_form_general" 
					@click="cerrarModalFormGeneral">
				&times;
			</span>
			<h2>
				Contrato
			</h2>
			
		</div>
		
		<div class="modal_form_general_body">
		
			<div id="div_contrato_form_general">
			
				<form id="contrato_form_general" 
					class="form_general">

					<input type="hidden" id="id" name="id" 
							v-model="contrato.id" />
					
					<label id="label_id" name="label_id" for="text_id_aux" class=""
							style="{{ style_id_column }}">Id</label>				
					<input type="text" id="text_id_aux" name="text_id_aux" 
							class="" style="{{ style_id_column }}"
							v-model="text_id_aux" placeholder="Id" readonly/>
					
					<label for="created_at" class="" style="display:none;">Created At</label>
					<input type="text" id="created_at" name="created_at" style="display:none;" 
							class="" placeholder="Created At"
							v-model="contrato.created_at" />
					
					<label for="updated_at" class="" style="display:none;">Updated At</label>
					<input type="text" id="updated_at" name="updated_at" style="display:none;"
							class="" placeholder="Updated At"
							v-model="contrato.updated_at" />
							
					
					<label for="anio" class="">Anio</label>
					<input  type="text" 
							id="anio" name="anio"
							class="" placeholder="Anio"
							v-model="contrato.anio" />
					
					<label for="valor" class="">Valor</label>
					<input  type="text" 
							id="valor" name="valor"
							class="" placeholder="Valor"
							v-model="contrato.valor" />
					
					<label for="fecha" class="">Fecha</label>
					<input  type="date" 
							id="fecha" name="fecha"
							class="" placeholder="Fecha"
							v-model="contrato.fecha" />
					
					<label for="firmado" class="">Firmado</label>
					<input  type="checkbox" 
							id="firmado" name="firmado" 
							value="true" placeholder="Firmado"
							class=""
							v-model="contrato.firmado" />
						
									
				</form>
				
			</div>
			
			<div id="div_contrato_actions_form_general">
				
				<form id="contrato_actions_form_general" 
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
