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
  id?: boolean
}

const SelectButton: React.FC<Props> = ({ atributo, label, onSelect, render, rota, id }) => {
  const [value, setValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [ids, setIds] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch(rota, {
      headers: {
      "ngrok-skip-browser-warning": "true",
      "Authorization": `Bearer ${document.cookie.split('token=')[1]}`,
      "User-Agent": "Custom-User-Agent" // Alternative way to bypass
      }
    })
      .then((response) => response.json())
      .then((data) => {
      if (!id) {
      const acaoList = data.Logs
        .map((item: any) => (typeof item.acao === 'string' ? item.acao : ''))
        .filter((value: any, index: any, array: any) => array.indexOf(value) === index); // Remover valores duplicados

      setItems(acaoList);
      } else {
        const acaoList = data.Logs.map((item: any) => item.acao);
        const idList = data.Logs.reduce((acc: Record<string, any>, item: any) => {
          acc[item.acao] = item.id;
          return acc;
        }, {});


        setItems(acaoList);
        setIds(idList)
      }
      })
      .catch((error) => console.error("Erro ao buscar ações:", error));
  }, []);

  useEffect(() => {
    setFilteredItems(["Sem filtro", ...items]);
  }, [items]); // este efeito depende de items

  useEffect(() => {
    setValue('');
  }, [render]); //reinicializa quando a página atualiza

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    if (!id) {
      onSelect(event.target.value as string);
    }
    else {
      onSelect(ids[event.target.value as string])
    }
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
