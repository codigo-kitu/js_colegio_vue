<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Matricula} from '@/lib/proceso/matricula/domain/entity/Matricula';
import {MatriculaReturnView} from '@/lib/proceso/matricula/application/util/return/MatriculaReturnView';

import {onClickTableRowData} from '@/lib/proceso/matricula/infrastructure/data/MatriculaData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	matricula1: {type: Matricula, default: new Matricula()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							

const GetLabelBoolean = (value:string|boolean) => {
	return FuncionGeneral.GetLabelBoolean(value);
};

const onClickTableRow = async (matricula1: Matricula) => {		
	
	const data_json:MatriculaReturnView = await onClickTableRowData(props.module,props.controller,matricula1);

	emit('handleAction_ClickTableRowTableView',data_json.matricula1);		
		
};

</script>

<template>

<tr :key="matricula1.id"
	class=""
	@click="$event => onClickTableRow(matricula1)">
	
	<td data-label="" style="{{ style_id_column }}"> {{ matricula1?.alumno?.nombre }} </td>
	<td data-label="Created At" style="display:none;"> {{ matricula1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ matricula1.updated_at }} </td>
	<td data-label="Anio" style="text-align:center;"> {{ matricula1.anio }} </td>
	<td data-label="Costo" style="text-align:center;"> {{ matricula1.costo }} </td>
	<td data-label="Fecha"> {{ matricula1.fecha }} </td>
	<td data-label="Pagado" style="text-align:center;"> {{ GetLabelBoolean(matricula1.pagado) }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
