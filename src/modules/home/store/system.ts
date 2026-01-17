import { defineStore } from "pinia";
import type { Empresa } from "../types/system.interface";
import baseApi from "@/services/baseApi";
import { toast } from "vue-sonner";
import useAuth from "@/modules/auth/hooks/useAuth";

const {
    onLogout
} = useAuth();

export const system = defineStore("system", {
    state: () => ({
        empresa: null as Empresa | null,
        // for select empresa
        isLoading: false as boolean
    }),
    actions: {
        checkEmpresa() {
            if (localStorage.getItem('x0-empresa')) {
                this.empresa = JSON.parse(atob(localStorage.getItem('x0-empresa') || '')) as Empresa;
            }
        },
        async getEmpresas(){
            this.isLoading = true;
            try {
                const { data }: { data:[] } = await baseApi.get("listarMisEmpresas");
                if(!data.length){
                    onLogout();
                    return
                }
                return data;
            } catch (e) {
                console.error("Error al obtener las empresas", e);
            } finally {
                this.isLoading = false;
            }
        },
        async selectEmpresa(empresa:any){
            try {
                const { data } = await baseApi.get(`/selEmpresa`, {
                    params: {
                        ruc: empresa.Codigo
                    }
                })
                if (!data.length) {
                    toast.error('No se encontró la empresa seleccionada')
                    onLogout()
                    return
                }
                localStorage.setItem('x0-empresa', btoa(JSON.stringify(data[0])))
                window.location.reload()
            } catch (err: any) {
                toast.error(err?.response?.data.message)
            }
        }
    },
});