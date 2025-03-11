"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  atributo: string;
  label: string;
  items: string[];
}

const SelectButton: React.FC<Props> = ({ atributo, label, items }) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size='small'>{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          size='small'
          label={atributo}
          onChange={handleChange}
        >
          {items.map((value, index) => <MenuItem key={index} value={value}>{value}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
export default SelectButton;
