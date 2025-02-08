import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../AuthProvider/AuthProvider'

function PrivetRoute({ children }) {
    const { user, loading } = useContext(authContext)
   
    if (loading) {
        return <div className='h-[100vh] flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
    } else if (!user) {
       return <Navigate to='/' />
    } else {
        return children
    }
}

export default PrivetRoute;