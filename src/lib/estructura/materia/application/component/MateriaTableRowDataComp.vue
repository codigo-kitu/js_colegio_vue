<script lang="ts" setup>

import {ref, onMounted} from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';
import {FuncionGeneral} from '@/lib/base/util/FuncionGeneral';

import {Materia} from '@/lib/estructura/materia/domain/entity/Materia';
import {MateriaReturnView} from '@/lib/estructura/materia/application/util/return/MateriaReturnView';

import {onClickTableRowData} from '@/lib/estructura/materia/infrastructure/data/MateriaData';


const props = defineProps({
	//------------------ PARAMETROS -------------------
	module: {type: String, default: ''},
	controller: {type: String, default: ''},
	style_id_column: {type: String, default: ''},
	materia1: {type: Materia, default: new Materia()}	
});

const emit = defineEmits(['handleAction_ClickTableRowTableView']);
							

const GetLabelBoolean = (value:string|boolean) => {
	return FuncionGeneral.GetLabelBoolean(value);
};

const onClickTableRow = async (materia1: Materia) => {		
	
	const data_json:MateriaReturnView = await onClickTableRowData(props.module,props.controller,materia1);

	emit('handleAction_ClickTableRowTableView',data_json.materia1);		
		
};

</script>

<template>

<tr :key="materia1.id"
	class=""
	@click="$event => onClickTableRow(materia1)">
	
	<td data-label="Id" style="{{ style_id_column }}"> {{ materia1.id }} </td>
	<td data-label="Created At" style="display:none;"> {{ materia1.created_at }} </td>
	<td data-label="Updated At" style="display:none;"> {{ materia1.updated_at }} </td>
	<td data-label="Codigo"> {{ materia1.codigo }} </td>
	<td data-label="Nombre"> {{ materia1.nombre }} </td>
	<td data-label="Activo" style="text-align:center;"> {{ GetLabelBoolean(materia1.activo) }} </td>

</tr>

</template>

<style lang="scss" scoped>

</style>
