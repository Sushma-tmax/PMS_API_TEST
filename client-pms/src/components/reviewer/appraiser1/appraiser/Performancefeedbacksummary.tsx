import React from 'react';
import { styled } from "@mui/material/styles";
import Divider from '@mui/material/Divider';
import { TextField, Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Blueadd from '../../Reviewericons/Blueadd.svg';
import Blueplus from '../../Reviewericons/Blueplus.svg';
import Stack from '@mui/material/Stack';



const PerformanceFeedbackSummary = styled("div")({
    marginLeft: "25px",
    paddingTop: '20px',
    color: '#008E97',
    fontSize: '18px',
});
const Overallfeedback = styled("div")({
    marginLeft: "25px",
    marginTop: '20px',
    color: '#333333',
    fontSize: '13px',
    opacity: 0.7
});
const Divide = styled('div')({
    marginTop: '18px',
    marginLeft: '25px',
    marginRight: '20px',
});
const Tf1 = styled("div")({
    width: "1255px",
    marginLeft: "25px",
    marginTop: "5px",
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    '& .MuiInputBase-input': {
        color: '#333333',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
        opacity: 0.4
    },

});
const Areasofimprovement = styled("div")({
    marginLeft: "25px",
    marginTop: '10px',
    color: '#333333',
    fontSize: '13px',
    opacity: 0.7
});
const Tf3 = styled("div")({
    width: "500px",
    marginLeft: "25px",
    marginTop: "5px",
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    '& .MuiInputBase-input': {
        color: '#333333',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
        opacity: 0.5
    },
    '& .MuiInputLabel-root': {
        color: '#333333',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
        opacity: 0.5
    },

});
const SpecificActions = styled("div")({
    marginTop: '10px',
    color: '#333333',
    fontSize: '13px',
    opacity: 0.7
});
const Tf4 = styled("div")({
    width: "585px",
    marginTop: "5px",
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    '& .MuiInputBase-input': {
        color: '#333333',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
        opacity: 0.5
    },
    '& .MuiInputLabel-root': {
        color: '#333333',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
        opacity: 0.5
    },

});

const Addmore = styled('div')({
    color: '#008E97',
    fontSize: '12px'
});
const Divide1 = styled('div')({
    marginLeft: '25px',
    marginRight: '20px',
    marginTop: "15px",

});

function Performancefeedbacksummary() {
    return (
        <div>
            <PerformanceFeedbackSummary>
                Performance Feedback Summary
            </PerformanceFeedbackSummary>
            <Overallfeedback>Feedback</Overallfeedback>
            <Tf1>
                <Box>
                    <TextField fullWidth multiline inputProps={{ maxLength: 500 }}
                    ></TextField>
                </Box>
            </Tf1>
            <Divide><Divider /></Divide>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Areasofimprovement>
                            Area(s) of Improvement (if any)
                        </Areasofimprovement>

                        <Tf3> <TextField fullWidth multiline inputProps={{ maxLength: 500 }}
                            label='Add area(s) of Improvement'></TextField></Tf3>
                    </Grid>
                    <Grid item xs={6}>
                        <SpecificActions>
                            Specific Actions(s)
                        </SpecificActions>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                        >
                            <Tf4>
                                <TextField fullWidth multiline inputProps={{ maxLength: 500 }}
                                    size="small" label='Add specific action(s)' ></TextField>
                            </Tf4>

                            <img src={Blueadd} alt='icon' />

                        </Stack>


                    </Grid>
                </Grid>
            </Box>
            <Stack
                direction="row"
                alignItems="center"
                width='100px'
                marginLeft='25px'
                marginTop='18px'
                spacing={1}
            >
                <img src={Blueplus} alt='icon' />
                <Addmore>Addmore</Addmore>
            </Stack>

            <Divide1><Divider /></Divide1>
        </div>
    )
}

export default Performancefeedbacksummary;