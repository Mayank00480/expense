import { createContext } from "react";

const ContextStore = createContext({
    token : null,
    addToken : () =>{},
    removeToken : () =>{}
})
export default ContextStore