import React from 'react';
import { useLocation, useNavigate ,useParams } from 'react-router-dom';
// , useMatch
 
const withRouter = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // const match = useMatch();
  return (
    <WrappedComponent
      {...props}
      navigate={navigate}
      params={params}
      location = {location}
      //match = {match}
    />
  );
  // return <Component {...props} router={{ location, navigate, params }} />;

};
 
export default withRouter;