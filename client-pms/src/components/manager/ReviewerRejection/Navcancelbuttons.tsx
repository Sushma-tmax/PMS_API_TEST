import React from 'react';
import { styled } from "@mui/material/styles";
import Left1 from '../Reviewericons/Left.svg';
import Right1 from '../Reviewericons/Right.svg';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';


const Cancel = styled("div")({
  '& .MuiButton-root': {
      color: '#004C75',
      fontSize: '16px',
      fontWeight: '400',
      textTransform: 'none',
  },
  '& .MuiButton-outlined': {
      border: '1px solid #004C75',
      borderRadius: '10px',
      width: '140px'
  }
});
const Left = styled("div")({
  '& .MuiButton-root': {
      color: '#3C8BB5',
  },
});
const Right = styled("div")({
  '& .MuiButton-root': {
      color: '#3C8BB5',
  },
});
const FooterStack = styled('div')({
 
  marginTop: "30px",
  paddingBottom: '40px'

});

export const Navcancelbuttons = () => {
  return (
    <FooterStack>
    <Stack direction="row"
        justifyContent="space-between"
        alignItems="center"  >
        <Left> <Button size="large"><img src={Left1} alt='icon' /></Button></Left>
        {/* <Cancel>
            <Button
                variant="outlined"
                size="large"
            >
                Cancel
            </Button>
        </Cancel> */}
        <Right> <Button size="large"><img src={Right1} alt='icon' /></Button></Right>
    </Stack>
</FooterStack>
  )
}
