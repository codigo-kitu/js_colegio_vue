<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Alumno} from '@/lib/estructura/alumno/domain/entity/Alumno';
import {AlumnoReturnView} from '@/lib/estructura/alumno/application/util/return/AlumnoReturnView';

import {onClickTableRowData} from '@/lib/estructura/alumno/infrastructure/data/AlumnoData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	alumno1: {type: Alumno, default: new Alumno()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							


const onClickTableRow = async (alumno1: Alumno) => {		
	
	const data_json:AlumnoReturnView = await onClickTableRowData(props.module,props.controller,alumno1);

	emit('handleAction_ClickTableRowTableView',data_json.alumno1);		
		
};

</script>

<template>

<tr :key="alumno1.id"
	class=""
	@click="$event => onClickTableRow(alumno1)">
	
	<td data-label="Id" style="{{ style_id_column }}"> {{ alumno1.id }} </td>
	<td data-label="Created At" style="display:none;"> {{ alumno1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ alumno1.updated_at }} </td>
	<td data-label="Nombre"> {{ alumno1.nombre }} </td>
	<td data-label="Apellido"> {{ alumno1.apellido }} </td>
	<td data-label="Fecha Nacimiento"> {{ alumno1.fecha_nacimiento }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
