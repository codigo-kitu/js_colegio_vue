import { createStore } from 'vuex'

import {persona_store} from './general/persona_store';

const person1 = {
  name: 'Carlos',
  age: 10,
  salary: 100.5
};

const person2 = {name: 'Carlos 2', age: 20,salary: 200.5};
const person3 = { name: 'Carlos 3', age: 30, salary: 300.5};
const person4 = { name: 'Carlos 4', age: 40, salary: 400.5};

export default createStore({

  state: {
    name:'Luis',
    person: person1,
    persons: [person2,person3,person4]
  },

  getters: {
    getName (state) {
      return state.name + '- Get Change Example';
    },
    getPerson (state) {      
      return state.person
    },
    getPersons (state) {
      return state.persons
    }
  },

  mutations: {
    setName (state,name) {
      return state.name=name;
    },
    setPerson (state,person) {
      return state.person=person;
    },
    setPersons (state,persons) {
      return state.persons=persons;
    }
  },
  actions: {
    callSetName (context,name) {
      context.commit('setName',name);
    },
    callSetPerson (context,person) {
      context.commit('setPerson',person);
    },
    callSetPersons (context,persons) {
      context.commit('setPersons',persons);
    }
  },
  modules: {
    persona_store
  }
})
