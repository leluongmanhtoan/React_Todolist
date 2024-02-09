import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Box, Typography } from '@mui/material';
/* const initialTodos = [
    { id: 1, text: "Thuc day", completed: false },
    { id: 2, text: "Danh rang", completed: false },
    { id: 3, text: "An sang", completed: true },
    { id: 4, text: "Lam viec", completed: false },
    { id: 5, text: "Di ngu", completed: true },
] */
const getInitData = () => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (!data) return [];
    return data;
}
export default function TodoList() {
    const [todos, setTodos] = useState(getInitData)
    useEffect(() => {
        localStorage.setItem(
            "todos", JSON.stringify(todos)
        );
    }, [todos])
    const removeTodo = (id) => {
        setTodos(prevTodos => {
            return prevTodos.filter(t => t.id !== id)
        })
    }
    const toggleTodo = (id) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                } else {
                    return todo;
                }
            })
        })
    }
    const addTodo = (text) => {
        setTodos((prevTodos) => {
            return [...prevTodos, { text: text, id: crypto.randomUUID(), completed: false }]
        })
    }
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            m: 3
        }}>
            <Typography variant='h2' component="h1" sx={{ flexGrow: 1 }}>
                Tasks
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map((todo) => {
                    return <TodoItem todo={todo} key={todo.id} remove={removeTodo} toggle={toggleTodo} />
                })}
                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    );
}

