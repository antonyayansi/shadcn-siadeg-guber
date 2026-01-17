import { jwtVerify, SignJWT } from "jose";
import { defineStore } from "pinia";
import type { LoginCredentials, User } from "../types/user.interface";
import baseApi from "@/services/baseApi";

const secret: Uint8Array = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

export const auth = defineStore("auth", {
    state: () => ({
        isLoading: false as boolean,
        user: null as User | null,
        error: null as string | null,
    }),
    actions: {
        async checkJWTToken(){
            const jwt = localStorage.getItem("x0-jwt");
            if(!jwt) return false;
            try{
                const { payload } = await jwtVerify(jwt, secret);
                this.user = payload as unknown as User;
                return true;
            }catch(e){
                return false;
            }
        },
        async onLogin(credentials: LoginCredentials) {
            this.isLoading = true
            this.error = null
            try {
                const { data } = await baseApi.post('/login', credentials)
                if (!data[0]?.DNIUsuario) {
                    this.error = data[0]?.Estado;
                    return
                }
                const jwt = await new SignJWT(data[0])
                    .setProtectedHeader({ alg: 'HS256' })
                    .sign(secret);

                localStorage.setItem('x0-jwt', jwt);
                localStorage.setItem('x0-token', data[0].token);

                location.href = '/';
            } catch (e: string | any) {
                this.error = e?.response?.data?.message || 'Error del servidor';
            } finally {
                this.isLoading = false
            }
        },
        async onLogout() {
            try {
                await baseApi.post('/salir', {
                    token: localStorage.getItem('x0-token')
                });

                localStorage.removeItem('x0-token');
                localStorage.removeItem('x0-jwt');
                localStorage.removeItem('x0-empresa');
                localStorage.removeItem('x0-menus');
                localStorage.removeItem('x0-raw-menus');
                location.href = '/login';
            } catch (e) {
                localStorage.removeItem('x0-token');
                localStorage.removeItem('x0-jwt');
                localStorage.removeItem('x0-empresa');
                localStorage.removeItem('x0-menus');
                localStorage.removeItem('x0-raw-menus');
                location.href = '/login';
            }
        },
    },
});