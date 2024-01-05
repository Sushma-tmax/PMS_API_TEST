import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useNormalizerContext } from '../../../../context/normalizerContext';
import { useReviewerContext } from '../../../../context/reviewerContextContext';
import { useAppraisalContext } from '../../../../context/appraiserOverviewContext';


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
const ItemHeading1 = styled("div")({
    // marginLeft: "20px",
    marginTop: '0px',
    color: "#717171",
    fontSize: "16px",
    fontFamily: "Arial"
});

const NormalizerComments = styled("div")({
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
    const { empData, normalizerOverallFeedComments, normalizerComments,disableTextAfterSubmission, setNormalizerComments, setReviewerComments, reviewerComments, setNormalizerOverallFeedComments, appraiserOverallFeedback, reviewerOverallFeedback, reviewerReason, setReviewerReason, normalizerReason, setNormalizerReason } = useNormalizerContext()

    //@ts-ignore
    //   const{moveTab,setMoveTab} = useAppraisalContext();
    console.log(moveTab, "moveTab")
    console.log(employeeData, 'employeeeeeData')
    console.log(reviewerComments, "reviewerComments")
    const handleCommentsChange = (e: any) => {
        console.log(e);
        // setNormalizerOverallFeedComments(e.target.value)
        setNormalizerComments(e.target.value)
        setMoveTab(false);
    }

    const [hidecomments, setHidcomments] = useState(false);
    useEffect(() => {
        if (reviewerComments == "" || reviewerComments == null || reviewerOverallFeedback == undefined) {
            setHidcomments(false)
        } else {
            setHidcomments(true)
        }
    }, [reviewerComments])

    // useEffect(() => {
    //     setNormalizerOverallFeedComments(comments)
    // }, [comments]);
    console.log(hidecomments, "feedbackcomments")

    // useEffect(() => {
    //     setComments(normalizerOverallFeedComments)
    // }, [normalizerOverallFeedComments])


    // console.log(change,"change")
    console.log(normalizerOverallFeedComments, "normalizerOverallFeedComments")
    console.log(normalizerComments, "normalizerComments")
    return (
        <>
        {appraiserOverallFeedback !== "" && appraiserOverallFeedback !== null &&
            <div
            // style={{ paddingTop: "80px" }}
            >
                <ItemHeading>
                    <b>Appraiser Message for Employee</b>
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
            }

            <div>
                {employeeData?.data?.reviewer?.reviewer_comments !== undefined &&
                employeeData?.data?.reviewer?.reviewer_comments !== "" &&
                employeeData?.data?.reviewer?.reviewer_PA_rejected !== true && (
                    <div>
                        <ItemHeading>
                            <b>Reviewer Comments</b>
                        </ItemHeading>
                        <Contain>
                            <Box>
                                <Tf2>
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
                                        value={reviewerComments}
                                    />
                                </Tf2>
                            </Box>
                        </Contain>
                    </div>
                )}
                <NormalizerComments>

                    {/* <b> Normalizer Overall Feedback </b> */}
                    <b>HR Normalizer Comments</b>
                    {/* <span style={{
      fontSize:"22px",}}>*</span> */}

                </NormalizerComments>
                <Contain>
                    <Tf>
                        <Box>
                            <TextField
                                size="small"
                                // disabled={disableTextAfterSubmission}
                                InputProps={{ readOnly: disableTextAfterSubmission }}
                                // fullWidth
                                placeholder='Add'
                                multiline
                                // inputProps={{ maxLength: 500 }}
                                // variant="standard"
                                // InputProps={{
                                //     disableUnderline: true,
                                // }}
                                // name="comments"
                                // value={normalizerOverallFeedComments}
                                value={normalizerComments}
                                onChange={e => {
                                    handleCommentsChange(e)
                                    setnavPrompt(true);
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