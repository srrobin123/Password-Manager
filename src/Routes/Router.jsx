import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Login from './../pages/Login';
import SingUp from '../pages/SingUp';
import PassManager from '../pages/PassManager';
import PrivetRoute from './PrivetRoute';

function Router() {
    const route = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            children: [
              {
                path: "/",
                element: <Login/>
              },
              {
                path: '/register',
                element: <SingUp/>
              },
              {
                path: '/PassManager',
                element: <PrivetRoute><PassManager/></PrivetRoute>
              }
            ]
        }
    ])
    
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  )
}

export default Router
