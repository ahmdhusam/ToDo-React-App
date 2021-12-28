import './App.css'
import React, { useEffect, useState } from 'react'
import Form from './Components/Form'
import About from './Components/About'
import Todos from './Components/Todos'

function App() {
    const [todoList, setTodoList] = useState([]);
    const lengthComp = todoList.filter(el => el.completed);

    useEffect(() => {
        if (localStorage.getItem("todos")) {
            const todosList = JSON.parse(localStorage.getItem("todos"));
            setTodoList(todosList)
        }
    },[])

    const AddTodo = (todo) => {
        setTodoList(prev => {
            let newTodos = [...prev, todo];
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }

    const deleteTodo = (event,id) => {
        event.stopPropagation();
        setTodoList(prev => {
            let newTodos = prev.filter(item => item.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const deleteAll = () => {
        setTodoList([])
        localStorage.setItem("todos",JSON.stringify([]))
    }

    const completeChange = (id) => {
        setTodoList(prev => {
            let newTodos = prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }


    return (
        <div className='app'>
            <Form todoList={todoList} onAddTodo={ AddTodo}/>
            <About lengthOfTodos={todoList.length} lengthOfCompleted={lengthComp.length} onDeleteAll={deleteAll }/>
            <Todos todoList={todoList} onCompleteChange={completeChange} onDeleteTodo={deleteTodo }/>
        </div>
    )
}

export default App
