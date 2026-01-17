import useAuth from "@/modules/auth/hooks/useAuth";

const isAuth = async (to:any, from:any, next:any) => {
    
    const {
        checkJWTToken,
    } = useAuth();
    
    const ok = await checkJWTToken();

    if(ok) next();
    else next('/login');
}

export default isAuth;