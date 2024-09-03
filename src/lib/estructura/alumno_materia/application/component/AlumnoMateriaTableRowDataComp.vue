<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {AlumnoMateria} from '@/lib/estructura/alumno_materia/domain/entity/AlumnoMateria';
import {AlumnoMateriaReturnView} from '@/lib/estructura/alumno_materia/application/util/return/AlumnoMateriaReturnView';

import {onClickTableRowData} from '@/lib/estructura/alumno_materia/infrastructure/data/AlumnoMateriaData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	alumno_materia1: {type: AlumnoMateria, default: new AlumnoMateria()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							


const onClickTableRow = async (alumno_materia1: AlumnoMateria) => {		
	
	const data_json:AlumnoMateriaReturnView = await onClickTableRowData(props.module,props.controller,alumno_materia1);

	emit('handleAction_ClickTableRowTableView',data_json.alumno_materia1);		
		
};

</script>

<template>

<tr :key="alumno_materia1.id"
	class=""
	@click="$event => onClickTableRow(alumno_materia1)">
	
	<td data-label="Id" style="{{ style_id_column }}"> {{ alumno_materia1.id }} </td>
	<td data-label="Created At" style="display:none;"> {{ alumno_materia1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ alumno_materia1.updated_at }} </td>
	<td data-label=" Alumno"> {{ alumno_materia1?.alumno?.nombre }} </td>
	<td data-label=" Materia"> {{ alumno_materia1?.materia?.codigo }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
