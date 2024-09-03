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


<script lang="ts">

import { defineComponent } from 'vue';

import {Constantes} from '@/lib/base/util/Constantes';

export default defineComponent({

  name: 'AlertComp',

  props: {

    //MENSAJE ALERT GENERAL
    tipo_mensaje:String,
    mensaje:String

    //,aleatorio:Number    
  },

  data() {
    return {
      //GENERAL
      title: 'ALERT',

      //MENSAJE ALERT MOSTRAR OCULTAR
      display:"none",
      opacity:"none",

      //MENSAJE ALERT TIPO
      isAlertGeneral:true,
      isAlertInfo:false,
      isAlertSucess:false,
      isAlertWarning:false,
      isAlertError:false
    };
  },

  watch : {
      //Cambia Mensaje, cambia propiedades del Mensaje
      /*
      aleatorio:function(aleatorio) {
        //alert("Here")
        console.log("Mensaje Changed, Aleatorio=",aleatorio)
        this.setMensajeAlerta()
      }
      */
  },

  methods : {
    
    closeAlertGeneral : function() {
      this.opacity="0";
            
      setTimeout(() => {
          this.display="none"
      }, 600);
    },

    setMensajeAlerta : function() { 
      //tipo_mensaje,mensaje

      //Son Parametros
      //this.tipo_mensaje=tipo_mensaje            
      //this.mensaje = mensaje

      //tipo_mensaje,mensaje
      //console.log("setMensajeAlerta,",this.tipo_mensaje,this.mensaje)
      
      //MENSAJE ALERT MOSTRAR OCULTAR
      this.display="block";
      this.opacity="1";

      //MENSAJE ALERT TIPO
      this.isAlertGeneral = true;
      this.isAlertInfo = false;
      this.isAlertSucess = false;
      this.isAlertWarning = false;
      this.isAlertError = false;


      if (this.tipo_mensaje == Constantes.INFO) {
          this.isAlertInfo=true;
      
      } else if (this.tipo_mensaje == Constantes.SUCCESS) {
          this.isAlertSucess=true;          

      } else if (this.tipo_mensaje == Constantes.WARNING) {
          this.isAlertWarning = true;          

      } else if (this.tipo_mensaje == Constantes.ERROR) {
          this.isAlertError = true;          
      }
      
    }
  }
});

</script>

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