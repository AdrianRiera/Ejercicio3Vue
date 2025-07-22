<script setup>
import {ref, reactive} from 'vue';
import Filtro from './components/Filtro.vue'
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import iconoNuevoGasto from './assets/Materiales/img/nuevo-gasto.svg';
import Modal from './components/Modal.vue';


const modal = reactive({
    mostrar: false,
    animar: false
});

const presupuesto = ref(0);
const disponible = ref(0);
const gastado = ref(0);

const definirPresupuesto= (cantidad)  => {
    presupuesto.value = cantidad;
    disponible.value = cantidad;
}


const mostrarModal = () =>{
  modal.mostrar = true;
  modal.animar = true; 
};

const quitarModal = () =>{
  modal.mostrar = false;
  modal.animar = false; 
};
</script>

<template>
  <div>
    <header>
      <h1>Control de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto  
          v-if="presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto 
          v-else
          :presupuesto="presupuesto"
          :disponible="disponible"
          :gastado="gastado"
        />
      </div>


    </header>
    <main v-if="presupuesto > 0">

      <div class="crear-gasto">
        <img :src="iconoNuevoGasto" alt="Icono nuevo gasto" 
          @click="mostrarModal"
          />
      </div>
      <Modal 
        v-if="modal.mostrar"
        @quitar-modal="quitarModal"
        />
    </main>
    <!-- <Filtro /> -->
  </div>
</template>

<style>
  :root{
    --azul: #3b82f6;
    --blanco: #fff;
    --gris-claro: #f3f4f6;
    --gris: #9ca3af;
    --gris-oscuro: #374151;
    --negro: #000;

  }
  html{
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gris-claro);
  }
  h1 { 
    font-size: 4rem;
  }
  h2{
    font-size: 3rem;
  }
  header{
    background-color: var(--azul);
  }
  header h1{
    padding: 3rem 0;
    color: var(--blanco);
    margin: 0;
    text-align: center;
  }
  .contenedor{
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding:5rem;
  }
  .sombra{
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }
  .crear-gasto{
    position: fixed;
    bottom: 5rem;
    right: 5rem;  
  } 
  .crear-gasto img{
    width: 5rem;
    cursor:pointer;

  }
  .crear-gasto img:hover{

  }
</style>
