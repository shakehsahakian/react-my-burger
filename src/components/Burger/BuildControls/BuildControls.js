import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {lable: 'Salad' , type:'salad'},
    {lable: 'Bacon' , type:'bacon'},
    {lable: 'Meat' , type:'meat'},
    {lable: 'Cheese' , type:'cheese'},
]

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current Price:<strong>{props.price.toFixed(2)}</strong> </p>
            {
                controls.map((ctrl)=>(
                    <BuildControl 
                        key={ctrl.lable} 
                        lable={ctrl.lable}  
                        more = {()=>props.ingredientAdded(ctrl.type)}
                        less = {()=>props.ingredientremoved(ctrl.type)}
                        disabled = {props.disabled[ctrl.type]}
                    />
                ))
            }
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchaseable}
                onClick = {props.ordered} >{ props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>

        </div>
    );
}
export default buildControls;