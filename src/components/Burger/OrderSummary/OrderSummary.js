import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(inKey => {
        return (
            <li key={inKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {inKey}
                </span>
                : {props.ingredients[inKey]}
            </li>)
        });
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the folliwing ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxiliary>
    );
};

export default orderSummary;