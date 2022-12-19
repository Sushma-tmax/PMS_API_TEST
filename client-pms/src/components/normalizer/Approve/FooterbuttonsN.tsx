import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Avatar, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, Popover, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, Tabs, Tab, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAcceptNormalizerMutation } from "../../../service";
import Closeicon from "../../../assets/Images/Closeicon.svg"
import { useNormalizerContext } from "../../../context/normalizerContext";
import { useGetEmployeeAppraisalQuery } from "../../../service";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";

const Typo1 = styled("div")({
  // fontSize: '16px',
  // fontWeight: 400
  paddingRight: "5px",
});
const Footer = styled("div")({
  marginLeft: "450px",
  marginTop: "120px",
  paddingBottom: "45px",
  display: "flex",
  justifyContent: "center",
});


const FooterButtonsN = (props: any) => {
  const { setnavPrompt, navPrompt, value, setValue, handleChange,moveTab,setMoveTab } = props;
  const [acceptNormalizer] = useAcceptNormalizerMutation();
  const { employee_id } = useParams();
   // @ts-ignore
  // const{moveTab, setMoveTab } =useAppraisalContext();

  useGetEmployeeAppraisalQuery(employee_id);
  // @ts-ignore
  const { updateMutation,normalizerAreaImprovementComments, normalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerTrainingRecommendationComments,normalizerComments} = useNormalizerContext()
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);

  const [message, setmessage] = React.useState('');
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    // setMoveTab(false);
    setmessage('')
  };
  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    setMoveTab(false);
    setmessage('')
  };
  const submitButtonHandler = () => {

    updateMutation({
        
      // "normalizer.normalizer_status": 'Draft',
      //  "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
      // "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
      // "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,
      // "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
      "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,

      id: employee_id,
  })
  // if(normalizerOverallFeedComments == undefined || normalizerOverallFeedComments == null ||normalizerOverallFeedComments =="" ){
  //   setmessage('Please add the rejection reasons in the Overall Feedback.')
  // setAllFeedMandatory1(true)
  // }else{
  setmessage('Changes have been saved.')
  setAllFeedMandatory1(true)
  // setnavPrompt(false)
  // setMoveTab(false);
  // }
  }
  const moveTabHandler = () => {  
    if (moveTab === true) {
      setmessage("Please save the changes before leaving the page.");
      setAllFeedMandatory(true);
     
    } else if (moveTab === false) {
      setValue(0);
    }
  }
  console.log(moveTab,"dd")
  console.log(normalizerOverallFeedComments,"jjjjjjjjjj")

  
  return (
    <div>
      <Stack justifyContent="center" spacing={2} direction="row">

        <Button
          variant="outlined"
          style={{
            // fontSize: "16px",
            // border: "1px solid ##008E97",
            // fontWeight: 400,
            // textTransform: "none",
            // borderRadius: "7px",
            background: "transparent",
            borderColor: "#3e8cb5",
            fontSize: "15px",
            textTransform: "none",
            color:"#3e8cb5",
            height:'35px',
            // width:"70px",
            fontFamily:"arial"

          }}
          onClick={() => {
            submitButtonHandler();
          }}
        >
          Save as Draft
        </Button>
        <Dialog
                  // fullScreen={fullScreen}
                  open={allFeedMandatory}
                  onClose={handleAllFeedMandatory}
                  BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
                  PaperProps={{
                      style: {
                        // borderColor:'blue',
                        //border:'1px solid',
                        boxShadow: "none",
                        borderRadius: "6px",
                        //marginTop: "155px",
                        maxWidth: "0px",
                        minWidth: "26%",
                        margin:"0px",
                        padding:"30px",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // textAlign: "center",
                      },
                    }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  {/* <DialogTitle
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    id="alert-dialog-title"
                  >
                    <IconButton onClick={handleAllFeedMandatory}>
                      <img src={Closeicon} alt="icon" />
                    </IconButton>
                  </DialogTitle> */}
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      style={{
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily:"Arial",
                        // paddingBottom: "12px",
                        // paddingRight: "10px",
                        // paddingLeft: "10px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        wordBreak: "break-word",
                        // height: "100px",
                        alignItems: "center",
                        overflowY:"hidden",
                      }}
                    >

                      {message}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingBottom: "30px"
                    }}
                  >
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        // marginRight: "10px",
                        width: "70px",
                        height: "35px",
                        background: "transparent",
                        color:"#3e8cb5"
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={handleAllFeedMandatory}
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  // fullScreen={fullScreen}
                  open={allFeedMandatory1}
                  // onClose={handleAllFeedMandatory1}
                  BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
                  PaperProps={{
                    style: {
                      // borderColor:'blue',
                      //border:'1px solid',
                      boxShadow: "none",
                      borderRadius: "6px",
                      //marginTop: "155px",
                      maxWidth: "0px",
                      minWidth: "26%",
                      margin:"0px",
                      padding:"30px",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // textAlign: "center",
                    },
                  }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  {/* <DialogTitle
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    id="alert-dialog-title"
                  >
                    <IconButton onClick={handleAllFeedMandatory}>
                      <img src={Closeicon} alt="icon" />
                    </IconButton>
                  </DialogTitle> */}
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      style={{
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily: "Arial",
                        // paddingBottom: "12px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        wordBreak: "break-word",
                        // height: "100px",
                        // width: "300px",
                        alignItems: "center",
                      }}
                    >

                      {message}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingBottom: "30px"
                    }}
                  >
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        // marginRight: "10px",
                        width: "70px",
                        height: "35px",
                        background: "transparent",
                        color:"#3e8cb5"
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={handleAllFeedMandatory1}
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>

        <Button
          variant="outlined"
          style={{
            background: "transparent",
            borderColor: "#3e8cb5",
            fontSize: "15px",
            textTransform: "none",
            color:"#3e8cb5",
            height:'35px',
            width:"70px",
            fontFamily:"arial"
          }}
          onClick={() => {
            // saveRecommendationsHandler();
            // handleBackButton();
            // setValue(0);
            moveTabHandler()
          }}
        >
          Back
        </Button>
      </Stack>
    </div>
  )
}
export default FooterButtonsN