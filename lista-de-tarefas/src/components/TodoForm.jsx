import { useState } from "react";


const TodoForm = ({addTodo}) => {
    const [valeu, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!valeu || !category) return;
        addTodo(valeu, category);
        setValue("");
        setCategory("");
    };



    return (
    <div className="todo-form">
      <h2>Criar tarefa:</h2>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Difite o título"
        value={valeu}
        onChange={(e) => setValue(e.target.value)} />

        <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}>

          <option value="">Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudo">Estudo</option>
        </select>
        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
