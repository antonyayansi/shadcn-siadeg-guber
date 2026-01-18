import { defineStore } from "pinia";
import type { Empresa, Menu } from "../types/system.interface";
import baseApi from "@/services/baseApi";
import { toast } from "vue-sonner";
import useAuth from "@/modules/auth/hooks/useAuth";
import { 
    BanknoteArrowUp, 
    CircleArrowRight, 
    FileCheck, 
    FileInput, 
    FolderKanban, 
    Fuel, 
    Gauge, 
    Landmark, 
    PackageCheck, 
    PiggyBank, 
    Settings, 
    Store, 
    Warehouse 
} from "lucide-vue-next";

const {
    onLogout
} = useAuth();

export const system = defineStore("system", {
    state: () => ({
        empresa: null as Empresa | null,
        // for select empresa
        isLoading: false as boolean,
        menus: [] as Menu[],
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
        },
        // menus
        formatMenu(data: Menu[]) {
            const menuMap: Record<string, Menu & { children: Menu[] }> = {};
            data.forEach((item: Menu) => {
                menuMap[item.id] = { ...item, children: [] };
            });

            const menuTree:any = [];
            data.forEach((item: Menu) => {
                const currentItem = menuMap[item.id];
                if (!currentItem) return;

                if (item.menus_id === "00000000" || item.menus_id === null) {
                    menuTree.push(currentItem);
                } else if (item.menus_id) {
                    const parent = menuMap[item.menus_id];
                    if (parent) {
                        parent.children.push(currentItem);
                    }
                }
            });

            return menuTree;
        },
        async getMenus(){
            if(!localStorage.getItem('x0-empresa')) return;
            
            if(localStorage.getItem('x0-menus')){
                const menusData = JSON.parse(atob(localStorage.getItem('x0-menus') || '')) as Menu[];
                // Reconstruir los iconos desde el nombre guardado
                this.assignIcons(menusData);
                this.menus = menusData;
                return;
            }
            
            try {
                const { data } = await baseApi.get('/menu_listarUser');
                if(!data.length) return;
                let temp:any = data.filter((menu:Menu) => menu.nombre != 'salir');
                this.menus = this.formatMenu(temp);

                // Asignar iconos lucid
                this.assignIcons(this.menus);

                // Guardar sin los iconos (componentes)
                const menusToSave = JSON.parse(JSON.stringify(this.menus, (key, value) => {
                    if (key === 'icono') return undefined;
                    return value;
                }));
                
                localStorage.setItem('x0-menus', btoa(JSON.stringify(menusToSave)));
            } catch (e) {
                console.error("Error al obtener los menús", e);
            }
        },
        
        assignIcons(menus: Menu[]) {
            menus.forEach((menu) => {
                switch (menu.paneles) {
                    case 'MANTENIMIENTO':
                        menu.icono = Settings;
                        break;
                    case 'ADMINISTRACION':
                        menu.icono = Gauge;
                        break;
                    case 'CAJA_CHICA':
                        menu.icono = BanknoteArrowUp;
                        break;
                    case 'MESA_PARTES':
                        menu.icono = FileCheck;
                        break;
                    case 'PRESUPUESTO':
                        menu.icono = Landmark;
                        break;
                    case 'REQUERIMIENTO':
                        menu.icono = Store;
                        break;
                    case 'LOGISTICA':
                        menu.icono = FolderKanban
                        break;
                    case 'ALMACENES':
                        menu.icono = Warehouse;
                        break;
                    case 'CUADERNO_CARGO':
                        menu.icono = FileInput;
                        break;
                    case 'SUBALMACEN':
                        menu.icono = Fuel;
                        break;
                    case 'TESORERIA':
                        menu.icono = PiggyBank;
                        break;
                    case 'PATRIMONIO':
                        menu.icono = PackageCheck;
                        break;
                    default:
                        menu.icono = CircleArrowRight;
                }
                
                // Asignar iconos recursivamente a los hijos
                if (menu.children && menu.children.length > 0) {
                    this.assignIcons(menu.children);
                }
            });
        }
    },
});