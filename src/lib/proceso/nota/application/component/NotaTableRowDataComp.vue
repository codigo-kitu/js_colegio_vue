<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Nota} from '@/lib/proceso/nota/domain/entity/Nota';
import {NotaReturnView} from '@/lib/proceso/nota/application/util/return/NotaReturnView';

import {onClickTableRowData} from '@/lib/proceso/nota/infrastructure/data/NotaData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	nota1: {type: Nota, default: new Nota()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							


const onClickTableRow = async (nota1: Nota) => {		
	
	const data_json:NotaReturnView = await onClickTableRowData(props.module,props.controller,nota1);

	emit('handleAction_ClickTableRowTableView',data_json.nota1);		
		
};

</script>

<template>

<tr :key="nota1.id"
	class=""
	@click="$event => onClickTableRow(nota1)">
	
	<td data-label="Id" style="{{ style_id_column }}"> {{ nota1.id }} </td>
	<td data-label="Created At" style="display:none;"> {{ nota1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ nota1.updated_at }} </td>
	<td data-label=" Alumno"> {{ nota1?.alumno?.nombre }} </td>
	<td data-label=" Materia"> {{ nota1?.materia?.codigo }} </td>
	<td data-label=" Docente"> {{ nota1?.docente?.nombre }} </td>
	<td data-label="Nota Prueba" style="text-align:center;"> {{ nota1.nota_prueba }} </td>
	<td data-label="Nota Trabajo" style="text-align:center;"> {{ nota1.nota_trabajo }} </td>
	<td data-label="Nota Examen" style="text-align:center;"> {{ nota1.nota_examen }} </td>
	<td data-label="Nota Final" style="text-align:center;"> {{ nota1.nota_final }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
