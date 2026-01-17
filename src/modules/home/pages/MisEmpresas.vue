<template>
    <div class="container md:px-20 mx-auto">
        <div class="p-6">
            <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">Mis empresas</h1>
            <p class="mb-4 text-muted-foreground">Hola <strong>{{user?.Nombre}}</strong>, seleccione la empresa con la que desea trabajar</p>
            <div class="mb-6">
                <InputGroup>
                    <InputGroupInput 
                        v-model="searchQuery"
                        @input="filterEmpresas"
                        @keydown="handleKeyDown"
                        placeholder="Buscar..." 
                        id="buscar" 
                    />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <div class="space-y-2 overflow-y-auto">
                <div 
                    v-for="(empresa, index) in empresas" 
                    :key="empresa.Codigo"
                    @click="selectEmpresa(empresa)"
                    @mouseenter="selectedIndex = index"
                    :class="[
                        'p-4 border rounded-lg cursor-pointer transition-all duration-200',
                        selectedIndex === index 
                            ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                            : 'bg-card hover:bg-accent hover:border-accent-foreground'
                    ]"
                >
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-lg mb-1">{{ empresa.RazonSocial }}</h3>
                            <div class="flex gap-4 text-sm" :class="selectedIndex === index ? 'opacity-90' : 'text-muted-foreground'">
                                <span class="flex items-center gap-1">
                                    <span class="font-medium">RUC:</span>
                                    {{ empresa.Codigo }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <span class="font-medium">Pliego:</span>
                                    {{ empresa.Pliego }}
                                </span>
                            </div>
                        </div>
                        <div v-if="selectedIndex === index" class="ml-4">
                            <div class="text-xs opacity-90">Presione Enter</div>
                        </div>
                    </div>
                </div>
                <div v-if="empresas.length === 0" class="text-center py-12 text-muted-foreground">
                    <Search class="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p class="text-lg">No se encontraron empresas</p>
                    <p class="text-sm">Intente con otros términos de búsqueda</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from '@/components/ui/input-group';
import { onFocus } from '@/lib/onFocus';
import { Search } from 'lucide-vue-next';
import useSystem from '../hooks/useSystem';
import { onMounted, ref } from 'vue';
import useAuth from '@/modules/auth/hooks/useAuth';

interface Empresa {
    Codigo: string;
    HostNube: string;
    Modelo: string;
    Pliego: string;
    RazonSocial: string;
    Regimen: string;
    Sector: string;
}

const empresas = ref<Empresa[]>([]);
const empresasBk = ref<Empresa[]>([]);
const searchQuery = ref('');
const selectedIndex = ref(0);

const {
    getEmpresas,
    selectEmpresa
} = useSystem();

const {
    user
} = useAuth();

const filterEmpresas = () => {
    if (!searchQuery.value.trim()) {
        empresas.value = empresasBk.value;
        selectedIndex.value = 0;
        return;
    }
    
    const query = searchQuery.value.toLowerCase();
    empresas.value = empresasBk.value.filter(empresa => 
        empresa.RazonSocial.toLowerCase().includes(query) ||
        empresa.Codigo.toLowerCase().includes(query) ||
        empresa.Pliego.toLowerCase().includes(query)
    );
    selectedIndex.value = 0;
};

const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            if (selectedIndex.value < empresas.value.length - 1) {
                selectedIndex.value++;
                scrollToSelected();
            }
            break;
        case 'ArrowUp':
            event.preventDefault();
            if (selectedIndex.value > 0) {
                selectedIndex.value--;
                scrollToSelected();
            }
            break;
        case 'Enter':
            event.preventDefault();
            const selectedEmpresa = empresas.value[selectedIndex.value];
            if (selectedEmpresa) {
                selectEmpresa(selectedEmpresa);
            }
            break;
    }
};

const scrollToSelected = () => {
    // Scroll al elemento seleccionado
    const elements = document.querySelectorAll('[data-empresa-item]');
    const element = elements[selectedIndex.value];
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
};

setTimeout(() => {
    onFocus('buscar');
}, 300);

onMounted(async () => {
    empresas.value = await getEmpresas() || [];
    empresasBk.value = empresas.value;
});
</script>