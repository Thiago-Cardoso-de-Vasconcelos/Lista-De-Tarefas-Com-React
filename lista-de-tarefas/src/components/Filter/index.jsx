
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NativeSelect from "@mui/material/NativeSelect";

const Filter = ({ filter, setFilter, setSort }) => {
  return (
    <div className="filter">
    
        <div className="filter-options-status">
          <FilterAltIcon />
          <NativeSelect
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
           >
            <option value="All">Status</option>            
            <option value="Completed">Completas </option>
            <option value="Incomplete">Incompletas</option>
            <option value="All">Todas</option>
          </NativeSelect>
        </div>

        <div className="alphabetical-order">
          <p>Ordem alfabética:</p>
          <button onClick={() => setSort("Asc")}><ArrowDropUpIcon/></button>
          <button onClick={() => setSort("Desc")}><ArrowDropDownIcon/></button>
        </div>
    </div>
  );
};

export default Filter;
