import React, { Component } from "react";
import { connect } from "react-redux";

import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import WithRouter from '../../../hoc/withRouter';
import { Route, Routes, Navigate } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

  
    //componentWillMount استفاده نمیکنیم . به خاطر استفاده از ریداکس از استیت و 

    // state = {
    //     ingredients :null,
    //     totalprice : 0
    // }
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries())
    //     {
    //         if(param[0] === 'price')
    //         {
    //             price = param[1];
    //         }
    //         else
    //         {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients : ingredients, totalprice : price});
    //     console.log(this.props.location.pathname +'/contact-data');

    // }
    checkoutCanceledHandler = () => {
        this.props.navigate(-1);
    }
    checkoutContinuedHandler = () => {
        this.props.navigate('/checkout/contact-data', { replace: true });
    }

   
    render() {
        let summary = <Navigate to="/" replace={true} />
        if (this.props.ings) {

            const purchsedRedirect = this.props.purchased ? <Navigate to="/" replace /> : null;

            summary = (
                <div>
                    {purchsedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Routes>
                        <Route path='contact-data' element={<ContactData />} />
                        {/* به خاطر استفاده از ریداکس لازم نیست تا پارامترها را ارسال کنیم
                        element={<ContactData ingredients={this.state.ingredients} price={this.state.totalprice} {...this.props} />} */}
                    </Routes>
                </div>
            );
        }
        return summary;

        
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(WithRouter(Checkout));