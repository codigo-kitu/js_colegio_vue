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

    <div class="alert alert-info">
        GETTERS
    </div>

    <div class="row mt-5">
        <div class="col-3">
            <h1>Name</h1>
            <span class="badge bg-secondary fs-5">
                {{ getName }}
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
                        <td>{{ getPerson.name }}</td>
                        <td>{{ getPerson.age }}</td>
                        <td>{{ getPerson.salary }}</td>
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
                    <tr v-for="(person1,index) in getPersons" :key="index">
                        <td>{{ person1.name }}</td>
                        <td>{{ person1.age }}</td>
                        <td>{{ person1.salary }}</td>
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
                class="btn btn-primary" value="Actualizar Name" 
                @click="actualizarName">
                    Actualizar Name
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Person" 
                @click="actualizarPerson">
                    Actualizar Person
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Persons" 
                @click="actualizarPersons">
                    Actualizar Persons
            </button>
        </div>
    </div>

    <div class="alert alert-info">
        ACTIONS
    </div>

    <div class="row mt-5">
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Name" 
                @click="actualizarByActionName">
                    Actualizar By Action Name
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Person" 
                @click="actualizarByActionPerson">
                    Actualizar By Action Person
            </button>
        </div>
        <div class="col-3">
            <button type="button" id="aumentar_button" name="aumentar_button" 
                class="btn btn-primary" value="Actualizar Persons" 
                @click="actualizarByActionPersons">
                    Actualizar By Action Persons
            </button>
        </div>
    </div>

</div>

</template>

<script lang="ts">

import {defineComponent} from 'vue';
import { mapState,mapGetters,
        mapMutations,mapActions } from 'vuex';

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
        
        ...mapMutations(['setName','setPerson','setPersons']),
        ...mapActions(['callSetName','callSetPerson','callSetPersons']),
        
        actualizarName() {
            this.setName('Pedro');
        },
        actualizarPerson() {
            let person1 = {
                name: 'Pedro 2',
                age: 11,
                salary: 111.5
            };

            this.setPerson(person1);
        },
        actualizarPersons() {
            let person2 = {name: 'Carlos 22', age: 22,salary: 222.5};
            let person3 = { name: 'Carlos 33', age: 33, salary: 333.5};
            let person4 = { name: 'Carlos 44', age: 44, salary: 444.5};
            
            this.setPersons([person2,person3,person4]);            
        },
        actualizarByActionName() {
            this.callSetName('Pedro');
        },
        actualizarByActionPerson() {
            let person1 = {
                name: 'Pedro 2',
                age: 11,
                salary: 111.5
            };

            this.callSetPerson(person1);
        },
        actualizarByActionPersons() {
            let person2 = {name: 'Carlos 22', age: 22,salary: 222.5};
            let person3 = { name: 'Carlos 33', age: 33, salary: 333.5};
            let person4 = { name: 'Carlos 44', age: 44, salary: 444.5};
            
            this.callSetPersons([person2,person3,person4]);            
        }
    },
    computed: {
        ...mapState(['name','person','persons']),
        ...mapGetters(['getName','getPerson','getPersons']),        
    }
});

</script>

<style lang="scss">

</style>