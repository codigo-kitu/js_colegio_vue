import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AlumnoView from '@/lib/estructura/alumno/application/view/AlumnoView.vue';
import AlumnoMateriaView from '@/lib/estructura/alumno_materia/application/view/AlumnoMateriaView.vue';
import ContratoView from '@/lib/financiero/contrato/application/view/ContratoView.vue';
import DocenteView from '@/lib/estructura/docente/application/view/DocenteView.vue';
import DocenteMateriaView from '@/lib/estructura/docente_materia/application/view/DocenteMateriaView.vue';
import MateriaView from '@/lib/estructura/materia/application/view/MateriaView.vue';
import MatriculaView from '@/lib/proceso/matricula/application/view/MatriculaView.vue';
import NotaView from '@/lib/proceso/nota/application/view/NotaView.vue';
import PensionView from '@/lib/financiero/pension/application/view/PensionView.vue';
import SueldoView from '@/lib/financiero/sueldo/application/view/SueldoView.vue';

/*---------------------- LOTE ------------------------ */

import AlumnoLoteView from '@/lib/estructura/alumno/application/view_lote/AlumnoLoteView.vue';
import AlumnoMateriaLoteView from '@/lib/estructura/alumno_materia/application/view_lote/AlumnoMateriaLoteView.vue';
import DocenteLoteView from '@/lib/estructura/docente/application/view_lote/DocenteLoteView.vue';
import MateriaLoteView from '@/lib/estructura/materia/application/view_lote/MateriaLoteView.vue';

/*---------------------- COMPOSITION ------------------------ */
import MateriaCompositionView from '../views_testing/estructura/MateriaCompositionView.vue'

/*---------------------- COMPOSITION LOTE ------------------------ */
import MateriaCompositionLoteView from '../views_testing/estructura/lote/MateriaCompositionLoteView.vue'


/*---------------------- BOOTSTRAP ------------------------ */
import MateriaBootView from '../views_testing/estructura/bootstrap/MateriaBootView.vue';

/*---------------------- STORES ------------------------ */
import GlobalStoreView from '../views_testing/vuex_store/GlobalStoreView.vue';
import ModuleStoreView from '../views_testing/vuex_store/ModuleStoreView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/alumno',
      name: 'alumno',
      component: AlumnoView
    }
    ,
    {
      path: '/alumno_materia',
      name: 'alumno_materia',
      component: AlumnoMateriaView
    }
    ,
    {
      path: '/contrato',
      name: 'contrato',
      component: ContratoView
    }
    ,
    {
      path: '/docente',
      name: 'docente',
      component: DocenteView
    }
    ,
    {
      path: '/docente_materia',
      name: 'docente_materia',
      component: DocenteMateriaView
    }
    ,
    {
      path: '/materia',
      name: 'materia',
      component: MateriaView
    }
    ,
    {
      path: '/matricula',
      name: 'matricula',
      component: MatriculaView
    }
    ,
    {
      path: '/nota',
      name: 'nota',
      component: NotaView
    }
    ,
    {
      path: '/pension',
      name: 'pension',
      component: PensionView
    }
    ,
    {
      path: '/sueldo',
      name: 'sueldo',
      component: SueldoView
    }
    
    
    
    
    
    ,
    {
      path: '/alumno_lote',
      name: 'alumno_lote',
      component: AlumnoLoteView
    },
    {
      path: '/docente_lote',
      name: 'docente_lote',
      component: DocenteLoteView
    },
    {
      path: '/materia_lote',
      name: 'materia_lote',
      component: MateriaLoteView
    },
    {
      path: '/alumno_materia_lote',
      name: 'alumno_materia_lote',
      component: AlumnoMateriaLoteView
    }
  
  
  
  
  
    ,
    {
      path: '/materia_boot',
      name: 'materia_boot',
      component: MateriaBootView
    },
    {
      path: '/global_store',
      name: 'global_store',
      component: GlobalStoreView
    },
    {
      path: '/module_store',
      name: 'module_store',
      component: ModuleStoreView
    },


    {
      path: '/materia_composition',
      name: 'materia_composition',
      component: MateriaCompositionView
    },
    {
      path: '/materia_composition_lote',
      name: 'materia_composition_lote',
      component: MateriaCompositionLoteView
    }
  ]
})

export default router