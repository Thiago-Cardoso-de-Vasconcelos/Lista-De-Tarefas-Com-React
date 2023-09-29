import { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar Funcionalidade x no sistema",
      category: "Trabalho",
      isCompletd: false,
    },
    {
      id: 2,
      text: "Fazer exercícios",
      category: "Pessoal",
      isCompletd: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompletd: false,
    },
  ]);

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random()* 1000),
        text,
        category,
        inCompleted: false,
      }
    ];
    setTodos(newTodos);
  };

  // const removeTodo= (id) => {
  //   const newTodos = [ ...todos]
  //   const filterdTodos = newTodos.filter((todo)=>
  //   todo.id !== id ? todo : null
  //   );
  //   setTodos(filterdTodos);
  // }
  const removeTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  }

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
    todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  }



  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
          />
        ))}
      </div>
      <TodoForm addTodo={addTodo}/>
    </div>
  );
}

export default App;
