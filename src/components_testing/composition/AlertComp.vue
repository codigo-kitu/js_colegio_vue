<script lang="ts" setup>

import { ref } from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';

const props = defineProps({
  //MENSAJE ALERT GENERAL
  tipo_mensaje:String,
  mensaje:String

  //,aleatorio:Number
});

//GENERAL
let title = ref('ALERT');

//MENSAJE ALERT MOSTRAR OCULTAR
let display = ref("none");
let opacity = ref("none");

//MENSAJE ALERT TIPO
let isAlertGeneral = ref(true);
let isAlertInfo = ref(false);
let isAlertSucess = ref(false);
let isAlertWarning = ref(false);
let isAlertError = ref(false);

/*-------- WATCH -----------*/
//Cambia Mensaje, cambia propiedades del Mensaje
/*
aleatorio:function(aleatorio) {
  //alert("Here")
  console.log("Mensaje Changed, Aleatorio=",aleatorio)
  setMensajeAlerta()
}
*/

const closeAlertGeneral = () => {
  opacity.value="0";
        
  setTimeout(() => {
      display.value="none"
  }, 600);
};

const setMensajeAlerta = () => { 
  //tipo_mensaje,mensaje

  //Son Parametros
  //tipo_mensaje=tipo_mensaje            
  //mensaje = mensaje

  //tipo_mensaje,mensaje
  //console.log("setMensajeAlerta,",tipo_mensaje,mensaje)
  
  //MENSAJE ALERT MOSTRAR OCULTAR
  display.value="block";
  opacity.value="1";

  //MENSAJE ALERT TIPO
  isAlertGeneral.value = true;
  isAlertInfo.value = false;
  isAlertSucess.value = false;
  isAlertWarning.value = false;
  isAlertError.value = false;


  if (props.tipo_mensaje == Constantes.INFO) {
      isAlertInfo.value=true;
  
  } else if (props.tipo_mensaje == Constantes.SUCCESS) {
      isAlertSucess.value=true;          

  } else if (props.tipo_mensaje == Constantes.WARNING) {
      isAlertWarning.value = true;          

  } else if (props.tipo_mensaje == Constantes.ERROR) {
      isAlertError.value = true;          
  }
};


defineExpose({
  closeAlertGeneral,
  setMensajeAlerta
});

</script>

<template>

  <div id="div_alert_general" 
       :style="{  display: display, 
                  opacity: opacity }"

       :class="{ alert_general: isAlertGeneral, 
                 alert_info: isAlertInfo, 
                 alert_success: isAlertSucess, 
                 alert_warning: isAlertWarning, 
                 alert_error: isAlertError }">
        
    <span id="span_close_alert_general" 
          class="close_alert_general" 
          @click = "closeAlertGeneral">

        &times;
    </span>

    <p id="p_mensaje_alert_general">
      {{ mensaje }}
    </p>

  </div>

</template>


<style lang="scss" scoped>

.alert_general {
    padding: 5px;
    background-color: #04AA6D;
    color: white;
    opacity: 1;
    transition: opacity 0.6s;
    margin-bottom: 10px;
    display: none;
}
 
.alert_info {
    background-color: #2196F3;
}

.alert_success {
    background-color: #04AA6D;
}

.alert_warning {
    background-color: #ff9800;
}

.alert_error {
    background-color: #f44336;
}
 
.close_alert_general {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}
  
.close_alert_general:hover {
    color: black;
}

</style>