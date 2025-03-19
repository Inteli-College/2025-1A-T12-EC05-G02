"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  atributo: string;
  label: string;
  items: string[];
  onSelect: (value: string) => void;
  render: number
}

const SelectButton: React.FC<Props> = ({ atributo, label, items, onSelect, render }) => {
  const [value, setValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  useEffect(() => {
    setFilteredItems(["Sem filtro", ...items]);
  }, [items]);

  useEffect(() => {
    setValue('')
  }, [render])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onSelect(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          size="small"
          label={atributo}
          onChange={handleChange}
        >
          {filteredItems.map((item, index) => (
            <MenuItem
              key={index}
              value={index === 0 ? "" : item}
              sx={index === 0 ? { color: "pink" } : {}}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectButton;
