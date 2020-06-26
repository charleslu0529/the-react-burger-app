import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {

    // Could be a functional component.
    // doesn't have to be a class
    // componentWillUpdate(){
    //     console.log('[OrderSummary] Will Update');
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(inKey => {
            return (
                <li key={inKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {inKey}
                    </span>
                    : {this.props.ingredients[inKey]}
                </li>)
        });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the folliwing ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        );
    }
};

export default OrderSummary;