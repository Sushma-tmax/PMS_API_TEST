import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/material/styles";



const Typo1 = styled("div")({

  marginTop: "-15px",
  fontSize: '13px',
  opacity: '0.5',
  fontWeight: '400',
  color: '#333333'

});

export default function Dropdownbutton() {


  return (
    <div>
      <FormControl size='small' sx={{ minWidth: 373, backgroundColor: '#FFFFFF', }}>
        <InputLabel ><Typo1><p>Select</p></Typo1></InputLabel>
        <Select>
          <MenuItem value={1.0}>1.0</MenuItem>
          <MenuItem value={1.5}>1.5</MenuItem>
          <MenuItem value={2.0}>2.0</MenuItem>
          <MenuItem value={2.5}>2.5</MenuItem>
        </Select>
      </FormControl>


    </div>
  );
}
