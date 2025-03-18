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
  onSelect: (value: string) => void;
  render: number;
  rota: string;
}

const SelectButton: React.FC<Props> = ({ atributo, label, onSelect, render, rota }) => {
  const [value, setValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch(rota)
      .then((response) => response.json())
      .then((data) => {
        const acaoList = data.Logs
          .map((item: any) => (typeof item.acao === 'string' ? item.acao : ''))
          .filter((value: any, index: any, array: any) => array.indexOf(value) === index); // Remover valores duplicados

        setItems(acaoList);
      })
      .catch((error) => console.error("Erro ao buscar ações:", error))
  }, []);

  useEffect(() => {
    setFilteredItems(["Sem filtro", ...items]);
  }, [items]); // este efeito depende de items

  useEffect(() => {
    setValue('');
  }, [render]); //reinicializa quando a página atualiza

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onSelect(event.target.value as string);
  };

  return ( // Renderiza quando `loading === false`
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
              sx={index === 0 ? { color: "gray" } : {}}
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
