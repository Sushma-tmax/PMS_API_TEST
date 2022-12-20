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
    marginTop: '10px',
    color: "#717171",
    fontSize: '16px',
    fontFamily:"arial"
});

const Tf = styled('div')({
    marginLeft: "58px",
    marginTop: "5px",
    borderRadius: "5px",
    width: "93%",
    backgroundColor: "#f8f8f8",
    "& .MuiInputBase-input": {
        // color: "rgb(62 140 181 / 28%)",
        fontSize: "14px",
        fontWeight: "400",
        textTransform: "none",
        fontFamily: "Arial",
        color: "#333333",
        padding: "8px",
        // height: "110px !important",
      },
});


const NTrainingComments = (props: any) => {
    const { setnavPrompt, navPrompt } = props;
    // @ts-ignore
    const { normalizerTrainingRecommendationComments, setNormalizerTrainingRecommendationComments, } = useNormalizerContext();
    const [comments, setComments] = useState('');



    const handleCommentsChange = (e: any) => {
        setnavPrompt(true)
        console.log(e);
        setComments(e.target.value)
    }

    useEffect(() => {
        //@ts-ignore
        // console.log(checkboxIdHandler(checkboxHandler(users)))
        setNormalizerTrainingRecommendationComments(comments)
    }, [comments]);

    return (
        <div>
            {/* <TrainingRecommendations>
                <b>   Training Recommendations Justification (Normalizer)</b>
            </TrainingRecommendations>
            <Contain>
                <Box>
                    <Tf>
                        <TextField 
                        // fullWidth
                        placeholder="Add"
                            multiline
                            inputProps={{ maxLength: 256 }}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            size='small'
                            name="comments"
                            value={normalizerTrainingRecommendationComments || ""}
                            onChange={e => handleCommentsChange(e)} />
                    </Tf>
                </Box>
            </Contain> */}
        </div>
    );
}

export default NTrainingComments

