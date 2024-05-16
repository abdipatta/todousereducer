import React, { useReducer, useState } from "react";
import styled from "styled-components";

const reducerFn = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "deleteTodo":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case "editTodo":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item
        ),
      };
    default:
      return state;
  }
};

const App = () => {
  const initialState = {
    todos: [],
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        title: newTodo.trim(),
      };
      dispatch({ type: "addTodo", payload: newTodoItem });
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "deleteTodo", payload: id });
  };

  const handleEditTodo = (id, newTitle) => {
    dispatch({ type: "editTodo", payload: { id, title: newTitle } });
  };

  return (
    <Container>
      <Input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <Button onClick={handleAddTodo}>Add</Button>
      <TodoList>
        {state.todos.map((todo) => (
          <TodoItem key={todo.id}>
            <span>{todo.title}</span>
            <Button onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
            <Input
              type="text"
              defaultValue={todo.title}
              onBlur={(e) => handleEditTodo(todo.id, e.target.value)}
            />
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
};

export default App;

const Container = styled.div`
  margin: 20px;
  /* align-items: center;
  justify-content: center;
  display: flex; */
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    border: 5px solid gray;
  }
`;

const Button = styled.button`
  padding: 10px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li`
  margin-bottom: 10px;
`;
