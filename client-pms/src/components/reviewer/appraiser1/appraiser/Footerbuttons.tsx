import React from 'react';

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';


const Typo1 = styled("div")({
    fontSize: '16px',
    fontWeight: 400
});


function Footerbuttons() {
    return (

        <Stack spacing={3} direction="row">

            <Button variant="contained" style={{
                backgroundColor: "#008E97",
                fontSize: "16px",
                fontWeight: 400,
                textTransform: 'none',
                borderRadius: '7px'
            }}
            >

                <Typo1>Save</Typo1>
            </Button>
            <Button variant="outlined"
                style={{
                    color: "#008E97",
                    fontSize: "16px",
                    border: '1px solid ##008E97',
                    fontWeight: 400,
                    textTransform: 'none',
                    borderRadius: '7px'
                }} >

                Save and Submit
            </Button>
            <Button variant="text"
                style={{
                    color: "#008E97",
                    fontSize: "16px",
                    fontWeight: 400,
                    textTransform: 'none',
                    borderRadius: '7px'
                }} >

                Back to Assessment
            </Button>
        </Stack>

    )
}

export default Footerbuttons;