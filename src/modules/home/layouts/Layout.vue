<template>
    <div v-if="empresa">
        <RouterView />
    </div>
    <MisEmpresas v-else />
</template>

<script setup lang="ts">
import useSystem from '../hooks/useSystem';
import MisEmpresas from '../pages/MisEmpresas.vue';

const {
    checkEmpresa,
    empresa
} = useSystem();

checkEmpresa();
</script>