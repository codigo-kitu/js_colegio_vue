<script lang="ts" setup>

import {ref,type PropType,onMounted} from 'vue';
import {useRouter} from 'vue-router';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';
import type {NotaReturnView} from '@/lib/proceso/nota/application/util/return/NotaReturnView';

import type {NotaFKReturnView} from '@/lib/proceso/nota/application/util/return/NotaFKReturnView';

import type {NotaCreateRequest} from '@/lib/proceso/nota/application/util/request/NotaCreateRequest';
import type {NotaUpdateRequest} from '@/lib/proceso/nota/application/util/request/NotaUpdateRequest';

import {nuevoDatosData,
		actualizarDatosData,
		eliminarDatosData
		,
		getFksData
		} from '@/lib/proceso/nota/infrastructure/data/NotaData';

/*FKs*/
import type {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import type {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import type {Docente} from '@/lib/estructura/docente/domain/entity/Docente';


const router = useRouter();


const props = defineProps({
	
	//------------------ ACCIONES -------------------
	module:{type: String, default: ''},
	controller:{type: String, default: ''},
	
	//------------------ DATOS ----------------------
	notas: {type: Array as PropType<Array<Nota>>, default: new Array<Nota>()},
	nota_prop: {type: Nota, default: new Nota()}
});

const emit = defineEmits([	'ocultarMensajeAlertaView','handleAction_NuevoDatosView',
							'handleAction_ActualizarDatosView','handleAction_EliminarDatosView']);
							
//------------------ GENERAL --------------------
let title = ref('Formulario Nota');

//------------------ ACCIONES -------------------
let tipo_accion = ref(Constantes.CANCELAR);

//------------------ ESTILOS -------------------
let display = ref('none');
let style_id_column = ref('');

//------------------ DATOS ----------------------
/*let id = ref(-1);*/
let text_id_aux = ref('-1');

let nota = ref(new Nota());

/*FKs*/

let alumnosFK = ref(new Array<Alumno>());
let materiasFK = ref(new Array<Materia>());
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
	
	
	nota.value.id=-1;
	nota.value.created_at=FuncionGeneral.GetLabelDateTime(new Date());
	nota.value.updated_at=FuncionGeneral.GetLabelDateTime(new Date());
	nota.value.id_alumno=-1;
	nota.value.id_materia=-1;
	nota.value.id_docente=-1;
	nota.value.nota_prueba=0.0;
	nota.value.nota_trabajo=0.0;
	nota.value.nota_examen=0.0;
	nota.value.nota_final=0.0;
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

const handleAction_ClickTableRow = (nota1:Nota) => {
	//ocultarMensajeAlerta();			
	tipo_accion.value = Constantes.SELECCIONAR;			
	abrirModalFormGeneral();
	
	if(Constantes.IS_DEVELOPING == true) {
		text_id_aux.value = nota1.id.toString();
	}
				
	nota.value.id = nota1.id;
	nota.value.created_at = nota1.created_at;
	
	nota.value.updated_at = nota1.updated_at;
	nota.value.id_alumno = nota1.id_alumno;
	nota.value.id_materia = nota1.id_materia;
	nota.value.id_docente = nota1.id_docente;
	nota.value.nota_prueba = nota1.nota_prueba;
	nota.value.nota_trabajo = nota1.nota_trabajo;
	nota.value.nota_examen = nota1.nota_examen;
	nota.value.nota_final = nota1.nota_final;
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
	
	const data_json:NotaReturnView = await nuevoDatosData(props.module,props.controller,nota.value);

	emit('handleAction_NuevoDatosView',data_json);
};

const actualizarDatos = async () => {	
	
	tipo_accion.value = Constantes.SELECCIONAR;
		
	const data_json:NotaReturnView = await actualizarDatosData(props.module,props.controller,nota.value);
		
	emit('handleAction_ActualizarDatosView',data_json);
			
};

const eliminarDatos = async () => {
	
	const data_json:NotaReturnView = await eliminarDatosData(props.module,props.controller,nota.value);
	
	emit('handleAction_EliminarDatosView',data_json);		
};

/*FKs*/
const getFks = async () => {
	
	const data:NotaReturnView = await getFksData(props.module,props.controller);
	
	
	alumnosFK.value = data.alumnosFK;
	materiasFK.value = data.materiasFK;
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
<div id="divModal_nota_form_general" 
		class="modal_form_general"
		:style="{ display:display }">
	
	<!-- Modal content -->
	<div id="divModalContent_nota_form_general" 
		class="modal_form_general_content">
		
		<div class="modal_form_general_header">
			
			<span id="spanCloseModal_nota_form_general"
					class="close_modal_form_general" 
					@click="cerrarModalFormGeneral">
				&times;
			</span>
			<h2>
				Nota
			</h2>
			
		</div>
		
		<div class="modal_form_general_body">
		
			<div id="div_nota_form_general">
			
				<form id="nota_form_general" 
					class="form_general">

					<input type="hidden" id="id" name="id" 
							v-model="nota.id" />
					
					<label id="label_id" name="label_id" for="text_id_aux" class=""
							style="{{ style_id_column }}">Id</label>				
					<input type="text" id="text_id_aux" name="text_id_aux" 
							class="" style="{{ style_id_column }}"
							v-model="text_id_aux" placeholder="Id" readonly/>
					
					<label for="created_at" class="" style="display:none;">Created At</label>
					<input type="text" id="created_at" name="created_at" style="display:none;" 
							class="" placeholder="Created At"
							v-model="nota.created_at" />
					
					<label for="updated_at" class="" style="display:none;">Updated At</label>
					<input type="text" id="updated_at" name="updated_at" style="display:none;"
							class="" placeholder="Updated At"
							v-model="nota.updated_at" />
							
					
					<label for="id_alumno" class=""> Alumno</label>
					<select id="id_alumno" name="id_alumno"
							class="" placeholder=" Alumno"
							v-model="nota.id_alumno" >
						<option v-for="alumno in alumnosFK" :key="alumno.id" :value="alumno.id">
							{{ alumno.nombre }}
						</option>
					</select>	
						
					
					<label for="id_materia" class=""> Materia</label>
					<select id="id_materia" name="id_materia"
							class="" placeholder=" Materia"
							v-model="nota.id_materia" >
						<option v-for="materia in materiasFK" :key="materia.id" :value="materia.id">
							{{ materia.codigo }}
						</option>
					</select>	
						
					
					<label for="id_docente" class=""> Docente</label>
					<select id="id_docente" name="id_docente"
							class="" placeholder=" Docente"
							v-model="nota.id_docente" >
						<option v-for="docente in docentesFK" :key="docente.id" :value="docente.id">
							{{ docente.nombre }}
						</option>
					</select>	
						
					
					<label for="nota_prueba" class="">Nota Prueba</label>
					<input  type="text" 
							id="nota_prueba" name="nota_prueba"
							class="" placeholder="Nota Prueba"
							v-model="nota.nota_prueba" />
					
					<label for="nota_trabajo" class="">Nota Trabajo</label>
					<input  type="text" 
							id="nota_trabajo" name="nota_trabajo"
							class="" placeholder="Nota Trabajo"
							v-model="nota.nota_trabajo" />
					
					<label for="nota_examen" class="">Nota Examen</label>
					<input  type="text" 
							id="nota_examen" name="nota_examen"
							class="" placeholder="Nota Examen"
							v-model="nota.nota_examen" />
					
					<label for="nota_final" class="">Nota Final</label>
					<input  type="text" 
							id="nota_final" name="nota_final"
							class="" placeholder="Nota Final"
							v-model="nota.nota_final" />
									
				</form>
				
			</div>
			
			<div id="div_nota_actions_form_general">
				
				<form id="nota_actions_form_general" 
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
