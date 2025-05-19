import React from 'react';
import classes from './Input.module.css';
const input = (props) => {
    let inputelement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldvalidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputelement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange = {props.changed} />;
            break;
        case 'textarea':
            inputelement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange = {props.changed} />;
            break;
        case 'select':
            inputelement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange = {props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key = {option.value}
                            value={option.value}
                            label = {option.displayValue}></option>
                    ))}
                </select>
            );
            break;
        default:
            inputelement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange = {props.changed} />;

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Lable}> {props.lable} </label>
            {inputelement}
        </div>
    );
}
export default input;