const persona1 = {
  nombre: 'Stalin',
  edad: 100,
  salario: 1000.5
};

const persona2 = {nombre: 'Stalin 2', edad: 200,salario: 2222.5};
const persona3 = { nombre: 'Stalin 3', edad: 300, salario: 3333.5};
const persona4 = { nombre: 'Stalin 4', edad: 400, salario: 4444.5};

const persona_store = {

  namespaced: true,

  state: {
    nombre:'Ramiro',
    persona: persona1,
    personas: [persona2,persona3,persona4]
  },

  getters: {
    getNombre (state:any) {
      return state.nombre + '- Get Change Example';
    },
    getPersona (state:any) {      
      return state.persona
    },
    getPersonas (state:any) {
      return state.personas
    }
  },

  mutations: {
    setNombre (state:any,nombre:string) {
      return state.nombre=nombre;
    },
    setPersona (state:any,persona:object) {
      return state.persona=persona;
    },
    setPersonas (state:any,personas:object) {
      return state.personas=personas;
    }
  },
  actions: {
    callSetNombre (context:any,nombre:string) {
      context.commit('setNombre',nombre);
    },
    callSetPersona (context:any,persona:object) {
      context.commit('setPersona',persona);
    },
    callSetPersonas (context:any,personas:object) {
      context.commit('setPersonas',personas);
    }
  }
};

export{persona_store};