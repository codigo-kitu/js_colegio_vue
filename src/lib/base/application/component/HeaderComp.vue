<template>
  
  <div id="div_header">
    
    <h5 style="text-align: center;">
      Metricas Auto
    </h5>

    <div  id="div_loader" 
          :style="{ display: display }"
          class="loader_general">

    </div>

  </div>

</template>


<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({

  name: 'HeaderComp',

  data() {
    return {
      title: 'HEADER',

      //MENSAJE MOSTRAR OCULTAR
      display:"none"
    };
  },

  methods : {

    mostrarLoader : function() {
      this.display="block";
    },

    ocultarLoader : function() {
      this.display="none";
    }
  }
});

</script>


<style lang="scss" scoped>

/*------------------ LOADER GENERAL ----------------------*/
@import "@/scss/components/loader/loader_general";

</style>