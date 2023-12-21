import * as React from "react";
// import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Container, Grid, Paper, Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Stackinfo = (props:any) => {
    const {appraisal1Data} = props
    console.log(appraisal1Data,'hi')
    return (
        <div>
            <Stack direction="row" spacing={5}>
                <Item>
                    <Box width="300px" height="50px">
                        <Avatar>H</Avatar>
                        <Typography
                            color="#0c547b"
                            position="absolute"
                            top="25px"
                            left="80px"
                        >
                            {appraisal1Data && appraisal1Data.data.name}
                        </Typography>
                        <Typography
                            color="#0c547b"
                            position="absolute"
                            top="28px"
                            left="235px"
                            variant="caption"
                        >
                            {appraisal1Data && appraisal1Data.data.grade}
                        </Typography>
                        <Typography
                            position="absolute"
                            top="50px"
                            left="80px"
                            variant="caption"
                            color="#a9a9a9"
                        >
                           {appraisal1Data && appraisal1Data.data.position}
                        </Typography>
                    </Box>
                </Item>
                <Item width="300px">
                    <Typography
                        position="absolute"
                        top="30px"
                        left="380px"
                        variant="caption"
                        color="#a9a9a9"
                    >
                        {appraisal1Data && appraisal1Data.data.employeeCode}
                    </Typography>
                    <Typography
                        position="absolute"
                        top="50px"
                        left="380px"
                        variant="caption"
                        color="#0c547b"
                    >
                        Appraisal period :29/07/21-Appraisal Period 1 Year
                    </Typography>
                </Item>
                <Item width="200px">
                    <Typography
                        position="absolute"
                        top="30px"
                        left="690px"
                        variant="caption"
                        color="#a9a9a9"
                    >
                       Previous rating :4.0
                    </Typography>
                    <Typography
                        sx={{
                            position: "absolute",
                            top: "50px",
                            left: "690px",
                            variant: "caption",
                            color:"#93dcfa",
                            textDecoration: 'underline'
                        }}
                    >
                        Line Manager Details
                    </Typography>
                </Item>
                <Item width="200px">
                    <Typography
                        position="absolute"
                        top="30px"
                        left="690px"
                        variant="caption"
                        color="#a9a9a9"
                    >
                        Potential
                    </Typography>
                    <Typography
                        sx={{
                            position: "absolute",
                            top: "50px",
                            left: "690px",
                            variant: "caption",
                            color:"#93dcfa",
                            textDecoration: 'underline'
                        }}
                    >
                           <TextField select id="standard-basic" label="Select" variant="standard"
                           />
                    </Typography>
                </Item>
            </Stack>
        </div>
    );
}

export default Stackinfo

// sx={{
//     position:"absolute",
//     top:"50px",
//     left:"690px",
//     variant:"caption",
//     color:"#0c547b",
//     textDecoration:'underline'
// }}