import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
// import {Link} from "react-router-dom";
// import { Route ,Routes  } from 'react-router-dom';

const checkoutSummary = (props)=>{

    return(
        <div className={classes.CheckoutSummary} >
            <h1>We hope it taste well!</h1>
            <div style={{width:'100%',margin:'auto' , }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType = "Danger" 
                clicked={props.checkoutCanceled}> CANCEL </Button>
            
            {/* <Link to="/checkout/contact-data" >
                <button className="btn btn-primary">CONTINUE</button> 
             </Link> */}
            <Button 
                    btnType = "Success"
                    clicked={props.checkoutContinued} > CONTINUE </Button>
                
        </div>
    );
}

export default checkoutSummary;