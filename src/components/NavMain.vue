<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import type { Menu } from "@/modules/home/types/system.interface";

defineProps<{
  items: Menu[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Módulos</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.botonesWeb"
        as-child
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.botonesWeb">
              <component :is="item.icono" v-if="item.icono" />
              <span>{{ item.botonesWeb }}</span>
              <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.children" :key="subItem.botonesWeb">
                <SidebarMenuSubButton as-child>
                  <a :href="subItem.ruta">
                    <span>{{ subItem.botonesWeb }}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
