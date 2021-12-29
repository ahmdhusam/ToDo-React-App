import React, { useState } from 'react';
import Card from './Card';
import classes from "./Form.module.scss";
import Warning from './Warning';

const Form = ({todoList,onAddTodo}) => {
    const [inputValue, setInputValue] = useState("");
    const [isFound, setIsFound] = useState(false);

    const submitData = (event) => {
        event.preventDefault();
        if (inputValue !== "") {
            const todo = {
                id:Math.random(),
                taskValue: inputValue,
                completed: false,
            }
            onAddTodo(todo);
            setInputValue("");
            setIsFound(false);
        }
    }

    const getInputValue = (event) => {
        let value = event.target.value;
        setInputValue(value)
        if (value !== "") {
            const extedToDo = todoList.filter((element) => element.taskValue.toLowerCase().includes(value.toLowerCase()));
            if (extedToDo.length) {
                setIsFound(true)
            } else {
                setIsFound(false)
            }
        } else {
            setIsFound(false)
        }
    }

    return (
        <Card>
        <form className={classes.form} onSubmit={submitData}>
            <input type="text" value={inputValue} className={classes.input}  onChange={getInputValue}/>
            <input type="submit" value="+" className={classes.submit}/>
        </form>
            {isFound && <Warning />}
        </Card>
    )
}

export default Form
