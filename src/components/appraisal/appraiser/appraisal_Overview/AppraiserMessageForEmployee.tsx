import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";


const AppraiserMessageHeader = styled("div")({
    color: "#717171",
    fontSize: "16px",
    fontFamily: "arial",
    marginBottom:"10px"
});

const AppraiserMessageTextField = styled(TextField)({
    width: "100%",
    // marginLeft: "25px",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily: "arial",
        fontWeight: "400",
        textTransform: "none",
    },
});

const OverallFeedback = (props: any) => {
    //   @ts-ignore
    const { empData, appOverallFeed, setAppOverallFeed, setMoveTab , disableTextAfterSubmission , setDisableTextAfterSubmission } = useAppraisalContext();
    const { setnavPrompt,appraisalData } = props;
    
    useEffect(() => {
        if (empData) {
            setAppOverallFeed(empData?.data?.appraisal?.appraiser_overall_feedback);
        }
    }, [empData]);
    console.log(appraisalData,"appraisalData")

    return (
        <>          
        {appraisalData?.data?.isGradeException != true && (
            <div style={{ marginRight: "33px", marginBottom: "20px" }} >
            <AppraiserMessageHeader> <b>Appraiser Message for Employee</b> </AppraiserMessageHeader>

            <AppraiserMessageTextField
                size="small"
                multiline
                placeholder="Add"
                autoComplete="off"
                value={appOverallFeed}
                onChange={(e) => {
                    setAppOverallFeed(e.target.value);
                    setnavPrompt(true);
                    setMoveTab(true);
                }}
                InputProps={{ readOnly: disableTextAfterSubmission }}
            />
        </div>
        )}
        </>
    )
}

export default OverallFeedback