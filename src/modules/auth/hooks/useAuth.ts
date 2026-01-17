import { storeToRefs } from "pinia";
import { auth } from "../store/auth";

const useAuth = () => {

    const storeAuth = storeToRefs(auth());
    
    return {
        ...storeAuth,
        checkJWTToken: auth().checkJWTToken,
        onLogin: auth().onLogin,
        onLogout: auth().onLogout,
    };

}

export default useAuth;