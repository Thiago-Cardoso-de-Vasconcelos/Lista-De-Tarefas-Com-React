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
          style={{minWidth: '150px', width:'100%' }}      
          label="Digite sua tarefa!"
          variant="standard"
          value={valeu}
          onChange={(e) => setValue(e.target.value)}
        />
        
        <div className="conteiner-form-button">        
        <NativeSelect
          style={{ minWidth: '100px'}} 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="x">Categoria</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Estudo">Estudo</option>
        </NativeSelect>
       
      

        <Button
         style={{ whiteSpace: 'nowrap', minWidth: '120px'  }}           
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Criar tarefa
        </Button>
        </div>
        
      </form>
    </div>
  );
};

export default TodoForm;
