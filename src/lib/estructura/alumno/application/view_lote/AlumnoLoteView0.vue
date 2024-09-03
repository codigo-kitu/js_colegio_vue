<template>
 
<div id="divLoteViewGlobalalumno">

    <div id="div_alumno_form_general">
			
        <form id="alumno_form_general" 
            class="form_general">
            
            <label id="label_id" name="label_id" for="id">Id</label>
            <input type="text" id="id" name="id" placeholder="Id"
                    v-model="alumno.id" :disabled="form_deshabilitado"/>
            
            <label for="created_at">Created At</label>
            <input type="text" id="created_at" name="created_at" placeholder="Created At"
                    v-model="alumno.created_at" :disabled="form_deshabilitado"/>
            
            <label for="updated_at">Updated At</label>
            <input type="text" id="updated_at" name="updated_at" placeholder="Updated At"
                    v-model="alumno.updated_at" :disabled="form_deshabilitado"/>
                                
            <label for="nombre">Nombre</label>
            <input  type="text" 
                    id="nombre" name="nombre" placeholder="Nombre"
                    v-model="alumno.nombre" :disabled="form_deshabilitado"/>
            
            <label for="apellido">Apellido</label>
            <input  type="text" 
                    id="apellido" name="apellido" placeholder="Apellido"
                    v-model="alumno.apellido" :disabled="form_deshabilitado"/>
            
            <label for="fecha_nacimiento">Fecha Nacimiento</label>
            <input  type="date" 
                    id="fecha_nacimiento" name="fecha_nacimiento" placeholder="Fecha Nacimiento"
                    v-model="alumno.fecha_nacimiento" :disabled="form_deshabilitado"/>

        </form>
        
    </div>

    <div id="div_alumno_actions_form_general">
				
        <form id="alumno_actions_form_general" 
            class="actions_form_general">				
            
            <button type="button" id="recargar_button" name="recargar_button" 
					value="Recargar" class="button_general" 
					@click="getTodosDatos">
				<i class="fa fa-fw fa-sync"></i>
				Recargar
			</button>
			
			<button type="button" id="nuevo_preparar_button" name="nuevo_preparar_button" 
					value="Nuevo" class="button_general"                     
					@click="nuevoPreparar"
                    :style="{ display:nuevo_preparar_display }">
				<i class="fa fa-fw fa-plus-circle"></i>
				Nuevo
			</button>

            <button type="button" id="actualizar_button" name="actualizar_button" 
                    class="button_general" value="Actualizar"                     
                    @click="actualizar"
                    :style="{ display:actualizar_display }">
                <i class="fa fa-fw fa-save"></i>
                Actualizar
            </button>
            
            <button type="button" id="eliminar_button" name="eliminar_button" 
                    class="button_general" value="Eliminar"                     
                    @click="eliminar"
                    :style="{ display:eliminar_display }">
                <i class="fa fa-fw fa-times-circle"></i>
                Eliminar
            </button>
            
            <button type="button" id="cancelar_button" name="cancelar_button" 
                    class="button_general" value="Cancelar"
                    @click="cancelar">
                <i class="fa fa-fw fa-minus-circle"></i>
                Cancelar
            </button>
            
            <button type="button" id="guardar_button" name="guardar_button" 
                    class="button_general" value="Guardar"
                    @click="guardar">
                <i class="fa fa-fw fa-minus-circle"></i>
                Guardar
            </button>
        </form>
        
    </div>


    <div id="div_alumno_tabla_general">					
				
		<table id="alumno_tabla_general" class="table_general">
			
			<thead>
				<tr>					
					<th>Id</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Fecha Nacimiento</th>
				</tr>
			</thead>
			
			<tbody>																
				<tr v-for="alumno1 in alumnos" :key="alumno1.id" @click="onClickRowTable(alumno1.id)">						
					<td data-label="Id"> {{ alumno1.id }} </td>
					<td data-label="Created At"> {{ alumno1.created_at }} </td>
					<td data-label="Updated At"> {{ alumno1.updated_at }} </td>
					<td data-label="Nombre"> {{ alumno1.nombre }} </td>
					<td data-label="Apellido"> {{ alumno1.apellido }} </td>
					<td data-label="Fecha Nacimiento"> {{ alumno1.fecha_nacimiento }} </td>
				</tr>						
			</tbody>
			
		</table>
	</div>		

</div>

</template>


<script lang="ts">

import {defineComponent} from 'vue';

import {Constantes} from '@/ts/general/util/Constantes';
import {FuncionGeneral} from '@/ts/general/util/FuncionGeneral';

import {Alumno} from "@/ts/entity/estructura/Alumno";

import type {AlumnoParamCreate} from "@/ts/type/estructura/alumno/AlumnoParamCreate";
import type {AlumnoParamUpdate} from "@/ts/type/estructura/alumno/AlumnoParamUpdate";

export default defineComponent({

    name: 'AlumnoLoteView',

    data() {
		
		return {
            titulo: 'Alumnos Lote',

            module : "estructura",
			controller : "alumno_api",

            
            alumnos : new Array<Alumno>(),
			alumno : new Alumno(),

            id_new : 0,
            alumnos_eliminar : new Array<Alumno>(),

            accion: 'CANCELAR',

            form_deshabilitado:true,
            nuevo_preparar_display: 'block',
            actualizar_display: 'none',
            eliminar_display: 'none'
        }
    },
    methods : {
		
        onClickRowTable : async function(id:number){

            let alumno2:Alumno | undefined = this.alumnos.find(alumno1 => alumno1.id==id);

            Object.assign(this.alumno,alumno2);

            this.form_deshabilitado=false;

            this.nuevo_preparar_display= 'none';
            this.actualizar_display='block';
            this.eliminar_display= 'block'; 

            this.accion='ACTUALIZAR';
            //console.log('onClickRowTable');
        },		
		getTodosDatos : async function() {
            this.alumnos = new Array<Alumno>();

            let data_json = {
                pagination: {
                    skip:'0',
                    limit:'10'
                }
            };
            
            let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
            
            let url_controller = FuncionGeneral.GetUrlGlobalController(this.module,this.controller,Constantes.RJ_TODOS);
                        
            const response_json = await fetch(url_controller, request_options);

            const data = await response_json.json();

            console.log(data);

            this.alumnos = data.alumnos;

			//console.log('getTodosDatosParent');
		},		
		nuevoPreparar : function() {
			//console.log('nuevoPrepararParent');

            this.alumno = new Alumno();
            this.alumno.fecha_nacimiento='2021-01-01';

            this.id_new--;
            this.alumno.id=this.id_new;
            
            this.accion='NUEVO';

            this.form_deshabilitado=false;

            this.nuevo_preparar_display= 'none';
            this.actualizar_display='block';
            this.eliminar_display= 'none'; 
		},
        

        cancelar : function() {
            this.alumno = new Alumno();
            //console.log('cancelar');

            this.accion='CANCELAR';

            this.form_deshabilitado=true;

            this.nuevo_preparar_display= 'block';
            this.actualizar_display='none';   
            this.eliminar_display= 'none';         
            
        },
        actualizar : function() {

            if(this.accion==='NUEVO') {
                this.alumno.id=this.id_new;
                this.alumnos.push(this.alumno);                

                this.cancelar();                

            } else if(this.accion==='ACTUALIZAR') {
                //console.log('actualizar');
                
                for(let alumno1 of this.alumnos) {
                    if(alumno1.id == this.alumno.id) {
                        Object.assign(alumno1,this.alumno);
                        break;
                    }
                }                

                this.cancelar();
            }

            //console.log('actualizar');
        },
        eliminar : function() {	

            let alumnos2 = this.alumnos.filter((alumno1, index, arr) => { 
                return alumno1.id != this.alumno.id;
            });

            this.alumnos = alumnos2;

            if(this.alumno.id>0) {
                this.alumnos_eliminar.push(this.alumno);
            }

            this.cancelar();
            //console.log('eliminar');
        },
        guardar : async function() {	

            let data_json= this.prepararGuardarCambios_alumno_materia();

            let request_options = FuncionGeneral.GetRequestOptions('POST',data_json);			
            
            let url_controller = FuncionGeneral.GetUrlGlobalController(this.module,this.controller,'guardar_cambios');                                    
            
            let response_json = await fetch(url_controller, request_options);                
    
            let response_data = await response_json.json();
            
            console.log(response_data);            

            alert('Cambios Guardados');
        },
        prepararGuardarCambios_alumno_materia : function () {
            let data_json_final = {};
            
            let alumnos_nuevos = [];
            let alumnos_nuevos_final = [];

            let alumnos_actualizars = [];
            let ids_alumnos_eliminars = [];
            
            let updates_columnas =['nombre','apellido'];

            alumnos_nuevos = this.alumnos.filter((alumno1:Alumno, index, arr) => { 
                return alumno1.id < 0 ;
            });

            alumnos_nuevos_final = this.getAlumnosNuevosFinal(alumnos_nuevos);

            alumnos_actualizars = this.alumnos.filter((alumno1, index, arr) => { 
                return alumno1.id > 0 ;
            });

            ids_alumnos_eliminars = this.getIdsAlumnosEliminars();
            
            
            data_json_final = {
                news_alumnos : alumnos_nuevos_final,
                updates_alumnos : alumnos_actualizars,
                updates_columnas : updates_columnas,
                ids_deletes_alumnos: ids_alumnos_eliminars
            };
                
            console.log(data_json_final);
            
            return data_json_final;
        },
        getIdsAlumnosEliminars : function() {
            let ids_alumnos_eliminars:Array<number> = [];
        
            for(let alumno1 of this.alumnos_eliminar) {
                ids_alumnos_eliminars.push(alumno1.id);
            }

            return ids_alumnos_eliminars;
		},
        getAlumnosNuevosFinal : function(alumnos_nuevos:Array<Alumno>) {
            let alumnos_nuevos_final:Array<AlumnoParamCreate> = [];
            
            for(let alumno1 of alumnos_nuevos) {

                let alumno_nuevo_final:AlumnoParamCreate = {
                    created_at : alumno1.created_at,
                    updated_at : alumno1.updated_at,
                    nombre : alumno1.nombre,
                    apellido : alumno1.apellido,
                    fecha_nacimiento : alumno1.fecha_nacimiento,
                };

                alumnos_nuevos_final.push(alumno_nuevo_final);
            }

            return alumnos_nuevos_final;
		},
        getAlumnosActualizarsFinal : function(alumnos_actualizars:Array<Alumno>) {
            let alumnos_actualizars_final:Array<AlumnoParamUpdate> = [];
            
            for(let alumno1 of alumnos_actualizars) {

                let alumno_actualizar_final:AlumnoParamUpdate = {
                    id : alumno1.id,
                    created_at : alumno1.created_at,
                    updated_at : alumno1.updated_at,
                    nombre : alumno1.nombre,
                    apellido : alumno1.apellido,
                    fecha_nacimiento : alumno1.fecha_nacimiento,
                };

                alumnos_actualizars_final.push(alumno_actualizar_final);
            }

            return alumnos_actualizars_final;
		},

        updateDato : function(alumno:Alumno) {
			this.alumno = alumno;
		},
		updateDatos : function(alumnos:Array<Alumno>) {
			this.alumnos = alumnos;
		}

    },
    created(){
        console.log('------- Created --------');
    }

})

</script>


<style lang="scss" scoped>

/*-------------------------  GENERAL ----------------------------*/
@import "@/scss/components/title/titulo_general";



/*------------------------- FORMULARIO --------------------------*/

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



/*------------------------- TABLA DATOS --------------------------*/

/*------------------ GENERAL (Importado en table_general.scss) ----------------------*/
/*------------------ TABLE GENERAL ----------------------*/
@import "@/scss/components/table/table_general";
/*------------------ FORM PAGINATION GENERAL ----------------------*/
@import "@/scss/components/form/pagination_form_general";


/*------------------ RESPONSIVE TABLE GENERAL ----------------------*/
@import "@/scss/responsive/table/table_general_responsive";
/*------------------ RESPONSIVE FORM PAGINATION GENERAL ----------------------*/
@import "@/scss/responsive/form/pagination_form_general_responsive";

</style>