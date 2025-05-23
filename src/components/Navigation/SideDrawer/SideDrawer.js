import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxilary';


const sideDrawer = (props)=>{
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if(props.open)
    {
        attachedClasses = [classes.SideDrawer,classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                    {/* height = "11%"  */}
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;