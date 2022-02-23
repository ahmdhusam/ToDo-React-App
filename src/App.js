import React, { useEffect, useState, useCallback } from "react";

import "./App.css";

import Form from "./Components/form/Form";
import About from "./Components/about/About";
import Todos from "./Components/todos/Todos";

function App() {
    const [todoList, setTodoList] = useState([]);

    const lengthComp = todoList?.filter((el) => el?.completed);

    useEffect(() => {
        if (localStorage.getItem("todos")) {
            const todosList = JSON.parse(localStorage.getItem("todos"));
            setTodoList(todosList);
        }
    }, [setTodoList]);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    const AddTodo = useCallback((todo) => {
        setTodoList((prev) => [...prev, todo]);
    }, []);

    const deleteTodo = useCallback((id, event) => {
        event.stopPropagation();
        setTodoList((prev) => {
            const newTodos = prev.filter((item) => item.id !== id);
            return newTodos;
        });
    }, []);

    const deleteAll = useCallback(() => {
        setTodoList([]);
    }, []);

    const completeChange = useCallback((id) => {
        setTodoList((prev) => {
            let newTodos = prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            );
            return newTodos;
        });
    }, []);

    const changeTodoLocation = useCallback((from, to) => {
        const swapTodo = (prev) => {
            const todo = prev[from];
            const filteredTodos = prev.filter((item, index) => index !== from);
            filteredTodos.splice(to, 0, todo);
            return filteredTodos;
        };

        setTodoList(swapTodo);
    }, []);

    return (
        <div className="app">
            <Form todoList={todoList} onAddTodo={AddTodo} />
            <About
                lengthOfTodos={todoList.length}
                lengthOfCompleted={lengthComp.length}
                onDeleteAll={deleteAll}
            />
            <Todos
                todoList={todoList}
                onCompleteChange={completeChange}
                onDeleteTodo={deleteTodo}
                onLocationChange={changeTodoLocation}
            />
        </div>
    );
}

export default App;
