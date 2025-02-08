import { createContext, useEffect, useState } from "react"
import auth from './../../firebase/firebase.config';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export const authContext = createContext(null)

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function SignUpWithEmailPass(email, pass) {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    function SignInWithEmailPass(email, pass) {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    function loginWithFacebook() {
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => unSubscribe();
    }, [loading])

    function SingOut() {
        signOut(auth).then(() => {

          }).catch((error) => {
            // An error happened.
          });
    }

    const Authentication = {
        SignUpWithEmailPass,
        SignInWithEmailPass,
        loginWithGoogle,
        loginWithFacebook,
        user,
        loading,
        SingOut
    }


    return (
        <authContext.Provider value={Authentication}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider
