<script setup>
import { ref } from 'vue';
import cerrarModal from '../assets/Materiales/img/cerrar.svg';

defineEmits(['quitar-modal',]);


</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img
               @click="$emit('quitar-modal')"
               :src="cerrarModal"
            />
        </div>
        <div class="contenedor">
            <form class="nuevo-gasto">
                <legend>Añadir Gasto</legend>
                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input type="text" id="nombre" placeholder="Añade el nombre del gasto" />
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad Gasto:</label>
                    <input type="number" id="cantidad" placeholder="Añade la cantidad del gasto" />
                </div>

                <div class="campo">
                    <label for="categoria">Categoria:</label>
                    <select
                        id="categoria">
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

                <input type="submit" value="Añadir Gasto" />
            </form>
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
    .nuevo-gasto {
        margin: 10rem auto 0 auto;
    }
    .campo{
        gap:2rem;
        display: grid;
    }
    .nuevo-gasto input, .nuevo-gasto select {

    }
</style>