import { Navigate, Outlet } from 'react-router-dom'
const privateRoutes = ({token}) => {
  
    return token ? <Outlet/> : <Navigate to='/auth'/>
    
};
export default privateRoutes;
