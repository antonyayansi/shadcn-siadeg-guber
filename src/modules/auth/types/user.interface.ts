export interface User {
    DNIUsuario: string;
    Nombre: string;
    Iniciales: string;
    Perfil: string;
    Estado: string;
    FBaja: string;
    Avatar: string | null;
    TiempoSesion: string;
    NroEmpresas: string;
    CodEmpresa: string;
    RUCPrivado: string;
    RSocialPrivado: string;
    RazonSocial: string;
    faciales: string;
    token: string;
}

export interface LoginCredentials {
    dni: string;
    clave: string;
    sistema?: string;
}