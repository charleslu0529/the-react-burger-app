import React from 'react';
import Auxiliry from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

const layout = (props) => (
    <Auxiliry>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.LayoutContent}>
            {props.children}
        </main>
    </Auxiliry>
    
);

export default layout;