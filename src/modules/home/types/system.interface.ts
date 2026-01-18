import type { LucideIcon } from "lucide-vue-next"

export interface Empresa {
  CodEmpresa: string
  RUCPrivado: string
  RSocialPrivado: string
  RazonSocial: string
  Abreviado: string
  Iniciales: string
  Regimen: string
  Pliego: string
  RutaSIAF: string
  Modelo: string
  Vaucher: string
  Inventario: string
  ProgControlDepUser: string
  ProgControlPyUser: string
  ValeGrupo: string
  ClasifGeneral: string
  ControlPto: string
  ControlPatrim: string
  ControlSS: string
  AutorizacionCC: string
  FirmaElectronica: string
  FirmaElectronica5F: string
  FirmaElectronicaF: string
  PtoAutorizaReq: string
  AutorizacionReq: string
  NroReqUnico: string
  UserSecFun: string
  ObsEmpresas: string
  Tema: string
  Provincia: string
  Departamento: string
  HostNube: string
  CapacidadMb: string
  Actividad: string
  CodUbigeo: string
  Direccion: string
  Upload: string
  CatalogoProd: string
  RQ_Fecha: string
  CZ_Fecha: string
  CC_Fecha: string
  OC_Fecha: string
  OS_Fecha: string
  PCS_Fecha: string
  Dep_Usuario: string
  Sucursal: string
}

export interface Menu {
  Sistema: string
  botonesWeb: string
  componente?: string
  estado: string
  icono?: LucideIcon
  id: string
  menus_id: string | null
  nombre?: string
  paneles: string
  ruta: string,
  children?: Menu[]
}