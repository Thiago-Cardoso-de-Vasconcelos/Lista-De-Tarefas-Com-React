import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", minWidth: "200px" }}
      >
        <InputBase
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite para pesquisar..."
          sx={{ ml: 1, flex: 3 }}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default Search;
