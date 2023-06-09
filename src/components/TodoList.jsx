import React,{useEffect, useState} from "react";
import AddTodo from "./AddTodoList";
import Todo from "./Todo";

export default function TodoList({filter}) {
    const [todos,setTodos] = useState(readTodosFromLocalStroage);
const handleAdd = (todo) => setTodos([...todos,todo])
const handleUpdate = (updated) => setTodos(todos.map((t)=>( t.id === updated.id ? updated : t)));
const handleDelete = (deleted) => setTodos(todos.filter((t)=> t.id !== deleted.id));

useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
},[todos]);

const filtered = getFilterItems(todos,filter)
    return(
        <section>
            <ul>
                {filtered.map((item)=>(<Todo key={item.id} 
                todo={item} onUpdate={handleUpdate}
                onDelete={handleDelete}>{item.text}</Todo>))}
            </ul>
            <AddTodo onAdd={handleAdd} />
        </section>
    );
}

function getFilterItems(todos,filter){
    if(filter === 'all'){
        return todos;
    }
    return todos.filter(todo=>todo.status === filter)
}
function readTodosFromLocalStroage() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [] ;
}