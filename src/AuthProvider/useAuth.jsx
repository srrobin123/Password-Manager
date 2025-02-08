import { useContext } from "react"
import { authContext } from "./AuthProvider"


function useAuth() {
    const all = useContext(authContext)
    return all
}

export default useAuth;
