import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/material/styles";
import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';

const Typo1 = styled("div")({

  marginTop: "-13px",
  fontSize: '14px',
  color: '#333333'

});

const Dropdownbutton = (props: any) => {
   // @ts-ignore   
   const {ratingData} = useReviewerContext()
   const [rating,setRating] = React.useState("")

  return (
    <div>

      <FormControl variant="standard" sx={{ minWidth: 140 }}>
        <InputLabel><Typo1><p>Choose Rating</p></Typo1></InputLabel>

        <Select 
        value = {rating} 
        onChange = {(e) => setRating(e.target.value) }>
          {ratingData && ratingData.data.map((j: any, index: any) => {
            return (
              <MenuItem value={j._id}>{j.rating}</MenuItem>
            )
          })}
        </Select>

      </FormControl>




    </div>
  );
}

export default Dropdownbutton
