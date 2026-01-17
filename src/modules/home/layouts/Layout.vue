<template>
    <div v-if="empresa">
        <Sidebar />
    </div>
    <MisEmpresas v-else />
</template>

<script setup lang="ts">
import useSystem from '../hooks/useSystem';
import MisEmpresas from '../pages/MisEmpresas.vue';
import Sidebar from '../pages/Sidebar.vue';

const {
    checkEmpresa,
    empresa
} = useSystem();

checkEmpresa();
</script>