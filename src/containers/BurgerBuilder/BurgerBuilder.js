import React, { Component } from "react";
import { connect } from "react-redux";


import Aux from '../../hoc/auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import WithRouter from '../../hoc/withRouter';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';




class BurgerBuilder extends Component {
    // constractor(props){
    //     super(props);
    //     this.state{...}
    // }

    state = {
        // totalPrice: 4,
        //purchaseable: false,
        purchasing: false
        // loading: false,
        // error: false
    }
    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {

        let sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum = sum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const oldPrice = this.state.totalPrice;
    //     // console.log(oldPrice);
    //     const price = INGREDIENT_PRICES[type];
    //     // console.log(price+'-------') ;
    //     const newPrice = oldPrice + price;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];

    //     if (oldCount <= 0) {
    //         return;
    //     }

    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const oldPrice = this.state.totalPrice;
    //     console.log(oldPrice);
    //     const price = INGREDIENT_PRICES[type];
    //     console.log(price);
    //     const newPrice = oldPrice - price;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients);

    // }
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.navigate('/auth');
        }
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    // purchaseContinueHandler = () => {
    //     //alert('You continue!');


    //     const queryParams = [];

    //     for (let i in this.state.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //         console.log(this.state.ingredients[i]);

    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
    //     this.props.navigate({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    // }

    //استفاده از ریداکس برای استیتها
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.navigate('/checkout');
    }
    render() {
        const diabledInfo = {
            // ...this.state.ingredients
            ...this.props.ings
        };
        for (let key in diabledInfo) {
            diabledInfo[key] = diabledInfo[key] <= 0;
        }


        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded! </p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientremoved={this.props.onIngredientRemoved}
                        disabled={diabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchseCanceled={this.purchaseCancelHandler}
                purchseContinued={this.purchaseContinueHandler} />;

        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}

                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(WithRouter(BurgerBuilder), axios));