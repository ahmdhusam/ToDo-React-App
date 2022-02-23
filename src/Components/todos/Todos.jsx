import React, { useCallback } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../card/Card";

import classes from "./Todos.module.scss";

const Todos = (props) => {
    const { todoList, onCompleteChange, onDeleteTodo, onLocationChange } =
        props;

    const onDragEnd = useCallback(
        ({ destination, source }) => {
            // the only one that is required

            if (destination === null) {
                return;
            }

            if (destination.index === source.index) {
                return;
            }

            onLocationChange(source.index, destination.index);
        },
        [onLocationChange]
    );

    let todos = <li className={classes.notasksmsg}>No Tasks</li>;

    if (!!todoList.length) {
        let completedXML = (
            <span className={classes.iscompleted}>Completed!</span>
        );

        todos = todoList.map((item, index) => (
            <Draggable
                draggableId={item.id.toString()}
                index={index}
                key={item.id}
            >
                {(provided, snapshot) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <li onClick={onCompleteChange.bind(null, item.id)}>
                                <p>{item.taskValue}</p>
                                {item.completed && completedXML}
                                <button
                                    className={classes.delbtn}
                                    onClick={onDeleteTodo.bind(null, item.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        </div>
                    );
                }}
            </Draggable>
        ));
    }

    return (
        <Card>
            <DragDropContext onDragEnd={onDragEnd}>
                <ul className={classes.outputs}>
                    <Droppable droppableId="list">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {/* only re-render if the students array reference changes */}
                                {todos}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </ul>
            </DragDropContext>
        </Card>
    );
};

export default Todos;
