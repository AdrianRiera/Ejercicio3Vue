<script setup>
    import { formatearCantidad, formatearFecha } from '../helpers/index';
    import IconoAhorro from '../assets/Materiales/img/icono_ahorro.svg'
    import IconoCasa from '../assets/Materiales/img/icono_casa.svg'
    import IconoComida from '../assets/Materiales/img/icono_comida.svg'
    import IconoGastos from '../assets/Materiales/img/icono_gastos.svg'
    import IconoOcio from '../assets/Materiales/img/icono_ocio.svg'
    import IconoSalud from '../assets/Materiales/img/icono_salud.svg'
    import IconoSuscripciones from '../assets/Materiales/img/icono_suscripciones.svg'
    
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
};

const props = defineProps({
    gasto: {
        type: Object,
        required: true
    }
});
defineEmits(['seleccionar-gasto','eliminar-gasto']);
</script>


<template>
    <div class="gasto sombra">
        <div class="contenido">
            
            <img :src="diccionarioIconos[gasto.categoria]" 
            alt="Icono gasto" class="icono">
            <div class="detalles">
                <p class="categoria">{{ gasto.categoria }}</p>
                <p class="nombre" @click="$emit('seleccionar-gasto', gasto.id)">{{ gasto.nombre }}</p>
                <p class="fecha">
                    Fecha
                   <span>{{ formatearFecha(gasto.fecha) }}</span>
                </p>
            </div>
        </div>
        <p class="cantidad">{{ formatearCantidad(gasto.cantidad) }}</p>
    </div>

</template>

<style scoped>

.gasto{
    display: flex;
    justify-content: space-between; 
    align-items: center;
    margin-bottom: 2rem;
    position: relative;
}

.contenido{
    display: flex;
    gap:2rem;
    align-items: center;
    
}

.icono{
    width: 5rem;
}

.detalles p{
    margin: 0 0 1rem 0;
}

.categoria{
    color: var(--gris);
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 900;
}

.nombre{
    color: var(--gris-oscuro);
    font-size: 2.4rem;
    font-weight: 700;
    cursor: pointer;
}

.fecha{
    color: var(--gris-oscuro);
    font-size: 1.6rem;
    font-weight: 900;
}

.fecha span {
    font-weight: 400;
}
.cantidad{
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
}

</style> 