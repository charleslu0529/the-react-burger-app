import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];
    console.log("inputClasses: "+inputClasses);

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = <select
                                className={inputClasses.join(' ')}
                                value={props.value}
                                onChange={props.changed}>
                                {props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.displayValue}
                                    </option>
                                ))}
                            </select>;
            break;
        default:
            inputElement = <input
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}     
                            />;
    }

    let validationErrorMsg = null;

    if (props.invalid && props.touched) {
        validationErrorMsg = <p className={classes.ValidationErrorMsg}>Please enter a valid value!</p>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationErrorMsg}
        </div>
    );
}

export default input;