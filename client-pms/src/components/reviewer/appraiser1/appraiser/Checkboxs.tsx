import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';



const Contain = styled("div")({
    marginLeft: "25px",
    marginRight: "20px",
    marginTop: '10px',
    width: '1000',
    paddingTop: '0px'

});
const I1 = styled("div")({
    fontSize: '14px',
    color: '#008E97',
    opacity: 0.84
});
const HRActions = styled("div")({
    marginLeft: "25px",
    marginTop: '25px',
    color: '#008E97',
    fontSize: '13px',
    opacity: 0.85,

});
export default function Checkboxs() {
    return (
        <div>
            <HRActions>
                HR Actions
            </HRActions>
            <Contain>
                <Box   >
                    <Stack direction="row" spacing={25}>
                        <I1>Item 1</I1>
                        <I1>Item 2</I1>
                        <I1>Item 3</I1>
                        <I1>Item 4</I1>
                        <I1>Item 5</I1>
                        <I1>Item 6</I1>
                    </Stack>
                </Box>
            </Contain>
        </div>
    );
}
