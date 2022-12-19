import React from 'react'
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useGetEmployeeAppraisalQuery } from '../../service';
import { useParams } from "react-router-dom";


const Typo2 = styled("div")({
    // marginLeft: "58px",
    marginTop: "20px",
    color: "#717171",
    fontFamily: "arial",
    fontSize: "16px",
    //opacity: 0.85,
});

const Tf1 = styled("div")({
    // marginLeft: "58px",
    marginTop: "5px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily: "arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
        textAlign: "left"
    },
});

const Contain = styled("div")({
    // marginRight: "58px",
    marginTop: "10px",

});

const FeedbackQuestionnaireAppraiser = () => {

    // States

    const { employee_id } = useParams()
    const [overallFeedback, setOverallFeedback] = useState<any>([]); 

    // Mutation
   
    const { data: employeeData } = useGetEmployeeAppraisalQuery(employee_id)

    //  useEffect to get feedback questionnaire of Appraiser
    useEffect(() => {
        if (employeeData) {
            setOverallFeedback(employeeData.data.appraisal.feedback_questions)
        }
    },[employeeData])
   
    return (
        <>
            <Grid item xs={12}>
                {overallFeedback &&
                    overallFeedback.map((j: any, mapIndex: any) => {
                      return (
                        <>
                <Typo2> <b>{j.name.name}</b> </Typo2>               
                <Contain>
                    <Box>
                        <Tf1>

                            <TextField
                                fullWidth
                                multiline
                                InputProps={{ readOnly: true }}
                                inputProps={{ maxLength: 500 }}                                
                                size='small'
                                key={j._id}
                                value={overallFeedback[mapIndex].value}
                                
                            />

                        </Tf1>
                    </Box>
                </Contain>
                </>
                      );
                    })}
            </Grid>
        </>
    )
}

export default FeedbackQuestionnaireAppraiser