import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import { Box } from '@mui/system';
import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';
import { useReviewerContext } from '../../../context/reviewerContextContext';
const Contain = styled("div")({
    marginRight: "60px",
    marginLeft: "60px",
    marginTop: "10px",

});
const TrainingRecommendations = styled("div")({
    marginTop: "20px",
    marginLeft : "60px",
  color: "#717171",
  fontFamily:"arial",
  fontSize: "16px",
});

const Tf = styled('div')({
    borderRadius: "5px",
    backgroundColor: "white",
  
    "& .MuiInputBase-input": {
      // color: "rgb(62 140 181 / 28%)",
      fontSize: "14px",
      fontWeight: "400",
      textTransform: "none",
      fontFamily: "Arial",
      color: "#333333",
      // padding: "4px",
      textAlign:"left"
    },
    "& .MuiTextField-root": {
        width:"100%"
    },
});
const Tf1 = styled("div")({
    // marginLeft: "58px",
    // paddingTop :"25px",
    // marginTop: "85px",
    backgroundColor: "#f8f8f8",
    // backgroundColor: "rgb(255 255 255/70%)",
    borderRadius: "5px",
    // width :"95%",
  
    "& . MuiTextField-root": {
      //     width:"100%"
        },
        "& .MuiTextField-root": {
          color: "#333333",
      //     fontSize: "10px",
          fontWeight: "400",
          textTransform: "none",
          // opacity: 0.4,
      //     padding: "8px",
          width:"100%",
      fontFamily:"arial",
        },
        "& .MuiInputBase-input": {
          color: "#333333",
          fontSize: "14px",
      fontFamily:"arial",
          textTransform: "none",
      // padding: "4px",
      textAlign:"left"
        },
      
  
  });
  const Contain1 = styled("div")({
    marginLeft: "60px",
     marginRight: "60px",
    // marginTop: '10px',
    // width: '98.5%',
    paddingTop: '10px'
  
  });
  const Recommendation = styled("div")({
    // marginTop: '30px',
    marginLeft: "60px",
    paddingTop: "20px",
    fontFamily:"arial",
    color: '#717171',
    fontSize: '16px',
  
  });
  const Recommendationss = styled("div")({
    marginLeft: "60px",
    paddingTop: "20px",
    fontFamily:"arial",
    color: '#717171',
    fontSize: '16px',
  
  });

const NFeedbackComments = (props: any) => {

    // @ts-ignore
    const { normalizerOverallFeedComments, setNormalizerOverallFeedComments,appraiserOverallFeedback,setAppraiserOverallFeedback } = useAppraiserRejectsNormalizerContext();
    const [ comments, setComments ] = useState('');
    const { training1Data,setnavPrompt,navPrompt ,moveTab,setMoveTab } = props;
     //@ts-ignore
     const { reviewerOverallFeedComments, setReviewerOverallFeedComments } = useReviewerContext()
console.log(moveTab,"neeeee")
console.log(reviewerOverallFeedComments,"ggggggggggg")
    useEffect(() => {
        //@ts-ignore
        // console.log(checkboxIdHandler(checkboxHandler(users)))
        setComments(normalizerOverallFeedComments)
      }, [normalizerOverallFeedComments]);
      console.log(normalizerOverallFeedComments,'Normalizer Feedback Comments dis');
      const handleCommentsChange = (e: any) => {
        console.log(e);
        setNormalizerOverallFeedComments(e.target.value)
    }   
    const [otherComments1, setOtherComments1] = useState("");
    console.log(appraiserOverallFeedback,"feedback")
    useEffect(()=>{
      setOtherComments1(appraiserOverallFeedback)
    },[])
    const handleappraiserReCommentsChange = (e: any) => {
    //   setnavPrompt(true)
      console.log(e);
      setOtherComments1(e.target.value)
      setAppraiserOverallFeedback(e.target.value)
  }
  const [comments1, setComments1] = useState();
  const handleCommentsChange1 = (e: any) => {
    console.log(e);
    setComments1(e.target.value)
}
console.log(navPrompt,"navPrompt")
    return (
        <div>
            <Recommendation><b>Appraiser Overall Feedback</b> <span style={{fontSize:"22px"}}>*</span>
             </Recommendation>
          <Contain1>
            <Box>
              <Tf1>

                <TextField
                  inputProps={{maxLength: 500}}
                  placeholder="Add"
                  multiline
                  size='small'
                  // variant="standard"
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                  value={otherComments1 || ""}
                  onChange={e => {handleappraiserReCommentsChange(e)
                    setMoveTab(true);
                    setnavPrompt(true)
                  }}
                />
               
              </Tf1>
            </Box>
          </Contain1>
          <Recommendationss><b>Reviewer Overall Feedback</b> <span style={{fontSize:"22px"}}>*</span>
          </Recommendationss>
          <Contain1>
            <Box>
              <Tf>

                <TextField
                  inputProps={{maxLength: 500}}
                  // placeholder="Add"
                  multiline
                  size='small'
                  InputProps={{            readOnly: true,          }}
                  // variant="standard"
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                  value={reviewerOverallFeedComments}
                  onChange={e => {handleCommentsChange1(e)
                    // setMoveTab(true);
                  }}
                />
               
              </Tf>
            </Box>
          </Contain1>
            <TrainingRecommendations>
                <b>Normalizer Overall Feedback</b> <span style={{fontSize:"22px"}}>*</span>
            </TrainingRecommendations>
            <Contain>
                <Box>
                    <Tf>
                        <TextField 
                         inputProps={{maxLength: 500}}
                        // fullWidth
                        InputProps={{            readOnly: true,          }}
                            multiline
                            // InputProps={{
                            //     disableUnderline: true,
                            //   }}
                            // variant="standard"
                            size='small'
                            name="comments"
                            value={comments || ""}
                            />
                    </Tf>
                </Box>
            </Contain>
        </div>
    );
}

export default NFeedbackComments

