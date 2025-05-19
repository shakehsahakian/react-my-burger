import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import PrivateRoutes from './components/PrivateRoutes';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

// import ContactData from "./containers/BurgerBuilder/Checkout/ContactData/ContactData";

// import { Navigate, NavLink } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

   
    render (){
      let routes; 
      if (this.props.isAuthenticated) 
      { 
        routes = ( 
          <Routes> 
            <Route path="/checkout/*" element={<Checkout />} /> 
            <Route path="/orders" element={<Orders />} /> 
            <Route path="/logout" element={<Logout />} /> 
            <Route path="/" element={<BurgerBuilder />} /> 
            <Route path="*" element={<Navigate to={this.props.authRedirectPath} replace />} /> 
          </Routes> 
        ); 
        } else { 
          routes = ( 
            <Routes> 
              <Route path="/auth" element={<Auth />} /> 
              <Route path="/" element={<BurgerBuilder />} /> 
              <Route path="*" element={<Navigate to="/" replace />} /> 
            </Routes>
          ); 
        } 
        return(
          <div >
            <Layout>
              {routes} 
            </Layout>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
