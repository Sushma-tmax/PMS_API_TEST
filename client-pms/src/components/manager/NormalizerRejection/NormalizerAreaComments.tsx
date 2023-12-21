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
    marginTop: '10px',
    color: "#717171",
    fontSize: '16px',
    // opacity: 0.85
});

const Tf = styled('div')({
    borderRadius: "5px",
  backgroundColor: "white",
  width :"93%",

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


const NAreaofImprovementComments = (props: any) => {

    // @ts-ignore
    const { normalizerAreaImprovementComments, setNormalizerAreaImprovementComments, } = useAppraiserRejectsNormalizerContext();
    const [comments, setComments] = useState('');

    useEffect(() => {
        //@ts-ignore
        // console.log(checkboxIdHandler(checkboxHandler(users)))
        setComments(normalizerAreaImprovementComments)
    }, [normalizerAreaImprovementComments]);

    const handleCommentsChange = (e: any) => {
        console.log(e);
        setNormalizerAreaImprovementComments(e.target.value)
    }

    return (
        <div>
            {/* <TrainingRecommendations>
               <b> Area of Improvement Comments (Normalizer)</b> 
            </TrainingRecommendations>
            <Contain>
                <Box>
                    <Tf>
                        <TextField
                        //  fullWidth
                            disabled
                            multiline
                            InputProps={{
                                disableUnderline: true,
                              }}
                            variant="standard"
                            size='small'
                            name="comments"
                            value={comments || ""}
                           />
                    </Tf>
                </Box>
            </Contain> */}
        </div>
    );
}

export default NAreaofImprovementComments

