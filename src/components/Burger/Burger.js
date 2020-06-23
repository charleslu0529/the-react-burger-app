import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    

    // props ingredients is an object, we need an array to map
    // Object.keys() extracts keys of given object and returns array
    // we'll get a string array of the keys without the values.

    //Array() creates empty array with parsed size.

    //map out ingredients,
    //then create array with size of ingredient value
    //map each array as component of that ingredient 

    let transformedIngredients = Object.keys(props.ingredients)
        .map(inKey =>{
            return [...Array(props.ingredients[inKey])].map((_, i) => {
                return <BurgerIngredient key={inKey + i} type={inKey} />
            });
        })
        .reduce((arr, el) => {
            
            return arr.concat(el);
        }, []);
       
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;