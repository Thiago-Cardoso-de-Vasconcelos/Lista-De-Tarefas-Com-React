import { useState } from "react";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


import NativeSelect from "@mui/material/NativeSelect";

import TextField from "@mui/material/TextField";

const TodoForm = ({ addTodo }) => {
  const [valeu, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valeu || !category) return;
    addTodo(valeu, category);
    setValue("");
    setCategory("");
  };

  return (
    <div className="todo-form">
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          style={{ width: '320px' }}      
          label="Digite sua tarefa!"
          variant="standard"
          value={valeu}
          onChange={(e) => setValue(e.target.value)}
        />
        
        <div>
        
        <NativeSelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="x">Categoria</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Estudo">Estudo</option>
        </NativeSelect>
        </div>
      

        <Button
         style={{ whiteSpace: 'nowrap'}}           
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Criar tarefa
        </Button>
        
      </form>
    </div>
  );
};

export default TodoForm;
