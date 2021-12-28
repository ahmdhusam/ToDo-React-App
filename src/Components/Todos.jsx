import React from 'react';
import classes from "./Todos.module.scss";

const Todos = ({ todoList, onCompleteChange ,onDeleteTodo}) => {
    let completedXML = (<span className={classes.iscompleted}>Completed!</span>);
    let data;

    
    if (!todoList.length) {
        data = <li className={classes.notasksmsg}>No Tasks</li>;
    } else {
        data = todoList.map(item => (
            <li key={item.id} onClick={() => onCompleteChange(item.id)}>
                <p>{item.taskValue}</p>
                {item.completed && completedXML}
                <button className={classes.delbtn} onClick={(event)=> onDeleteTodo(event,item.id)}>Delete</button>
            </li>
            ));
    
    }



    return (
        <div>
            <ul className={classes.outputs}>
            {data}
            </ul>
        </div>
    )
}

export default Todos
