<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Logo from '@/assets/siadeg.png'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-neutral text-sidebar-primary-foreground">
              <img :src="Logo" class="h-6 w-6 object-contain" alt="Logo" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">
                SIADEG
              </span>
              <span class="truncate text-xs">Gubernamental</span>
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
