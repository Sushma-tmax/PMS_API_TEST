import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useReviewerContext } from '../../../../context/reviewerContextContext';


const Contain = styled("div")({
    // marginRight: "20px",
    // marginLeft: "25px",
    marginTop: "10px",

});
const Typos1 = styled("div")({

    fontSize: '13px',
    color: '#333333',
    opacity: '0.7',
    marginLeft: "25px",
    marginTop: "10px",


});
const ItemHeading = styled("div")({
    // marginLeft: "25px",
    marginTop: '20px',
    color: "#717171",
    fontSize: "16px",
    fontFamily: "Arial"
});

const Tf = styled('div')({
    fontSize: '13x',

    // backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily: "arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
        textAlign: "justify"
    },
});

const NormalizerOverallFeedback = (props: any) => {
    const { other1Data, employeeData, moveTab, setMoveTab } = props
    // @ts-ignore
    const { setNormalizerOverallFeedback, normalizerOverallFeedback, empData } = useReviewerContext()
    console.log(empData, 'employeeeeeData')
    // const [comments, setComments] = useState();

    // const handleCommentsChange = (e: any) => {
    //     console.log(e);
    //     setComments(e.target.value)
    // }

    //    useEffect(() => {
    //     setReviewerOverallFeedComments(comments)
    // }, [comments]);



    return (
        <>

            {empData && (empData?.data?.normalizer?.reason_for_rejection !== ""
                && empData?.data?.normalizer?.reason_for_rejection !== undefined
                && empData?.data?.normalizer?.reason_for_rejection !== null
                && empData?.data?.normalizer.normalizer_PA_rejected !== true)
                && (<div>
                    <ItemHeading>
                        <b>HR Normalizer Comments</b>
                    </ItemHeading>
                    <Contain>
                        <Box>
                            <Tf>
                                <TextField fullWidth
                                    multiline
                                    InputProps={{ readOnly: true, }}
                                    inputProps={{ maxLength: 500 }}
                                    placeholder='Add'
                                    size='small'
                                    name="comments"
                                    value={empData?.data?.normalizer?.reason_for_rejection}
                                // onChange={(e) => {handleCommentsChange(e);
                                // setMoveTab(true);
                                //    }} 
                                />
                            </Tf>
                        </Box>
                    </Contain>


                </div>)
            }
        </>
    )
}
export default NormalizerOverallFeedback