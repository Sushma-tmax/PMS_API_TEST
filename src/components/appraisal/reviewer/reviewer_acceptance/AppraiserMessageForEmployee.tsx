import React from 'react'
import { styled } from "@mui/material/styles";
import { Box, Grid, TextField } from "@mui/material";
import { useReviewerContext } from '../../../../context/reviewerContextContext';


const Typo2 = styled("div")({
    // marginLeft: "25px",
    marginTop: "20px",
    color: "#717171",
    fontSize: "16px",
    fontFamily: "arial",
});

const Tf1 = styled("div")({
    // marginLeft: "25px",
    marginTop: "10px",
    // marginRight: "20px",
    backgroundColor: "white",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily: "arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
        textAlign: "left",
    },
});

const AppraiserMessageForEmployee = (props: any) => {
    // @ts-ignore
    const { appraiserOverallFeedback } = useReviewerContext()

    return (
        <>
            <Typo2>
                <b>Appraiser Message for Employee</b>
            </Typo2>
            <Tf1>
                <Box>

                    <TextField
                        inputProps={{ maxLength: 500 }}
                        size="small"
                        InputProps={{ readOnly: true }}
                        fullWidth
                        multiline
                        // rows={1}
                        value={appraiserOverallFeedback || ""}
                    ></TextField>
                </Box>
            </Tf1>
        </>
    )
}

export default AppraiserMessageForEmployee