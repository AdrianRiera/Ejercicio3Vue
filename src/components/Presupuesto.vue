<script setup>
import { ref } from 'vue';
import Alerta from './Alerta.vue';

const presupuesto = ref(0);
const error = ref('');

const emits = defineEmits(['definir-presupuesto']);


const definirPresupuesto = () => {
    if (presupuesto.value <= 0 || presupuesto.value === '') {
        error.value = 'El presupuesto debe ser mayor a 0';

        setTimeout(() => {
            error.value = '';
        }, 3000);

        return;
    }

    emits('definir-presupuesto', presupuesto.value);
};
</script>

<template>
    <form
        class="presupuesto"
        @submit.prevent="definirPresupuesto"
    >

        <Alerta
            v-if="error">

            
            {{ error }}  
        </Alerta>

        <div class="campo">
            <label for="nuevo-presupuesto">Presupuesto</label>
            <input 
                type="number" 
                id="nuevo-presupuesto" 
                class="nuevo-presupuesto"
                placeholder="Añade tu presupuesto"
                v-model.number="presupuesto"
            />
        </div>
        <input type="submit" value="Añadir Presupuesto"/>
    </form>
</template>

<style scoped>

    .presupuesto {
        width: 100%;
    }
    .campo {
        display: grid;
        gap: 2rem;
    }
    .presupuesto label {
        font-size: 2.2rem;
        text-align: center;
        color: var(--azul);
    }
    .presupuesto input[type="number"] {
        padding: 1rem;
        background-color: var (--gris-claro);
        border:none;
        border-radius: 1rem;
        font-size: 2.2rem;
        text-align: center;
    }
    .presupuesto input[type="submit"] {
        background-color: var(--azul);
        color: var(--blanco);
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        font-size: 2rem;
        cursor: pointer;
        text-align: center;
        font-weight: 900;
        width: 100%;
        margin-top: 2rem;
        transition: background-color 0.3s ease;
    }
    .presupuesto input[type="submit"]:hover {
        background-color: #1048a4;
        cursor: pointer;
    }
</style>