<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/new-york-v4/lib/utils"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Logo from '@/assets/siadeg.png'
import { onFocus } from "@/lib/onFocus"
import useAuth from "@/modules/auth/hooks/useAuth"
import type { LoginCredentials } from "@/modules/auth/types/user.interface"
import Spinner from "@/components/ui/spinner/Spinner.vue"
import Alert from "@/components/ui/alert/Alert.vue"
import { AlertCircleIcon } from "lucide-vue-next"
import {
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert"

const {
  onLogin,
  isLoading,
  error
} = useAuth();

const credenciales:LoginCredentials = {
  dni: '',
  clave: ''
}

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

setTimeout(() => {
  onFocus('dni');
}, 200);
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <div class="w-full flex justify-center items-center">
          <img :src="Logo" alt="Logo" class="h-16" />
        </div>
        <CardTitle class="text-xl">
          SIADEG Gubernamental
        </CardTitle>
        <CardDescription>
          Ingrese sus credenciales para iniciar sesión
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <FieldGroup>
            <Field>
              <FieldLabel for="dni">
                DNI
              </FieldLabel>
              <Input
                v-model="credenciales.dni"
                id="dni"
                type="text"
                placeholder="12345678"
                @enter="onFocus('clave')"
              />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="clave">
                  Contraseña
                </FieldLabel>
                <a
                  href="#"
                  class="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Input 
                v-model="credenciales.clave" 
                @enter="onLogin(credenciales)"
                id="clave" 
                type="password" />
            </Field>
            <Field>
              <Alert v-if="error" variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{{ error }}</AlertDescription>
              </Alert>
              <Button 
                :disabled="isLoading"
                @click="onLogin(credenciales)"
                type="button">
                <Spinner v-if="isLoading" class="animate-spin" />
                Iniciar sesión
              </Button>
              <FieldDescription class="text-center">
                © SIADEG Guber 2026.01.06
              </FieldDescription>
            </Field>
          </FieldGroup>
        </div>
      </CardContent>
    </Card>
    <FieldDescription class="px-6 text-center text-neutral-100">
      Soporte: 910104133 - 900132386 - 974977988
    </FieldDescription>
  </div>
</template>
