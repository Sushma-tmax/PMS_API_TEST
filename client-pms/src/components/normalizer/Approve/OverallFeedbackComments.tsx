import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useNormalizerContext } from '../../../context/normalizerContext';
import { useReviewerContext } from '../../../context/reviewerContextContext';
import { useAppraisalContext } from '../../../context/appraiserOverviewContext';


const Contain = styled("div")({
    // marginRight: "20px",
    marginTop: "10px",

});
const ItemHeading = styled("div")({
    // marginLeft: "20px",
    marginTop: '20px',
    color: "#717171",
    fontSize: "16px",
    fontFamily: "Arial"
});
const TrainingRecommendations = styled("div")({
    // marginLeft: "25px",
    marginTop: '20px',
    color: "#717171",
    fontSize: '16px',
    fontFamily: "arial"
});

const Tf = styled('div')({
    // marginLeft: "25px",
    backgroundColor: "#f8f8f8",
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
    "& .MuiTextField-root": {
        // color: "#333333",
        // fontSize: "13px",
        // fontWeight: "400",
        // textTransform: "none",
        // padding: "8px",
        width: "100%",
    },
});
const Tf1 = styled('div')({
    // marginLeft: "25px",
    backgroundColor: "white",
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
    "& .MuiTextField-root": {
        // color: "#333333",
        // fontSize: "13px",
        // fontWeight: "400",
        // textTransform: "none",
        // padding: "8px",
        width: "100%",
    },
});
const Tf2 = styled("div")({
    // width: "93%",
    // marginTop: "5px",
    // backgroundColor: 'rgb(255 255 255/70%)',

    '& .MuiInputBase-input': {
        color: '#333333',
        fontSize: '14px',
        fontFamily: "arial",
        fontWeight: '400',
        // padding: "4px",
        textTransform: 'none',
        textAlign: "left",

    },
    "& .MuiTextField-root": {
        // color: "#333333",
        // fontSize: "13px",
        // fontWeight: "400",
        // textTransform: "none",
        // padding: "8px",
        width: "100%",
    },

});


const NFeedbackCommentsN = (props: any) => {
    const { other1Data, employeeData, navPrompt, setnavPrompt, moveTab, setMoveTab, change, setChange } = props
    // @ts-ignore
    const { empData, normalizerOverallFeedComments, setNormalizerOverallFeedComments, appraiserOverallFeedback, reviewerOverallFeedback } = useNormalizerContext()

    //@ts-ignore
    //   const{moveTab,setMoveTab} = useAppraisalContext();
    console.log(moveTab, "moveTab")
    console.log(employeeData, 'employeeeeeData')
  
    const handleCommentsChange = (e: any) => {
        console.log(e);
        setNormalizerOverallFeedComments(e.target.value)
        setMoveTab(false);
    }

    // useEffect(() => {
    //     setNormalizerOverallFeedComments(comments)
    // }, [comments]);
    // console.log(reviewerOverallFeedback, "feedbackcomments")

    // useEffect(() => {
    //     setComments(normalizerOverallFeedComments)
    // }, [normalizerOverallFeedComments])


    // console.log(change,"change")
    console.log(normalizerOverallFeedComments, "normalizerOverallFeedComments")
    return (
        <>
            <div
            // style={{ paddingTop: "80px" }}
            >
                <ItemHeading>
                    <b>Appraiser Overall Feedback</b>
                </ItemHeading>
                <Contain>
                    {/* <Box> */}
                    <Tf2>

                        <TextField
                            multiline
                            InputProps={{ readOnly: true }}
                            inputProps={{ maxLength: 500 }}
                            size='small'
                            //   variant="standard"
                            //   InputProps={{
                            //     disableUnderline: true,
                            //   }}
                            // placeholder='Add'
                            value={appraiserOverallFeedback}></TextField>

                    </Tf2>
                    {/* </Box> */}
                </Contain>
            </div>
            <div>
                <ItemHeading>
                    <b>Reviewer Overall Feedback</b>
                </ItemHeading>
                <Contain>
                    <Box>
                        <Tf1>
                            <TextField
                                // fullWidth
                                InputProps={{ readOnly: true }}
                                multiline
                                inputProps={{ maxLength: 500 }}
                                // variant="standard"
                                // InputProps={{
                                //     disableUnderline: true,
                                // }}
                                // placeholder='Add'
                                size='small'
                                name="comments"
                                value={reviewerOverallFeedback}
                            />
                        </Tf1>
                    </Box>
                </Contain>
                <TrainingRecommendations>

                    <b> Normalizer Overall Feedback </b>

                </TrainingRecommendations>
                <Contain>
                    <Tf>
                        <Box>
                            <TextField
                                size="small"
                                // fullWidth
                                placeholder='Add'
                                multiline
                                inputProps={{ maxLength: 500 }}
                                // variant="standard"
                                // InputProps={{
                                //     disableUnderline: true,
                                // }}
                                // name="comments"
                                value={normalizerOverallFeedComments}
                                onChange={e => {
                                    handleCommentsChange(e)
                                    // setnavPrompt(true);
                                    setMoveTab(true);
                                    // setChange(true);
                                }} />
                        </Box>
                    </Tf>
                </Contain>

            </div>
        </>
    )
}
export default NFeedbackCommentsN