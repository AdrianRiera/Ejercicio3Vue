<script setup>
defineEmits(['update:filtro']);
defineProps(['filtro']);
</script>

<template>
    <div class="filtros sombra contenedor">
        <form>
            <div class="campo">
                <label for="filtro">Filtrar Gastos</label>
                    <select
                        :value="filtro"
                        id="filtro"
                        @input="$emit('update:filtro', $event.target.value)"
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
        </form>
    </div>  
</template>

<style scoped>
.filtros {
    margin-top: 10rem;

}
.filtros .campo {
    display: flex;
    align-items: center;
    gap: 2rem;
}
.filtros label{
    font-size: 3rem;
    color: var(--gris-oscuro);
    font-weight: 900;
}
.filtros select{
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    text-align: center;
    background-color: var(--gris-claro);
}
</style>