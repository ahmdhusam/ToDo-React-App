import React from 'react';
import classes from "./About.module.scss"

const About = ({lengthOfTodos,lengthOfCompleted,onDeleteAll}) => {
    return (
    <div className={classes.about}>
        <div>
        Tasks
        <span>{lengthOfTodos}</span>
        </div>
        <div>
        Completed
        <span>{lengthOfCompleted}</span>
        </div>
        <button onClick={onDeleteAll}>Delete All</button>
    </div>
    )
}

export default About
