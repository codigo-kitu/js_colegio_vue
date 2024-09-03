<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Contrato} from '@/lib/financiero/contrato/domain/entity/Contrato';
import {ContratoReturnView} from '@/lib/financiero/contrato/application/util/return/ContratoReturnView';

import {onClickTableRowData} from '@/lib/financiero/contrato/infrastructure/data/ContratoData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	contrato1: {type: Contrato, default: new Contrato()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							

const GetLabelBoolean = (value:string|boolean) => {
	return FuncionGeneral.GetLabelBoolean(value);
};

const onClickTableRow = async (contrato1: Contrato) => {		
	
	const data_json:ContratoReturnView = await onClickTableRowData(props.module,props.controller,contrato1);

	emit('handleAction_ClickTableRowTableView',data_json.contrato1);		
		
};

</script>

<template>

<tr :key="contrato1.id"
	class=""
	@click="$event => onClickTableRow(contrato1)">
	
	<td data-label="" style="{{ style_id_column }}"> {{ contrato1?.docente?.nombre }} </td>
	<td data-label="Created At" style="display:none;"> {{ contrato1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ contrato1.updated_at }} </td>
	<td data-label="Anio" style="text-align:center;"> {{ contrato1.anio }} </td>
	<td data-label="Valor" style="text-align:center;"> {{ contrato1.valor }} </td>
	<td data-label="Fecha"> {{ contrato1.fecha }} </td>
	<td data-label="Firmado" style="text-align:center;"> {{ GetLabelBoolean(contrato1.firmado) }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
