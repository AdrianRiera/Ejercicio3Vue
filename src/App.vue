<script setup>
import {ref, reactive, watch} from 'vue';
import { generarId } from './helpers';
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import iconoNuevoGasto from './assets/Materiales/img/nuevo-gasto.svg';
import Modal from './components/Modal.vue';
import Gasto from './components/Gasto.vue';


const modal = reactive({
    mostrar: false,
    animar: false
});

const presupuesto = ref(0);
const disponible = ref(0);
const gastado= ref(0);


const gasto= reactive({
    nombre: '',
    cantidad: 0,
    categoria: '',
    id: null,
    fecha: Date.now()
});
const gastos = ref([]);

watch(gastos, () => {
    const gastadoTotal = gastos.value.reduce((total, gasto) => total + gasto.cantidad, 0);
    gastado.value = gastadoTotal;
    disponible.value = presupuesto.value - gastadoTotal;
}, {deep: true});

watch(modal, () => {
    if (!modal.mostrar) {
        reiniciarStateGasto();
    }
}, {deep: true});

const definirPresupuesto= (cantidad)  => {
    presupuesto.value = cantidad;
    disponible.value = cantidad;
}


const mostrarModal = () =>{
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 300);

};

const quitarModal = () =>{
  modal.animar = false;
  
  setTimeout(() => {
    modal.mostrar = false;
  }, 300);
};

const guardarGasto = () => {
    if (gasto.id) {
      const {id} = gasto;
      const i = gastos.value.findIndex(gasto => gasto.id === id);
      gastos.value[i] = {...gasto};

    } else {
        gastos.value.push({...gasto, id: generarId()});
    }
    

    quitarModal();

    reiniciarStateGasto();

};

const reiniciarStateGasto = () => {
        Object.assign(gasto, {
            nombre: '',
            cantidad: '',
            categoria: '',
            id: null,
            fecha: Date.now()
        });
    };

const seleccionarGasto = (id) => {
    const gastoSeleccionado = gastos.value.filter(gasto => gasto.id === id)[0];
    if (gastoSeleccionado) {
        Object.assign(gasto, gastoSeleccionado);
        mostrarModal();
    }
};

const eliminarGasto = (id) => {
    const i = gastos.value.findIndex(gasto => gasto.id === id);
    if (i !== -1) {
        gastos.value.splice(i, 1);
    }
};
</script>

<template>
  <div
    :class="{ 'fijar': modal.mostrar}"
  >
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
      
      <div class="listado-gastos contenedor">
        <h2>{{ gastos.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>
        <Gasto
          v-for="gasto in gastos"
          :key="gasto.id"
          :gasto="gasto"
          @seleccionar-gasto="seleccionarGasto"

        />
      </div>

      <div class="crear-gasto">
        <img :src="iconoNuevoGasto" alt="Icono nuevo gasto" 
          @click="mostrarModal"
          />
      </div>
      <Modal 
        v-if="modal.mostrar"
        @quitar-modal="quitarModal"
        @guardar-gasto="guardarGasto"
        @eliminar-gasto="eliminarGasto"
        :modal="modal"
        :id="gasto.id"
        :disponible="disponible"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"

        
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
  .fijar{
    overflow: hidden;
    height: 100vh;
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
  .listado-gastos {
    margin-top: 10rem;
  }
  .listado-gastos h2 {
    font-weight: 900;
    color: var(--gris-oscuro)
  }
</style>
