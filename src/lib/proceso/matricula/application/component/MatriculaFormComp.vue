<script lang="ts" setup>

import {ref,type PropType,onMounted} from 'vue';
import {useRouter} from 'vue-router';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Matricula} from '@/lib/proceso/matricula/domain/entity/Matricula';
import type {MatriculaReturnView} from '@/lib/proceso/matricula/application/util/return/MatriculaReturnView';

import type {MatriculaFKReturnView} from '@/lib/proceso/matricula/application/util/return/MatriculaFKReturnView';

import type {MatriculaCreateRequest} from '@/lib/proceso/matricula/application/util/request/MatriculaCreateRequest';
import type {MatriculaUpdateRequest} from '@/lib/proceso/matricula/application/util/request/MatriculaUpdateRequest';

import {nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		,
		getFksData
		} from '@/lib/proceso/matricula/infrastructure/data/MatriculaData';

/*FKs*/
import type {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';


const router = useRouter();


const props = defineProps({
	
	//------------------ ACCIONES -------------------
	module:{type: String, default: ''},
	controller:{type: String, default: ''},
	
	//------------------ DATOS ----------------------
	matriculas: {type: Array as PropType<Array<Matricula>>, default: new Array<Matricula>()},
	matricula_prop: {type: Matricula, default: new Matricula()}
});

const emit = defineEmits([	'ocultarMensajeAlertaView','handleAction_NuevoDatosView',
							'handleAction_ActualizarDatosView','handleAction_EliminarDatosView']);
							
//------------------ GENERAL --------------------
let title = ref('Formulario Matricula');

//------------------ ACCIONES -------------------
let tipo_accion = ref(Constantes.CANCELAR);

//------------------ ESTILOS -------------------
let display = ref('none');
let style_id_column = ref('');

//------------------ DATOS ----------------------
/*let id = ref(-1);*/
let text_id_aux = ref('-1');

let matricula = ref(new Matricula());

/*FKs*/

let alumnosFK = ref(new Array<Alumno>());

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
	
	
	matricula.value.id=-1;
	matricula.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	matricula.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	matricula.value.anio=0;
	matricula.value.costo=0.0;
	matricula.value.fecha=FuncionGeneral.GetLabelDate(new Date());
	matricula.value.pagado=false;
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

const handleAction_ClickTableRow = (matricula1:Matricula) => {
	//ocultarMensajeAlerta();			
	tipo_accion.value = Constantes.SELECCIONAR;			
	abrirModalFormGeneral();
	
	if(Constantes.IS_DEVELOPING == true) {
		text_id_aux.value = matricula1.id.toString();
	}
				
	matricula.value.id = matricula1.id;
	matricula.value.created_at = matricula1.created_at;
	
	matricula.value.updated_at = matricula1.updated_at;
	matricula.value.anio = matricula1.anio;
	matricula.value.costo = matricula1.costo;
	matricula.value.fecha = matricula1.fecha;
	
	matricula.value.pagado = Boolean(matricula1.pagado);	
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
	
	const data_json:MatriculaReturnView = await nuevoDatosData(props.module,props.controller,matricula.value);

	emit('handleAction_NuevoDatosView',data_json);
};

const actualizarDatos = async () => {	
	
	tipo_accion.value = Constantes.SELECCIONAR;
		
	const data_json:MatriculaReturnView = await actualizarDatosData(props.module,props.controller,matricula.value);
		
	emit('handleAction_ActualizarDatosView',data_json);
			
};

const eliminarDatos = async () => {
	
	const data_json:MatriculaReturnView = await eliminarDatosData(props.module,props.controller,matricula.value);
	
	emit('handleAction_EliminarDatosView',data_json);		
};

/*FKs*/
const getFks = async () => {
	
	const data:MatriculaReturnView = await getFksData(props.module,props.controller);
	
	
	alumnosFK.value = data.alumnosFK;
};


	defineExpose({
		nuevoPreparar,
		handleAction_ClickTableRow,
		cerrarModalFormGeneral
	});

</script>

<template>

<!-- The Modal -->
<div id="divModal_matricula_form_general" 
		class="modal_form_general"
		:style="{ display:display }">
	
	<!-- Modal content -->
	<div id="divModalContent_matricula_form_general" 
		class="modal_form_general_content">
		
		<div class="modal_form_general_header">
			
			<span id="spanCloseModal_matricula_form_general"
					class="close_modal_form_general" 
					@click="cerrarModalFormGeneral">
				&times;
			</span>
			<h2>
				Matricula
			</h2>
			
		</div>
		
		<div class="modal_form_general_body">
		
			<div id="div_matricula_form_general">
			
				<form id="matricula_form_general" 
					class="form_general">

					<input type="hidden" id="id" name="id" 
							v-model="matricula.id" />
					
					<label id="label_id" name="label_id" for="text_id_aux" class=""
							style="{{ style_id_column }}">Id</label>				
					<input type="text" id="text_id_aux" name="text_id_aux" 
							class="" style="{{ style_id_column }}"
							v-model="text_id_aux" placeholder="Id" readonly/>
					
					<label for="created_at" class="" style="display:none;">Created At</label>
					<input type="text" id="created_at" name="created_at" style="display:none;" 
							class="" placeholder="Created At"
							v-model="matricula.created_at" />
					
					<label for="updated_at" class="" style="display:none;">Updated At</label>
					<input type="text" id="updated_at" name="updated_at" style="display:none;"
							class="" placeholder="Updated At"
							v-model="matricula.updated_at" />
							
					
					<label for="anio" class="">Anio</label>
					<input  type="text" 
							id="anio" name="anio"
							class="" placeholder="Anio"
							v-model="matricula.anio" />
					
					<label for="costo" class="">Costo</label>
					<input  type="text" 
							id="costo" name="costo"
							class="" placeholder="Costo"
							v-model="matricula.costo" />
					
					<label for="fecha" class="">Fecha</label>
					<input  type="date" 
							id="fecha" name="fecha"
							class="" placeholder="Fecha"
							v-model="matricula.fecha" />
					
					<label for="pagado" class="">Pagado</label>
					<input  type="checkbox" 
							id="pagado" name="pagado" 
							value="true" placeholder="Pagado"
							class=""
							v-model="matricula.pagado" />
						
									
				</form>
				
			</div>
			
			<div id="div_matricula_actions_form_general">
				
				<form id="matricula_actions_form_general" 
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
