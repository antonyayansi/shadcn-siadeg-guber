<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import useAuth from '@/modules/auth/hooks/useAuth'
import useSystem from '@/modules/home/hooks/useSystem'

const {
  user
} = useAuth();

const {
  menus
} = useSystem()

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

// This is sample data.
const data = {
  user: {
    name: user.value?.Nombre as string,
    email: user.value?.DNIUsuario as string,
    avatar: user.value?.Avatar as string,
  },
  navMain: menus.value
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
