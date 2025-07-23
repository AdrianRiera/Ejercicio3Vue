<script setup>
import { ref } from 'vue';
import Alerta from './Alerta.vue';
import cerrarModal from '../assets/Materiales/img/cerrar.svg';

const error = ref('');

const emit = defineEmits(['quitar-modal','update:nombre', 'update:cantidad', 'update:categoria', 'guardar-gasto']);
const props = defineProps({
    modal: {
        type: Object,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    cantidad: {
        type: [Number, String],
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    disponible: {
        type: Number,
        required: true,
    },
    id: {
        type: [String, null],
        required: false,
    }
});
const old = props.cantidad;
const agregarGasto = () => {
    const {cantidad, nombre, categoria, disponible, id} = props;
    if ([cantidad, nombre, categoria].includes('') || cantidad <= 0) {
        error.value = 'Todos los campos son obligatorios o la cantidad debe ser mayor a 0';
        setTimeout(() => {
            error.value = '';
        }, 3000);
        return;
    }
    if (id) {
        if (cantidad > old + disponible) {
            error.value = 'Cantidad no válida, supera el presupuesto disponible';
            setTimeout(() => {
                error.value = '';
            }, 3000);
            return;
        }
    }else{
        if (cantidad > disponible) {
            error.value = 'Cantidad no válida, supera el presupuesto disponible';
            setTimeout(() => {
                error.value = '';
            }, 3000);
            return;
        }}

    emit('guardar-gasto');
};
</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img
               @click="$emit('quitar-modal')"
               :src="cerrarModal"
            />
        </div>
        <div class="contenedor contenedor-formulario"
        :class="[modal.animar ? 'animar' : 'cerrar']">
            <form class="nuevo-gasto"
                @submit.prevent="agregarGasto"
            >
                <legend>{{id ? 'Editar Gasto' : 'Añadir Gasto'}}</legend>
                <Alerta v-if="error">
                    {{ error }}
                </Alerta>

                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input type="text" id="nombre" :value="nombre" @input="$emit('update:nombre', $event.target.value)" placeholder="Añade el nombre del gasto" />
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad Gasto:</label>
                    <input type="number" id="cantidad" :value="cantidad" @input="$emit('update:cantidad', +$event.target.value)" placeholder="Añade la cantidad del gasto" />
                </div>

                <div class="campo">
                    <label for="categoria">Categoria:</label>
                    <select
                        :value="categoria"
                        id="categoria"
                        @change="$emit('update:categoria', $event.target.value)"
                        >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" :value="id ? 'Guardar Cambios' : 'Añadir Gasto'" />
            </form>
            <button
                type="button"
                class="btn-eliminar"
                v-if="id"
                @click="$emit('eliminar-gasto', id)"
            >
                Eliminar Gasto
            </button>
        </div>
    </div> 
</template>


<style scoped>
    .modal{
        position: absolute;
        background-color: rgb( 0 0 0 / 0.9);
        top:0;
        left:0;
        right: 0;
        bottom: 0;
    }
    .cerrar-modal {
        position: absolute;
        top: 3rem;
        right: 3rem;
        
    }
    .cerrar-modal img {
        width: 3rem;
        cursor: pointer;
    }
    .contenedor-formulario {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;
    }
    .contenedor-formulario.animar {
        opacity: 1;
        
    }
    .contenedor-formulario.cerrar {
        opacity: 0;
        
    }
    .nuevo-gasto {
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
    }
    .nuevo-gasto legend {
        font-size: 3rem;
        color: var(--blanco);
        text-align: center;
        font-weight: 700;
    }
    .campo{
        gap:2rem;
        display: grid;
    }
    .nuevo-gasto input, .nuevo-gasto select {
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
    }
    .nuevo-gasto label {
        font-size: 3rem;
        color: var(--blanco);

    }
    .nuevo-gasto input[type="submit"] {
        background-color: var(--azul);
        color: var(--blanco);
        font-weight: 700;
        cursor: pointer;
    }
    .btn-eliminar{
        padding: 1rem;
        width: 100%;
        background-color: #ef4444;
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--blanco);
        margin-top: 10rem;
        cursor: pointer;
    }
</style>