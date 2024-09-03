<template>

<div class="container">
    
    <div class="alert alert-primary">
        {{ contador }}
    </div>

    <button type="button" id="aumentar_button" name="aumentar_button" 
			class="btn btn-primary" value="Aumentar" 
			@click="aumentarContador">
        Aumentar Contador
    </button>

    <div class="alert alert-info">
        STATES
    </div>

    <div class="row mt-5">
        <div class="col-3">
            <h1>Nombre</h1>
            <span class="badge bg-secondary fs-5">
                {{ nombre }}
            </span>
            
        </div>
        <div class="col-3">
            <h1>Persona</h1>

            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ persona.nombre }}</td>
                        <td>{{ persona.edad }}</td>
                        <td>{{ persona.salario }}</td>
                    </tr>                
                </tbody>
            </table>
        </div>
        <div class="col-3">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(persona1,index) in personas" :key="index">
                        <td>{{ persona1.nombre }}</td>
                        <td>{{ persona1.edad }}</td>
                        <td>{{ persona1.salario }}</td>
                    </tr>                
                </tbody>
            </table>
        </div>
    </div>

    <div class="alert alert-info">
        GETTERS
    </div>

    <div class="row mt-5">
        <div class="col-3">
            <h1>Nombre</h1>
            <span class="badge bg-secondary fs-5">
                {{ getNombre }}
            </span>
            
        </div>
        <div class="col-3">
            <h1>Persona</h1>

            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ getPersona.nombre }}</td>
                        <td>{{ getPersona.edad }}</td>
                        <td>{{ getPersona.salario }}</td>
                    </tr>                
                </tbody>
            </table>
        </div>
        <div class="col-3">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(persona1,index) in getPersonas" :key="index">
                        <td>{{ persona1.nombre }}</td>
                        <td>{{ persona1.edad }}</td>
                        <td>{{ persona1.salario }}</td>
                    </tr>                
                </tbody>
            </table>
        </div>
    </div>

    <div class="alert alert-info">
        MUTATIONS
    </div>

    <div class="row mt-5">
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Nombre" 
                @click="actualizarNombre">
                    Actualizar Nombre
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Persona" 
                @click="actualizarPersona">
                    Actualizar Persona
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Personas" 
                @click="actualizarPersonas">
                    Actualizar Personas
            </button>
        </div>
    </div>

    <div class="alert alert-info">
        ACTIONS
    </div>

    <div class="row mt-5">
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Nombre" 
                @click="actualizarByActionNombre">
                    Actualizar By Action Nombre
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Persona" 
                @click="actualizarByActionPersona">
                    Actualizar By Action Persona
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Personas" 
                @click="actualizarByActionPersonas">
                    Actualizar By Action Personas
            </button>
        </div>
    </div>


    <div class="alert alert-danger mt-5">
        GLOBAL STATES
    </div>

    <div class="row mt-5">
        <div class="col-3">
            <h1>Name</h1>
            <span class="badge bg-secondary fs-5">
                {{ name }}
            </span>
            
        </div>
        <div class="col-3">
            <h1>Person</h1>

            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ person.name }}</td>
                        <td>{{ person.age }}</td>
                        <td>{{ person.salary }}</td>
                    </tr>                
                </tbody>
            </table>
        </div>
        <div class="col-3">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(person1,index) in persons" :key="index">
                        <td>{{ person1.name }}</td>
                        <td>{{ person1.age }}</td>
                        <td>{{ person1.salary }}</td>
                    </tr>                
                </tbody>
            </table>
        </div>
    </div>

</div>

</template>

<script lang="ts">

import {defineComponent} from 'vue';
import { createNamespacedHelpers } from 'vuex'

import { mapState,mapGetters,
        mapMutations,mapActions } from 'vuex';

/*
const { mapState, mapGetters,
        mapMutations,mapActions } = createNamespacedHelpers('general/persona_store')
*/




export default defineComponent({
	
    name: 'GlobalStoreView',

    data() {
		
		return {
            contador: 0
        }
    },

    methods : {
        aumentarContador() {
            this.contador++;
        },
        
        ...mapMutations('persona_store',['setNombre','setPersona','setPersonas']),
        ...mapActions('persona_store',['callSetNombre','callSetPersona','callSetPersonas']),
        
        /*----------------- GLOBAL STATE ----------------------*/
        ...mapMutations(['setName','setPerson','setPersons']),
        ...mapActions(['callSetName','callSetPerson','callSetPersons']),
        
        actualizarNombre() {
            this.setNombre('Ramirez');
        },
        actualizarPersona() {
            let persona1 = {
                nombre: 'Stalin 2',
                edad: 11,
                salario: 111.1
            };

            this.setPersona(persona1);
        },
        actualizarPersonas() {
            let persona2 = {nombre: 'Stalin 222', edad: 222,salario: 2222.2};
            let persona3 = { nombre: 'Stalin 333', edad: 333, salario: 3333.3};
            let persona4 = { nombre: 'Stalin 444', edad: 444, salario: 4444.4};
            
            this.setPersonas([persona2,persona3,persona4]);            
        },
        actualizarByActionNombre() {
            this.callSetNombre('Ramirez');
        },
        actualizarByActionPersona() {
            let persona1 = {
                nombre: 'Stalin 2',
                edad: 111,
                salario: 1111.1
            };

            this.callSetPersona(persona1);
        },
        actualizarByActionPersonas() {
            let persona2 = {nombre: 'Stalin 222', edad: 222,salario: 2222.2};
            let persona3 = { nombre: 'Stalin 333', edad: 333, salario: 3333.3};
            let persona4 = { nombre: 'Stalin 444', edad: 444, salario: 4444.4};
            
            this.callSetPersonas([persona2,persona3,persona4]);            
        }
    },
    computed: {
        ...mapState('persona_store',['nombre','persona','personas']),
        ...mapGetters('persona_store',['getNombre','getPersona','getPersonas']),        

        /*------------------- GLOBAL STATE ----------------------*/
        ...mapState(['name','person','persons']),
        ...mapGetters(['getName','getPerson','getPersons']),
    }
});

</script>

<style lang="scss">

</style>