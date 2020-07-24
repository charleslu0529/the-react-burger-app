import React from 'react';

import Burger from '../../Burger/Burger';
import Buttons from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes great</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Buttons
                btnType="Danger"
                clicked={props.checkoutCancelled}>Cancel</Buttons>
            <Buttons
                btnType="Success"
                clicked={props.checkoutContinued}>Continue</Buttons>
        </div>
    );
}

export default checkoutSummary;