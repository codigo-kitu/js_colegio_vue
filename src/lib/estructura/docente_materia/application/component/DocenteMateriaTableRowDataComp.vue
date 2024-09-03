<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {DocenteMateria} from '@/lib/estructura/docente_materia/domain/entity/DocenteMateria';
import {DocenteMateriaReturnView} from '@/lib/estructura/docente_materia/application/util/return/DocenteMateriaReturnView';

import {onClickTableRowData} from '@/lib/estructura/docente_materia/infrastructure/data/DocenteMateriaData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	docente_materia1: {type: DocenteMateria, default: new DocenteMateria()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							


const onClickTableRow = async (docente_materia1: DocenteMateria) => {		
	
	const data_json:DocenteMateriaReturnView = await onClickTableRowData(props.module,props.controller,docente_materia1);

	emit('handleAction_ClickTableRowTableView',data_json.docente_materia1);		
		
};

</script>

<template>

<tr :key="docente_materia1.id"
	class=""
	@click="$event => onClickTableRow(docente_materia1)">
	
	<td data-label="Id" style="{{ style_id_column }}"> {{ docente_materia1.id }} </td>
	<td data-label="Created At" style="display:none;"> {{ docente_materia1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ docente_materia1.updated_at }} </td>
	<td data-label=" Docente"> {{ docente_materia1?.docente?.nombre }} </td>
	<td data-label=" Materia"> {{ docente_materia1?.materia?.codigo }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
