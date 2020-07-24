import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {

    state = {
        orderForm: {
            name: this.initInputObject('text', 'Your name'),
            street: this.initInputObject('text', 'Street'),
            zipCode: this.initInputObject('text', 'ZIP code'),
            country: this.initInputObject('text', 'Country'),
            email: this.initInputObject('email', 'Your email'),
            deliveryMethod: this.initSelectObject()
        },
        formIsValid:false,
        loading:false
    }

    initInputObject (confType, confPlaceHolder) {
        return (
            {
                elementType: 'input',
                elementConfig: {
                    type: confType,
                    placeholder: confPlaceHolder
                },
                value: '',
                validation: {
                    required: true
                },
                valid :false,
                touched: false
            }
        );
    }

    initSelectObject () {
        return (
            {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest', displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest', displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        );
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log("setting state.loading to: true");
        this.setState({loading:true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log("got response from post method");
                this.setState({loading:false});
                this.props.history.push({pathname: "/"});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false});
            });
    }

    checkValidity (value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray =[];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                    {
                        formElementsArray.map( formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                shouldValidate={formElement.config.validation}
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                changed={(event)=> {this.inputChangedHandler(event, formElement.id)}}/>
                        ))
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;