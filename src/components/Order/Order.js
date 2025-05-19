import React from 'react';
import classes from './Order.module.css';
const order = (props)=>{
    const ingredient = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <span 
                style={{
                    textTransform:'capitalize',
                    margin:'0 8px',
                    padding:'5px',
                    border:'1px solid #ccc',
                    display:'inline-block'
                }}>
                {igKey + '(' + props.ingredients[igKey] + ')' } </span> 
            
        );
    });


    return (
        <div className={classes.Order}>
           <p>Ingredients : {ingredient}</p>
            {/* <p>Ingredients : {igKey + '(' + this.props.ingredients[igKey] + ')' }</p> */}
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};
export default order;