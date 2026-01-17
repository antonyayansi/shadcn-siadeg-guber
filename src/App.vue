<template>
  <RouterView />
  <Toaster position="top-center" richColors/>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Toaster } from 'vue-sonner'

const mode = useColorMode()

console.log("Current color mode:", mode.value);
</script>