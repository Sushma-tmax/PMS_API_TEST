import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';


const Contain = styled("div")({
    marginRight: "20px",
    marginLeft: "75px",
    marginTop: "10px",

});
const TrainingRecommendations = styled("div")({
    marginLeft: "75px",
    marginTop: "10px",
    color: "#717171",
    fontSize: "16px",
});

const Tf = styled('div')({
    
    "& .MuiTextField-root": {
        // color: "rgb(51 51 51/50%)",
        fontSize: "14px",
        width:"96%",
        color: "white",
        textTransform: "none",
        fontFamily: "Arial",
        backgroundColor: "white",
        borderRadius: "5px",
      },
});


const NTrainingComments = (props: any) => {

    // @ts-ignore
    const { normalizerTrainingRecommendationComments, setNormalizerTrainingRecommendationComments, } = useAppraiserRejectsNormalizerContext();
    const [ comments, setComments ] = useState('');
    const {navPrompt, setnavPrompt} = props;
    useEffect(() => {
        //@ts-ignore
        // console.log(checkboxIdHandler(checkboxHandler(users)))
        setComments(normalizerTrainingRecommendationComments)
      }, [normalizerTrainingRecommendationComments]);
    
      const handleCommentsChange = (e: any) => {
        setnavPrompt(true)
        console.log(e);
        setNormalizerTrainingRecommendationComments(e.target.value)
    }   

    return (
        <div>
            {/* <TrainingRecommendations>
               <b>  Training Recommendations Comments (Normalizer)</b>
            </TrainingRecommendations>
            <Contain>
                <Box>
                    <Tf>
                        <TextField 
                        // fullWidth
                        disabled
                            multiline
                            size='small'
                            name="comments"
                            autoComplete="off"
                            InputProps={{
                                disableUnderline: true,
                              }}
                              variant="standard"
                            inputProps={{ maxLength: 256 }}
                            value={comments || ""}
                            onChange={e => handleCommentsChange(e)} />
                    </Tf>
                </Box>
            </Contain> */}
        </div>
    );
}

export default NTrainingComments

