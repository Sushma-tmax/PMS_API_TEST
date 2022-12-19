import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import Blueadd from './Reviewericons/Blueadd.svg';
import Blueminus from './Reviewericons/Blueminus.svg';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { useReviewerContext } from "../../context/reviewerContextContext";
import { useNormalizerContext } from '../../context/normalizerContext';


const Contain = styled("div")({
    marginRight: "20px",
    marginTop: "10px",

});
const TrainingRecommendations = styled("div")({
    marginLeft: "58px",
    // marginTop: '10px',
    color: "#717171",
    fontSize: '16px',
    fontFamily:"arial"
});

const Tf = styled('div')({
    marginLeft: "58px",
    marginTop: "5px",
    fontSize: '13x',
    width: "93%",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "14px",
      fontFamily: "arial",
    //   width:"93%",
      fontWeight: "400",
      textTransform: "none",
      padding: "4px",
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


const NFeedbackComments = (props: any) => {

    // @ts-ignore
    const { normalizerOverallFeedComments, setNormalizerOverallFeedComments,moveTab,setMoveTab } = useNormalizerContext();
    const [comments, setComments] = useState('');
    const { employeeData, setnavPrompt } = props
    // console.log(moveTab,"moveTab")
    const handleCommentsChange = (e: any) => {
        console.log(e);
        setComments(e.target.value)
        setnavPrompt(true)
    }

    useEffect(() => {
        //@ts-ignore
        // console.log(checkboxIdHandler(checkboxHandler(users)))
        setNormalizerOverallFeedComments(comments)
    }, [comments]);

    return (
        <div>
            {/* <TrainingRecommendations>
               <b>Normalizer Overall  Feedback</b>
            </TrainingRecommendations>
            <Contain>
                <Tf>
                    <Box>
                        <TextField
                        placeholder="Add"
                        size ="small"
                        //  fullWidth
                            multiline
                            inputProps={{ maxLength: 500 }}
                            // variant="standard"
                            autoComplete="off"
                    //   InputProps={{
                    //     disableUnderline: true,
                    //   }}
                            name="comments"
                            value={ normalizerOverallFeedComments|| ""}
                            onChange={e => {handleCommentsChange(e)
                                setnavPrompt(true);
                                setMoveTab(true);
                            }} />
                    </Box>
                </Tf>
            </Contain> */}

        </div>
    );
}

export default NFeedbackComments

