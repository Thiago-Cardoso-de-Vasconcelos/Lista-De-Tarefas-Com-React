import { useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

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

  const [copyReserve, setCopyReserve] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 1000),
        text,
        category,
        inCompleted: false,
      },
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
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };

  const deleteAll = () => {
    setCopyReserve([...todos]);
    setTodos([]);
    setShowButton(true);
  };

  const restoreList = () => {
    setTodos([...copyReserve]);
    setShowButton(false);
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === "All"
              ? true
              : filter === "Completed"
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
        ,
        {!showButton ? (
          <button onClick={deleteAll}>Deletar tudo</button>
        ) : (
          <button onClick={restoreList}>Restaurar Lista</button>
        )}
      </div>

      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
