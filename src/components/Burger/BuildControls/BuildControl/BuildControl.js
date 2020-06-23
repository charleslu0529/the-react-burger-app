import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (prop) => (    
    <div className={classes.BuildControl}>
        <div className={classes.Label}>
            {prop.label}
        </div>
        <button className={classes.Less} onClick={prop.removed} disabled={prop.disabled}>Less</button>
        <button className={classes.More} onClick={prop.added}>More</button>
    </div>
);

export default buildControl;