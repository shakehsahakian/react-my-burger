import React ,{ Component } from 'react';
import Aux from '../../../hoc/auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functional component
    componentDidUpdate(){
        console.log('[OrderSummary] WillUpdate');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            // return <li>{igKey+': '+props.ingredients[igKey]}</li>
            // return <li><span style={{textTransform : 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
            return (
                <li key={igKey}>
                    <span style={{textTransform : 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );


        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchseContinued}>CONTINUE</Button>

            </Aux>
        )
    }
};
export default OrderSummary;