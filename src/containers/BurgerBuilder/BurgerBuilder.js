import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
        };

    }
    
    
    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState =(ingredients) =>{

        const sum = Object.keys(ingredients)
            .map(inKey => {
                // console.log("ingredients[inKey] = "+ingredients[inKey]);
                return ingredients[inKey]
            })
            .reduce((sum, el) => {
                // console.log("sum + el = "+sum+" + " + el);
                return sum + el;
            });
            // console.log("sum = "+sum);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancel = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingrs
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Cannot load ingredients</p>:<Spinner />;

        if (this.props.ingrs) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingrs}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable = {this.updatePurchaseState(this.props.ingrs)}
                        ordered={this.purchaseHandler}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingrs}
                totalPrice={this.props.price}
                purchaseCancelled={this.purchaseCancel}
                purchaseContinue={this.purchaseContinueHandler}/>
        }
        

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.order.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));