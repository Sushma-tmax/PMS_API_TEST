import React from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useReviewerContext } from '../../../context/reviewerContextContext';
import { Box, Grid, TextField} from '@mui/material';
import ReviewerFeedbackComments from './ReviewerFeedbackComments copy';

const Typo7 = styled("div")({
    marginLeft: "58px",
    marginTop: '20px',
    // position: "absolute",
    paddingBottom: '10px',
    color: "#717171",
    fontSize: "16px",
    //opacity: 0.85

    fontFamily:"arial"
});
const Typos1 = styled("div")({
    // marginLeft: "25px",
    // position: "absolute",
    //marginTop: '15px',
    fontSize: '14px',
    color: 'rgb(0 142 151/84%)',
    // float: 'left',
    paddingBottom:"15px"
    // opacity: '0.7'
});
const Typos2 = styled("div")({
    // marginLeft: "250px",
    // position: "absolute",
    // marginTop: '325px',
    fontSize: '13px',
    color: '#333333',
    opacity: '0.7'
});
const Tf1 = styled("div")({
    marginLeft: "58px",
    marginTop: "5px",
    // backgroundColor: "rgb(255 255 255/70%)",
//    color:"white",
    // "& .MuiInputBase-input": {
    //   color: "#333333",
    //   fontSize: "13px",
    //   fontWeight: "400",
    //   textTransform: "none",
    //   opacity: 0.4,
    // },
    backgroundColor: "white",
      borderRadius: "5px",
      "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontWeight: "400",
        textTransform: "none",
        fontFamily:"arial",
        // padding:"4px",
        textAlign:"left"
        // padding: "-2px",
      },
    //   "& .MuiTextField-root": {
    //     // color: "#333333",
    //     // fontSize: "13px",
    //     // fontWeight: "400",
    //     // textTransform: "none",
    //     // padding: "8px",
    //     width: "100%",
    //   },
  });
  const Contain1 = styled("div")({
    marginRight: "58px",
    
    marginTop: "10px",
  
  });
  const Typo2 = styled("div")({
    marginLeft: "58px",
    marginTop: "20px",
    color: "#717171",
    fontSize: "16px",
    fontFamily:"arial"
    //opacity: 0.85,
  });
  const Labels = styled("div")({
    fontSize: "14px",
    color: "#333333",
    fontFamily:"arial",
    marginLeft: "5px",
  });
  const Contain = styled("div")({
    marginLeft: "55px",
    // marginRight: "20px",
    // marginTop: "10px",
    // width: "100%",
    // paddingTop: "0px",
  });
const AppraiserOtherRecommendations = (props:any) =>  {
     // @ts-ignore
    const { appraiserOtherRecommendation, setAppraiserOtherRecommendation,appraiserOverallFeedback,setAppraiserOverallFeedback,normalizerOverallFeedback,setNormalizerOverallFeedback,empData} = useReviewerContext()
    const { employeeData,setnavPrompt,navPrompt, moveTab,setMoveTab } = props;

    return (
        <div>
          <div>
            <Typo7>
                <b>Other Recommendations </b>
            </Typo7>
            <Contain>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {appraiserOtherRecommendation && appraiserOtherRecommendation.map((i:any,index:any)=> {
                    return (
                      <Grid display="flex" item xs={2} sm={4} md={3} key={index}>

                      <Labels>
                      <label>{i.name.name}</label>
                    </Labels>
                    </Grid>
                    )
                })}
                </Grid>
              </Contain>
           
            </div>
            <div >
            <Typo2><b>Appraiser Overall Feedback</b></Typo2>
                        <Contain1>
                        <Tf1>
                          <Box>
                            <TextField
                             inputProps={{ maxLength: 500 }}
                            size="small"
                            InputProps={{readOnly: true}}
                              fullWidth
                              multiline
                            //   rows={1}
                              value={appraiserOverallFeedback || ""} 
                            ></TextField>
                          </Box>
                        </Tf1>
                        </Contain1>
                        </div>
                        <ReviewerFeedbackComments employeeData = {employeeData} 
                        setnavPrompt={setnavPrompt}
                        moveTab = {moveTab}
                        setMoveTab = {setMoveTab} />
                        <div >
             {employeeData && employeeData?.data?.normalizer?.normalizer_status == "rejected" && ( 
              <>
             
            <Typo2><b>Normalizer Overall Feedback</b></Typo2>
            <Contain1>
                        <Tf1>
                          <Box>
                            <TextField
                             inputProps={{ maxLength: 500 }}
                            size="small"
                            InputProps={{readOnly: true}}
                              fullWidth
                              multiline
                            //   rows={1}
                              value={normalizerOverallFeedback || ""} 
                            ></TextField>
                          </Box>
                        </Tf1>
                        </Contain1>
                        </>
              )}  
             </div>

        </div>
    )
}

export default AppraiserOtherRecommendations;