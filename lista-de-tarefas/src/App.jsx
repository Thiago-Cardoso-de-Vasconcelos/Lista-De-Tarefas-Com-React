import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

function App() {

  const storedTodos = JSON.parse(localStorage.getItem('Todos')) || [
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

  ];
  const storedListasJSON = localStorage.getItem('listas');
  const storedListas = storedListasJSON ? JSON.parse(storedListasJSON) : {
    todos: [],
    copyReserve: [],
    deletedItems: [],
  };

  const [todos, setTodos] = useState(storedTodos);
  const [copyReserve, setCopyReserve] = useState(storedListas.copyReserve);
  const [deletedItems, setDeletedItems] = useState(storedListas.deletedItems);
  
  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(todos));
    localStorage.setItem('listas', JSON.stringify({ todos, copyReserve, deletedItems }));
  }, [todos, copyReserve, deletedItems]);



  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  
  const [showButton, setShowButton] = useState(false);

  const [showButtonLength, setshowButtonLength] = useState(true);
  useEffect(() => {
    // Atualiza a visibilidade do botão com base no tamanho da lista `todos`
    if (todos.length <= 1) {
      setshowButtonLength(false);
    }
    if (todos.length > 1) {
      setshowButtonLength(true);
    }
  }, [todos]);

  
  const [showButtonUndo, setShowButtonUndo] = useState(false);
  useEffect(() => {
    // Atualiza a visibilidade do botão com base no tamanho da lista `todos`
    if (deletedItems.length >= 1) {
      setShowButtonUndo(true);
    }
    if (deletedItems.length < 1) {
      setShowButtonUndo(false);
    }
  }, [deletedItems]);





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

  const removeTodo = (id) => {
    const todoToRemove = todos.find((todo) => todo.id === id);
    if (todoToRemove) {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);

      // Verifique se o item já está na lista deletedItems antes de adicioná-lo
    if (!deletedItems.find((item) => item.id === id)) {
      // Adicione o item à lista deletedItems, mas verifique o tamanho máximo
      const updatedDeletedItems = [
        todoToRemove,
        ...deletedItems.slice(0, 1) // Mantenha no máximo 4 itens
      ];
      setDeletedItems(updatedDeletedItems);
    }
  }
};

  const returnToList = () => {
    if (deletedItems.length > 0) {
      const [lastDeletedTodo, ...restDeletedItems] = deletedItems;

      // Adicione o último item excluído de volta à lista de tarefas
      setTodos((prevTodos) => [lastDeletedTodo, ...prevTodos]);

      // Atualize a matriz de itens excluídos para conter os itens restantes
      setDeletedItems(restDeletedItems);

      // Se não houver mais itens excluídos, defina o estado para null
      if (restDeletedItems.length === -1) {
        setDeletedItems(null);
      }
    }
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
        <button
          style={{ display: showButtonUndo ? "block" : "none" }}
          onClick={returnToList}
        >
          Desfazer
        </button>
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
          <button
            style={{ display: showButtonLength ? "block" : "none" }}
            onClick={deleteAll}
          >
            Deletar tudo
          </button>
        ) : (
          <button onClick={restoreList}>Restaurar Lista</button>
        )}
      </div>

      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
