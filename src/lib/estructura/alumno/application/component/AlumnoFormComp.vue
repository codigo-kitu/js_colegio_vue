<script lang="ts" setup>

import {ref,type PropType} from 'vue';
import {useRouter} from 'vue-router';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import type {AlumnoReturnView} from '@/lib/estructura/alumno/application/util/return/AlumnoReturnView';


import type {AlumnoCreateRequest} from '@/lib/estructura/alumno/application/util/request/AlumnoCreateRequest';
import type {AlumnoUpdateRequest} from '@/lib/estructura/alumno/application/util/request/AlumnoUpdateRequest';

import {nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		} from '@/lib/estructura/alumno/infrastructure/data/AlumnoData';

/*FKs*/


const router = useRouter();


const props = defineProps({
	
	//------------------ ACCIONES -------------------
	module:{type: String, default: ''},
	controller:{type: String, default: ''},
	
	//------------------ DATOS ----------------------
	alumnos: {type: Array as PropType<Array<Alumno>>, default: new Array<Alumno>()},
	alumno_prop: {type: Alumno, default: new Alumno()}
});

const emit = defineEmits([	'ocultarMensajeAlertaView','handleAction_NuevoDatosView',
							'handleAction_ActualizarDatosView','handleAction_EliminarDatosView']);
							
//------------------ GENERAL --------------------
let title = ref('Formulario Alumno');

//------------------ ACCIONES -------------------
let tipo_accion = ref(Constantes.CANCELAR);

//------------------ ESTILOS -------------------
let display = ref('none');
let style_id_column = ref('');

//------------------ DATOS ----------------------
/*let id = ref(-1);*/
let text_id_aux = ref('-1');

let alumno = ref(new Alumno());


let aux = ref("aux");

	
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
	
	
	alumno.value.id=-1;
	alumno.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	alumno.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	alumno.value.nombre='';
	alumno.value.apellido='';
	alumno.value.fecha_nacimiento=FuncionGeneral.GetLabelDate(new Date());
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

const handleAction_ClickTableRow = (alumno1:Alumno) => {
	//ocultarMensajeAlerta();			
	tipo_accion.value = Constantes.SELECCIONAR;			
	abrirModalFormGeneral();
	
	if(Constantes.IS_DEVELOPING == true) {
		text_id_aux.value = alumno1.id.toString();
	}
				
	alumno.value.id = alumno1.id;
	alumno.value.created_at = alumno1.created_at;
	
	alumno.value.updated_at = alumno1.updated_at;
	alumno.value.nombre = alumno1.nombre;
	alumno.value.apellido = alumno1.apellido;
	alumno.value.fecha_nacimiento = alumno1.fecha_nacimiento;
	
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
	
	const data_json:AlumnoReturnView = await nuevoDatosData(props.module,props.controller,alumno.value);

	emit('handleAction_NuevoDatosView',data_json);
};

const actualizarDatos = async () => {	
	
	tipo_accion.value = Constantes.SELECCIONAR;
		
	const data_json:AlumnoReturnView = await actualizarDatosData(props.module,props.controller,alumno.value);
		
	emit('handleAction_ActualizarDatosView',data_json);
			
};

const eliminarDatos = async () => {
	
	const data_json:AlumnoReturnView = await eliminarDatosData(props.module,props.controller,alumno.value);
	
	emit('handleAction_EliminarDatosView',data_json);		
};


	defineExpose({
		nuevoPreparar,
		handleAction_ClickTableRow,
		cerrarModalFormGeneral
	});

</script>

<template>

<!-- The Modal -->
<div id="divModal_alumno_form_general" 
		class="modal_form_general"
		:style="{ display:display }">
	
	<!-- Modal content -->
	<div id="divModalContent_alumno_form_general" 
		class="modal_form_general_content">
		
		<div class="modal_form_general_header">
			
			<span id="spanCloseModal_alumno_form_general"
					class="close_modal_form_general" 
					@click="cerrarModalFormGeneral">
				&times;
			</span>
			<h2>
				Alumno
			</h2>
			
		</div>
		
		<div class="modal_form_general_body">
		
			<div id="div_alumno_form_general">
			
				<form id="alumno_form_general" 
					class="form_general">

					<input type="hidden" id="id" name="id" 
							v-model="alumno.id" />
					
					<label id="label_id" name="label_id" for="text_id_aux" class=""
							style="{{ style_id_column }}">Id</label>				
					<input type="text" id="text_id_aux" name="text_id_aux" 
							class="" style="{{ style_id_column }}"
							v-model="text_id_aux" placeholder="Id" readonly/>
					
					<label for="created_at" class="" style="display:none;">Created At</label>
					<input type="text" id="created_at" name="created_at" style="display:none;" 
							class="" placeholder="Created At"
							v-model="alumno.created_at" />
					
					<label for="updated_at" class="" style="display:none;">Updated At</label>
					<input type="text" id="updated_at" name="updated_at" style="display:none;"
							class="" placeholder="Updated At"
							v-model="alumno.updated_at" />
							
					
					<label for="nombre" class="">Nombre</label>
					<input  type="text" 
							id="nombre" name="nombre"
							class="" placeholder="Nombre"
							v-model="alumno.nombre" />
					
					<label for="apellido" class="">Apellido</label>
					<input  type="text" 
							id="apellido" name="apellido"
							class="" placeholder="Apellido"
							v-model="alumno.apellido" />
					
					<label for="fecha_nacimiento" class="">Fecha Nacimiento</label>
					<input  type="date" 
							id="fecha_nacimiento" name="fecha_nacimiento"
							class="" placeholder="Fecha Nacimiento"
							v-model="alumno.fecha_nacimiento" />
									
				</form>
				
			</div>
			
			<div id="div_alumno_actions_form_general">
				
				<form id="alumno_actions_form_general" 
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
