import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            ingredients:null,
            totalPrice:4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };

        this.addIngredientHander = this.addIngredientHander.bind(this);
        this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    }
    
    componentDidMount () {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data});
            })
            .catch(error => {
                this.setState({error:true});
            });
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

        this.setState({purchasable: sum > 0})
    }

    addIngredientHander = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount >= 1) {
            const updatedCount = oldCount-1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            const priceDeduction = INGREDIENT_PRICES[type];
            updatedIngredients[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        }
        else {
            return;
        };
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancel = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        console.log("setting state.loading to: true");
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name:'Charles Lu',
                address: {
                    street: 'thisstreet 0',
                    zipCode: 'M2V 0C2',
                    country: 'Canada'
                },
                email: 'test@thistest.com'
            },
            deliveryMethod: 'fast'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log("got response from post method");
                this.setState({loading:false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false, purchasing: false});
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Cannot load ingredients</p>:<Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHander}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancel}
                purchaseContinue={this.purchaseContinueHandler}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);