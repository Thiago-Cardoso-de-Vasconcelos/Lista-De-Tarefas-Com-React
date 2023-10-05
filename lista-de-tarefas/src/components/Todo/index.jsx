import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div className="todo"
    style={{opacity: todo.isCompleted ? "0.4" : "1"}}
    
    >
      <div className="content"
      style={{textDecoration: todo.isCompleted ? "line-through" : ""}}
      >
        <p>{todo.text}</p>
        <p className="category">({todo.category})</p>
      </div>
      <div className="conteiner-button-todo" >
        <button className="complete" onClick={()=>completeTodo(todo.id) }
        > {todo.isCompleted ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon />}</button>
        <button className="remove" onClick={()=>removeTodo(todo.id)}>
          <DeleteIcon/>
          </button>
      </div>
    </div>
  );
};

export default Todo;
