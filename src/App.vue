<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!--
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    -->

    <div class="wrapper">
      
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <ul class="navbar_general">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>

          <li>
            <router-link to="/alumno">
              Alumnos
            </router-link>
          </li>
          <li>
            <router-link to="/alumno_materia">
              Alumno_materias
            </router-link>
          </li>
          <li>
            <router-link to="/contrato">
              Contratos
            </router-link>
          </li>
          <li>
            <router-link to="/docente">
              Docentes
            </router-link>
          </li>
          <li>
            <router-link to="/docente_materia">
              Docente_materias
            </router-link>
          </li>
          <li>
            <router-link to="/materia">
              Materias
            </router-link>
          </li>
          <li>
            <router-link to="/matricula">
              Matriculas
            </router-link>
          </li>
          <li>
            <router-link to="/nota">
              Notas
            </router-link>
          </li>
          <li>
            <router-link to="/pension">
              Pensions
            </router-link>
          </li>
          <li>
            <router-link to="/sueldo">
              Sueldos
            </router-link>
          </li>


          <li>
            <router-link to="/alumno_lote">
              Alumnos Lotes
            </router-link>
          </li>
          <li>
            <router-link to="/docente_lote">
              Docentes Lotes
            </router-link>
          </li>
          <li>
            <router-link to="/materia_lote">
              Materias Lotes
            </router-link>
          </li>
          <li>
            <router-link to="/alumno_materia_lote">
              Alumno Materias Lotes
            </router-link>
          </li>



          <li>
            <router-link to="/materia_boot">
              Materias BootStrap
            </router-link>
          </li>

          <li>
            <router-link to="/global_store">
              Global Store
            </router-link>
          </li>

          <li>
            <router-link to="/module_store">
              Module Store
            </router-link>
          </li>



          <li>
            <router-link to="/materia_composition">
              Materias Composition
            </router-link>
          </li>

          <li>
            <router-link to="/materia_composition_lote">
              Materias Comp Lotes
            </router-link>
          </li>

        </ul>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>

/*------------------ PAGE GENERAL ----------------------*/
@import "@/scss/page/page_general";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul.navbar_general {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}
  
ul.navbar_general {
    
    li {
        float: left;
    }

    li {
        
        a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        a:hover:not(.active) {
            background-color: #111;
        }

        a.active {
            background-color: #04AA6D;
        }
    }

    li.right {
        float: right;
    }
}

/*
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
*/

</style>
