<script lang="ts" setup>

import { ref } from 'vue';

let title = ref('HEADER');

//MENSAJE MOSTRAR OCULTAR
let display = ref("none");

const mostrarLoader = () => {
  display.value="block";
};

const ocultarLoader = () => {
  display.value="none";
};


defineExpose({
  mostrarLoader,
  ocultarLoader
});

</script>

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


<style lang="scss" scoped>

/*------------------ LOADER GENERAL ----------------------*/
@import "@/scss/components/loader/loader_general";

</style>