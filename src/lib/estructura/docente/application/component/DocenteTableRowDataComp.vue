<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Docente} from '@/lib/estructura/docente/domain/entity/Docente';
import {DocenteReturnView} from '@/lib/estructura/docente/application/util/return/DocenteReturnView';

import {onClickTableRowData} from '@/lib/estructura/docente/infrastructure/data/DocenteData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	docente1: {type: Docente, default: new Docente()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							


const onClickTableRow = async (docente1: Docente) => {		
	
	const data_json:DocenteReturnView = await onClickTableRowData(props.module,props.controller,docente1);

	emit('handleAction_ClickTableRowTableView',data_json.docente1);		
		
};

</script>

<template>

<tr :key="docente1.id"
	class=""
	@click="$event => onClickTableRow(docente1)">
	
	<td data-label="Id" style="{{ style_id_column }}"> {{ docente1.id }} </td>
	<td data-label="Created At" style="display:none;"> {{ docente1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ docente1.updated_at }} </td>
	<td data-label="Nombre"> {{ docente1.nombre }} </td>
	<td data-label="Apellido"> {{ docente1.apellido }} </td>
	<td data-label="Fecha Nacimiento"> {{ docente1.fecha_nacimiento }} </td>
	<td data-label="Anios Experiencia" style="text-align:center;"> {{ docente1.anios_experiencia }} </td>
	<td data-label="Nota Evaluacion" style="text-align:center;"> {{ docente1.nota_evaluacion }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
