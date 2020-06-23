import React from 'react';
import Auxiliry from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Auxiliry>
        <Toolbar/>
        <main className={classes.LayoutContent}>
            {props.children}
        </main>
    </Auxiliry>
    
);

export default layout;