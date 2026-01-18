import { storeToRefs } from "pinia";
import { system } from "../store/system";

const useSystem = () => {
    const storeSystem = storeToRefs(system());

    return {
        ...storeSystem,
        checkEmpresa: system().checkEmpresa,
        getEmpresas: system().getEmpresas,
        selectEmpresa: system().selectEmpresa,
        getMenus: system().getMenus,
    };
}

export default useSystem;