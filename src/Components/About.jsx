import React from 'react';
import classes from "./About.module.scss"
import Card from './Card';

const About = ({lengthOfTodos,lengthOfCompleted,onDeleteAll}) => {
    return (
    <Card className={classes.about}>
        <div>
        Tasks
        <span>{lengthOfTodos}</span>
        </div>
        <div>
        Completed
        <span>{lengthOfCompleted}</span>
        </div>
        <button onClick={onDeleteAll}>Delete All</button>
    </Card>
    )
}

export default About