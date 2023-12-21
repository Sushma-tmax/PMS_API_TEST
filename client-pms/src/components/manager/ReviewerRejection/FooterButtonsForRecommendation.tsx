import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAppraiserRejectsReviewerContext } from "../../../context/AppraiserRejectsReviewer";
import { Link, useNavigate } from "react-router-dom";
import { useAppraiserAcceptReviewerMutation } from "../../../service/employee/appraisal/appraisal";
import { AlertAcceptDialog } from "../..";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import AlertDialogSuccess from "../../UI/DialogSuccess";
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

const FooterButtonsForRecommendation = (props: any) => {
  //@ts-ignore
  const { updateMutation, otherRecommendation, appraiserFeedbackComments, appraiserAreaOfImprovementComments, appraiserOtherRecommendationComments, appraiserTrainingRecommendationComments, checkboxIdHandler, checkboxHandler, employee_id, trainingRecommendationFormValues, overallFeed, areaImprovement, isLoading, empData, openSnackbar, acceptButton, setacceptButton, rejectButton, setrejectButton, appraiserOverallFeedback,potentialValue, setPotentialValue } = useAppraiserRejectsReviewerContext()

  const { navPrompt, setnavPrompt, setValue, moveTab, setMoveTab } = props;
  const [appraiserAcceptReviewer] = useAppraiserAcceptReviewerMutation();
  const [open, setOpen] = useState(false);
  const [openOk, setOpenOk] = useState(false);
  const [message, setMessage] = useState("")
  const navigate = useNavigate();

  const backHandler = () => {
    if (moveTab == true) {
      setOpenOk(true);
      setMessage("Please save the changes before leaving the page.")
    } else {
      setValue(0)
    }   
  }
console.log(appraiserOverallFeedback,"appraiserOverallFeedback")
  const handleAlertCloseOk = () => {
    setOpenOk(false);
    setMessage("");   
  }

  const handleClickClose = () => {
    setOpen(false);
    setMessage("");
  };

  const handleClickOpen = () => {
    setOpen(true);
    // setNewId(id);
    // setNewName(nameAlert);
  };
  const handleClickIdClose = () => {
    // setnavPrompt(false)
    appraiserAcceptReviewer(employee_id)
    setOpen(false);
    // navigate("/dashboardreview");

  };

  const updateRejectionCount = (count: any) => {
    if (count === 0 || count === undefined) {
      return 1;
    } else if (count === 1) {
      return 2;
    } else if (count === 2) {
      return 3;
    }
  }

  // if (isLoading) {
  //   <p>Loading...</p>
  // }
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  const [message1, setMessage1] = useState("");

  const [navsaveandsubmitTrigger, setnavsaveandsubmitTrigger] = useState(false);
  useEffect(() => {
    if (navPrompt === false && navTrigger === true) {
      console.log('nav')
      handleClickIdClose()
    }
  }, [navTrigger]);
  useEffect(() => {
    if (navPrompt === false && navsaveandsubmitTrigger === true) {
      console.log('nav')
      //   updateMutation({
      //     "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
      //     "appraisal.other_recommendation": checkboxIdHandler(
      //         checkboxHandler(otherRecommendation)
      //     ),
      //     "appraisal.training_recommendation":
      //         trainingRecommendationFormValues,
      //     "appraisal.feedback_questions": overallFeed,
      //     "appraisal.area_o   f_improvement": areaImprovement,
      //     "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
      //     "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
      //     "appraisal.feedback_questions_comments": appraiserFeedbackComments,
      //     "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
      //     "reviewerIsChecked": false,
      //     "reviewerIsDisabled": false,
      //     "reviewer.reviewer_status": 'appraiser-rejected',
      //     "appraiserIsDisabled": false,handleSave
      //     "appraisal.appraiser_status": "appraiser-rejected",
      //     id: employee_id,
      // })
      // navigate(`/dashboardreview`)
      // setMessage1("The recommendations are saved successfully.")
      setAllFeedMandatory(true);
      setnavsaveandsubmitTrigger(true);

    }
  }, [navsaveandsubmitTrigger]);
  const handleSave = () => {
   
    // navigate(`/dashboardreview`)
    // areaImprovement

     if (overallFeed[0]?.value === "" || overallFeed[1]?.value === "" || overallFeed[2]?.value === "") {
      setMessage1("Please add Feedback Questionnaire on the Recommendation page.");
      setAllFeedMandatory(true);
    }
    else if(appraiserOverallFeedback == null || appraiserOverallFeedback == undefined || appraiserOverallFeedback == ""){
      setMessage1("Please add the rejection reasons in the Overall Feedback")
      setAllFeedMandatory(true);
      setnavsaveandsubmitTrigger(true);
    }
    
    else if (areaImprovement[0].value == "" || areaImprovement[0]?.specific_actions[0]?.value == "" ){
      setMessage1("Please add Area of Improvement on the Recommendation page.")
      setAllFeedMandatory(true);
    }
    // else if ((checkboxIdHandler(checkboxHandler(otherRecommendation))).length === 0){
    //   setMessage1("Please add Other Recommendation on the Recommendation page.")
     
    //   setAllFeedMandatory(true);
    // }
    else if ((trainingRecommendationFormValues.filter((i:any) => {
      return (i.name == "" || i.training_name == "" || i.justification == "")
    }).length > 0)){
      setMessage1("Please add Training Recommendation on the Recommendation page.")
      setAllFeedMandatory(true);
    }
    else{
      updateMutation({
        // "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.training_recommendation":
          trainingRecommendationFormValues,
        "appraisal.feedback_questions": overallFeed,
        "appraisal.area_of_improvement": areaImprovement,
        // "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
        // "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
        // "appraisal.feedback_questions_comments": appraiserFeedbackComments,
        // "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
        "appraisal.appraiser_overall_feedback": appraiserOverallFeedback,
        // "reviewerIsChecked": false,
        // "reviewerIsDisabled": false,
        // "reviewer.reviewer_status": 'appraiser-rejected',
        // "appraiserIsDisabled": false,
        // "appraisal.appraiser_status": "appraiser-rejected",
        // "appraisal.potential":potentialValue,
        id: employee_id,
      })
    setMessage1("Changes have been saved.")
    setAllFeedMandatory(true);
    setMoveTab(false);
    }
  };
  //nav prompt
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
  };
  console.log(appraiserTrainingRecommendationComments,"appraiserTrainingRecommendationComments")
console.log(overallFeed[0]?.value,"overallFeed")
console.log(trainingRecommendationFormValues,"trainingRecommendationFormValues")
console.log(areaImprovement,"areaImprovement")
  return (
    // <Footer>
    <Stack justifyContent="center" spacing={2} direction="row">
      <>
        {/*<Link to={`/dashboardreview`}>*/}
        {/* <>
                    <Button
                        variant="outlined"
                        disabled={acceptButton}
                        style={{
                            fontSize: "15px",
                            textTransform: "none",
                            color:"#3e8cb5",
                            fontFamily:"Arial",
                            background:"transparent",
                            borderColor:"#3e8cb5"
                        }}
                        onClick={handleClickOpen}
                       
                    >
                        <Typo1>Accept</Typo1>
                    </Button>
                </> */}


        {/*</Link>*/}
        {/* <Link to={`/dashboardreview`}>
                    <Button
                        variant="contained"
                        disabled={openSnackbar}
                        style={{
                            backgroundColor: "#008E97",
                            fontSize: "16px",
                            fontWeight: 400,
                            textTransform: "none",
                            borderRadius: "7px",
                        }}
                        onClick={() => {
                            updateMutation({
                                obj: empData.data.appraisal.objective_description,
                                "appraisal.other_recommendation": checkboxIdHandler(
                                    checkboxHandler(otherRecommendation)
                                ),
                                "appraisal.training_recommendation":
                                    trainingRecommendationFormValues,
                                "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
                                "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
                                "appraisal.feedback_questions_comments": appraiserFeedbackComments,
                                "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
                                "appraisal.feedback_questions": overallFeed,
                                "appraisal.area_of_improvement": areaImprovement,
                                id: employee_id,
                            })
                            navigate(`/dashboardreview`)
                        }}
                    >
                        <Typo1>Save</Typo1>
                    </Button>
                </Link> */}



        {/*<Link to={`/dashboardreview`}>*/}
        <Button
          variant="outlined"
          //disabled={openSnackbar || rejectButton}
          // style={{
          //     fontSize: "15px",
          //     textTransform: "none",
          //     color:"#3e8cb5",
          //     fontFamily:"Arial",
          //     background:"transparent",
          //     borderColor:"#3e8cb5"
          // }}
          style={{
            backgroundColor: "Transparent",
            fontSize: "15px",
            fontWeight: 400,
            textTransform: "none",
            color: "#3e8cb5",
            borderColor: "#3E8CB5",
            height:"35px",
            fontFamily:"arial"
          }}
          onClick={() => {

            // updateMutation({
            //     "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
            //     "appraisal.other_recommendation": checkboxIdHandler(
            //         checkboxHandler(otherRecommendation)
            //     ),
            //     "appraisal.training_recommendation":
            //         trainingRecommendationFormValues,
            //     "appraisal.feedback_questions": overallFeed,
            //     "appraisal.area_o   f_improvement": areaImprovement,
            //     "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
            //     "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
            //     "appraisal.feedback_questions_comments": appraiserFeedbackComments,
            //     "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
            //     "reviewerIsChecked": false,
            //     "reviewerIsDisabled": false,
            //     "reviewer.reviewer_status": 'appraiser-rejected',
            //     "appraiserIsDisabled": false,
            //     "appraisal.appraiser_status": "appraiser-rejected",
            //     id: employee_id,
            // })
            // navigate(`/dashboardreview`)
            setnavPrompt(false)
            handleSave();
            //setnavsaveandsubmitTrigger(true);
          }}
        >
          Save as Draft
        </Button>
        {/*</Link>*/}


        {/* <Link to={`/dashboardreview`}> */}
        <Button
          variant="outlined"
          // style={{
          //     fontSize: "15px",
          //     textTransform: "none",
          //     color:"#3e8cb5",
          //     fontFamily:"Arial",
          //     background:"transparent",
          //     borderColor:"#3e8cb5"
          // }}
          style={{
            backgroundColor: "Transparent",
            fontSize: "15px",
            fontWeight: 400,
            textTransform: "none",
            color: "#3e8cb5",
            borderColor: "#3E8CB5",
            height:"35px",
            fontFamily:"arial"
          }}
          onClick={() => { backHandler() }}
        >

          Back


        </Button>
        {/* </Link> */}

        <AlertDialogSuccess
        isAlertOpen = {openOk}
        handleAlertClose = {handleAlertCloseOk}
        >
          {message}
        </AlertDialogSuccess>


        <AlertAcceptDialog
          isAlertOpen={open}
          handleAlertClose={handleClickClose}
          handleAlertIdClose={() => {
            setnavPrompt(false);
            setnavTrigger(true);
          }}
        >
         Are you sure you would like to accept the Performance Appraisal?
        </AlertAcceptDialog>
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
              {/* Changes have been saved. */}
              {message1}
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
                marginRight: "10px",
                width: "70px",
                height: "35px",
                background: "transparent",
              }}
              variant="outlined"
              autoFocus
              onClick={handleAllFeedMandatory}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Stack>
    // </Footer>

  );
}

export default FooterButtonsForRecommendation;
