import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { useNormalizerContext } from "../../../../context/normalizerContext";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import Closeicon from "../../assets/Images/Closeicon.svg"
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { NORMALIZER_REJECTS_PA } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Normalizer";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import AlertDialogOkCancelForUnsavedChanges from "../../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../../service/employee/employee";
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
//styles for snackbar
const useStyles = makeStyles((theme) => ({
  customAlert: {
    backgroundColor: '#3e8cb5',
    color: "white",
    height: '60px !important',
    alignItems: "center",
    fontSize: "1rem"
  },
  customSnackbar: {
    paddingBottom: '16px',
    paddingRight: '16px',
  },
}));
const Footerbuttons = (props: any) => {
  const classes = useStyles();
  const { setnavPrompt, navPrompt, setValue, moveTab, setMoveTab, fetchCancel, employeeData } = props;
  console.log(navPrompt, '25navPrompt')
  //@ts-ignore
  const { updateMutation, otherRecommendation, otherRecommendationComments, checkboxIdHandler, checkboxHandler, employee_id, setReviewedOverallFeedback, reviewedOverallFeedback, trainingRecommendationFormValues, overallFeed, areaImprovement, trainingRecommendationComments, isLoading, normalizerAreaImprovementComments, normalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerTrainingRecommendationComments, emailData, disableButtons, setDisableButtons } = useNormalizerContext()
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);
  const navigate = useNavigate();
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
  };
  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
    setisAlertOpen1(false);
    navigate(`/normalizer`, { state: { from: `${1}` } });
  };
  const saveHandler = () => {
setDisableButtons(true);
    // if(normalizerOverallFeedComments == undefined || normalizerOverallFeedComments == null || normalizerOverallFeedComments =="" ){
    //   setmessage('Please fill in all the mandatory fields (*).')
    // setAllFeedMandatory1(true)
    // }else{

    updateMutation({

      "normalizer.normalizer_status": 'draft',
      "appraisal.pa_status": "Pending with HR Normalizer",
      "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
      "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
      "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments?.trim(),
      "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
      id: employee_id,
    }).then((res :any) => {
      setMoveTab(false);
      setDisableButtons(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
      setnavPrompt(false)
    })
    // if (moveTab == true) {
    //   setmessage('Changes were successfully saved.');
    //   setAllFeedMandatory1(true);
    //   setMoveTab(false);
    // } else {
    //   setmessage('No changes were made to save.');
    //   setAllFeedMandatory1(true);
    //   setMoveTab(false);
    // }
    //setmessage('Changes were successfully saved.');
    //setAllFeedMandatory1(true);
   
    // setMoveTab(false);
    // }
  }
  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);

  // refetch
  const CancelButtonHandler = () => {
    if (navPrompt || moveTab) {
      setOpenCancelDialog(true);
    } else {
      setOpenCancelDialog(false);
      setValue(0);
    }
  }

  const rejectCancelButtonHandler = () => {
    setOpenCancelDialog(false);
  }
  const acceptCancelButtonHandler = () => {

    setMoveTab(false);
    setnavPrompt(false);
    setValue(0);
    setOpenCancelDialog(false);
    fetchCancel();
  }
  // if (isLoading) {
  //   <p>Loading...</p>
  // }
  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    setMoveTab(false);
    setmessage('')
  };
  const moveTabHandler = () => {
    setValue(0);
    // if (moveTab === true) {
    //   setmessage("Please save the changes before leaving the page.");
    //   setAllFeedMandatory(true);

    // } else if (moveTab === false) {
    //   setValue(0);
    // }
  }
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const [isAlertOpen1, setisAlertOpen1] = React.useState(false);

  const submitHandler = () => {
    setisAlertOpen1(true);
  };
  const handleAlertClose = () => {
    setisAlertOpen(false);
    setValue(1)
    // setRatingAppraiser('')
  };
  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setisAlertOpen(false);
    setisAlertOpen1(true);
    // setdisableSubmit(true);
    // setAllFeedMandatory(true);
    // setRatingAppraiser('')
  };
  const handleAlertYes1 = () => {
    setisAlertOpen1(false);
    let normalizerRating;
    if (employeeData?.data?.normalizer?.normalizer_rating == 0) {
      normalizerRating = employeeData?.data?.reviewer?.objective_description;
    } else {
      normalizerRating = employeeData?.data?.normalizer?.objective_description;
    }
    if (normalizerOverallFeedComments?.trim() == undefined || normalizerOverallFeedComments?.trim() == null || normalizerOverallFeedComments?.trim() == "") {
      setmessage('Please add rejection reason.')
      setAllFeedMandatory1(true);
    } else {
      let appraiser_objective_description = employeeData?.data?.appraisal?.objective_description?.map((item: any) => {
        return {
          ...item,
          rating_accepted: false,
          rating_rejected: false,
          rejection_reason: item.rating_resubmitted ? item.rejection_reason : ""
        }
      })
      updateMutation({
        normalizerIsChecked: true,
        normalizerIsDisabled: true,
        "normalizer.normalizer_status": "rejected",
        appraiserIsDisabled: false,
        "appraisal.appraiser_status": "normalizer-rejected",
        "appraisal.pa_status": "Pending with Appraiser (HR Normalizer Rejection)",
        "appraisal_previous_submission.pa_status": "Pending with Appraiser (HR Normalizer Rejection)",
        "appraisal.pa_rating": employeeData?.data?.current_rating?.overall_rating,
        "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments?.trim(),
        "normalizer_previous_submission.normalizer_overall_feedback": normalizerOverallFeedComments?.trim(),
        "normalizer.objective_description": normalizerRating,
        "normalizer.normalizer_rating": employeeData?.data?.current_rating?.overall_rating,
        "normalizer.normalizer_rejected": true,
        "reviewer.rejection_count": 0,
        "appraisal.objective_description": appraiser_objective_description,
        "appraisal_previous_submission.objective_description": appraiser_objective_description,
        "normalizer_previous_submission.objective_description": normalizerRating,
        "current_previous_submission.objective_description": employeeData?.data?.current_rating.objective_description,
        "normalizer.normalizer_PA_rejected": true,
        "normalizer.reason_for_rejection" : "",
        "normalizer_previous_submission.reason_for_rejection" : "",
        id: employee_id,
      }).then((res: any) => {
        updateLoggedRole({
          pa_action_by: `Normalizer (Rejected) (from Overall Feedback Tab) : ${new Date()}`,
          id: employee_id
        })
      });
      // setmessage("The performance appraisal has been successfully submitted to the Appraiser.");
      //  setmessage("The performance appraisal was submitted to the Appraiser.");
      // The performance appraisal has been submitted to the 
      //  setAllFeedMandatory2(true);
      //snackbar
      setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Appraiser.")
      setSuccessAlertTriger(true)

      // Notification action Normalizer rejects Reviewer PA (for Appraiser/Reviewer)
      let normalizerName = employeeData?.data?.normalizer_name;
      let employeeName = employeeData?.data?.first_name;
      let calendarName = employeeData?.data?.calendar?.calendar_type;
      let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
      let employeeCode = employeeData?.data?.employee_code

      let tempSubject = NORMALIZER_REJECTS_PA?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

      let tempHtml = NORMALIZER_REJECTS_PA?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);


      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email

      let employeeEmail = employeeData?.data?.email;
      let email = NORMALIZER_REJECTS_PA?.to;
      const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
      email = email?.replace("[email]", `${appraiserEmail}`);
      const ccemail = [`${reviewerEmail}`]
      sendEmailNotification(
        {
          to: email,
          cc: ccemail,
          subject: tempSubject,
          html: tempHtml
        }
      )
    }
  };
  const handleAlertClose1 = () => {
    setisAlertOpen1(false);
    setisAlertOpen(false);
    // setValue(1)
    // setRatingAppraiser('')
  };
  console.log(normalizerOverallFeedComments, "normalizerOverallFeedComments")
  return (
    // <Footer>normalizer
    <Stack justifyContent="center" spacing={2} direction="row">

      {/* <Link to={`/normalizer`}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#008E97",
            fontSize: "16px",
            fontWeight: 400,
            textTransform: "none",
            borderRadius: "7px",
          }}
          onClick={() => {
            updateMutation({
              //"normalizer.other_recommendation": checkboxIdHandler(
                //checkboxHandler(otherRecommendation)
              //),
              //"normalizer.training_recommendation":
                //trainingRecommendationFormValues,
              "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
              "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
              "normalizer.feedback_questions_comments": normalizerOverallFeedComments,
              "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
             // "normalizer.feedback_questions": overallFeed,
              //"normalizer.area_of_improvement": areaImprovement,
              id: employee_id,
            })
          }}
        >
          <Typo1>Save</Typo1>
        </Button>
      </Link> */}

      {/* <Link to={`/normalizer`}> */}
      {employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
        <>
          <Button
            disabled={disableButtons}
            variant="outlined"
            style={{
              // color: "#008E97",
              // fontSize: "16px",
              // border: "1px solid ##008E97",
              // fontWeight: 400,
              // textTransform: "none",
              // borderRadius: "7px",
              // backgroundColor: "#008E97",
              borderRadius: "4px",
              fontSize: "15px",
              color: "#3e8cb5",
              textTransform: "none",
              borderColor: "#3e8cb5",
              background: "transparent",
              height: "35px",
              // width: "70px",
              fontFamily: "arial",
              ...((disableButtons ) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color:  "#ccc",
              }),
            }}
            onClick={() => {
              // updateMutation({
              //"normalizer.other_recommendation": checkboxIdHandler(
              //checkboxHandler(otherRecommendation)
              // ),
              //      "normalizer.training_recommendation":
              //trainingRecommendationFormValues,
              //   "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
              //   "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
              //   "normalizer.feedback_questions_comments": normalizerOverallFeedComments,
              //   "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
              //   // "normalizer.feedback_questions": overallFeed,
              //   // "normalizer.area_of_improvement": areaImprovement,

              //   "normalizerIsChecked": true,
              //   "normalizerIsDisabled": true,
              //   "normalizer.normalizer_status": 'rejected',
              //   "appraisal.appraiser_status": "normalizer-rejected",

              //   id: employee_id,
              // })
              //setnavPrompt(false)
              saveHandler();
            }}
          >
            Save as Draft
          </Button>
          <Button
            style={{
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              height: "35px",
              // width: "70px",
              background: "transparent",
              ...((disableButtons ) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color:  "#ccc",
              }),
            }}
            variant="outlined"
            disabled={disableButtons || disableSubmit}
            onClick={() => {
              submitHandler();
              setnavPrompt(false);
              // submitHandler();
              // setSubmit(true);
              // createMutation({
              //   objective_description : appraiserComments,
              //   id: employee_id
              // })
            }}
          >
            Save and Submit
          </Button>
          {/* </Link> */}

          {/* <Link to={`/normalizer`}> */}
          <Button
            disabled={disableButtons}
            variant="outlined"
            style={{
              fontSize: "15px",
              borderRadius: "4px",
              color: "#3e8cb5",
              textTransform: "none",
              borderColor: "#3e8cb5",
              background: "transparent",
              height: "35px",
              width: "70px",
              fontFamily: "arial",
              ...((disableButtons ) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color:  "#ccc",
              }),
            }}
            onClick={() => {
              moveTabHandler()
              // setValue(0);
              // saveRecommendationsHandler();
            }}
          >
            Back
          </Button>
          <Button
            disabled={disableButtons}
            variant="outlined"
            style={{
              borderRadius: "4px",
              background: "transparent",
              borderColor: "#3e8cb5",
              fontSize: "15px",
              textTransform: "none",
              color: "#3e8cb5",
              height: '35px',
              width: "70px",
              fontFamily: "arial",
              ...((disableButtons ) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color:  "#ccc",
              }),
            }}
            onClick={() => {
              // saveRecommendationsHandler();
              // handleBackButton();
              // setValue(0);
              // RatingHandler();
              CancelButtonHandler()
            }}
          >
            Cancel
          </Button>
        </>
      }

      {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
      <AlertDialogOkCancelForUnsavedChanges
        isAlertOpen={openCancelDialog}
        handleAlertClose={rejectCancelButtonHandler}
        handleAlertIdClose={acceptCancelButtonHandler}
      >
      </AlertDialogOkCancelForUnsavedChanges>


      <Dialog
        open={isAlertOpen}
        // onClose={handleAlertClose}
        // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            // borderColor:'blue',
            //border:'1px solid',
            boxShadow: "none",
            borderRadius: "6px",
            //marginTop: "155px",
            maxWidth: "0px",
            minWidth: "26%",
            margin: "0px",
            padding: "30px",
            // maxHeight:"30%"
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // textAlign: "center",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>

          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "#333333",
              fontSize: "14px",
              fontFamily: "Arial",
              // paddingBottom: "12px",
              // paddingRight: "10px",
              // paddingLeft: "10px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              // height: "100px",
              alignItems: "center",
              overflowY: "hidden",
            }}
          >
            {/* Did you review the recommendations ? */}
            Have you reviewed the overall feedback of the performance appraisal?
          </DialogContentText>
        </DialogContent>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        // paddingBottom="30px"
        >
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                width: "70px",
                height: "35px"
              }}
              variant="outlined"
              // onClick={handleAlertYes}
              onClick={handleAlertYes}
            >
              Yes
            </Button>
          </DialogActions>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>

            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                width: "70px",
                height: "35px"
              }}
              variant="outlined"
              onClick={handleAlertClose}
              // onClick={handleAlertClose}
              autoFocus
            >

              No

            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
      <Dialog
        open={isAlertOpen1}
        // onClose={handleAlertClose1}
        // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            // borderColor:'blue',
            //border:'1px solid',
            boxShadow: "none",
            borderRadius: "6px",
            //marginTop: "155px",
            maxWidth: "0px",
            minWidth: "26%",
            margin: "0px",
            padding: "30px",
            // maxHeight:"30%"
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // textAlign: "center",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>

          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "#333333",
              fontSize: "14px",
              fontFamily: "Arial",
              // paddingBottom: "12px",
              // paddingRight: "10px",
              // paddingLeft: "10px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              // height: "100px",
              alignItems: "center",
              overflowY: "hidden",
            }}
          >
            {/* Are you sure you wish to reject selected performance appraisal?  */}
            Are you sure you wish to reject the performance appraisal?
          </DialogContentText>
        </DialogContent>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        // paddingBottom="30px"
        >
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                width: "70px",
                height: "35px"
              }}
              variant="outlined"
              onClick={handleAlertYes1}
            >
              Yes
            </Button>
          </DialogActions>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>

            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                width: "70px",
                height: "35px"
              }}
              variant="outlined"
              onClick={handleAlertClose1}
              autoFocus
            >

              No

            </Button>
          </DialogActions>
        </Stack>
      </Dialog>

      <Dialog
        // fullScreen={fullScreen}
        open={allFeedMandatory1}
        // onClose={handleAllFeedMandatory1}
        // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            // borderColor:'blue',
            //border:'1px solid',
            boxShadow: "none",
            borderRadius: "6px",
            //marginTop: "155px",
            maxWidth: "0px",
            minWidth: "26%",
            margin: "0px",
            padding: "30px",
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
              color: "#3e8cb5"
            }}
            variant="outlined"
            autoFocus
            onClick={handleAllFeedMandatory1}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        // fullScreen={fullScreen}
        open={allFeedMandatory}
        // onClose={handleAllFeedMandatory}
        // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            // borderColor:'blue',
            //border:'1px solid',
            boxShadow: "none",
            borderRadius: "6px",
            //marginTop: "155px",
            maxWidth: "0px",
            minWidth: "26%",
            margin: "0px",
            padding: "30px",
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
              overflowY: "hidden",
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
              marginRight: "10px",
              // width: "70px",
              // height: "35px",
              background: "transparent",
              color: "#3e8cb5"
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
        open={allFeedMandatory2}
        onClose={handleAllFeedMandatory2}
        // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            // borderColor:'blue',
            //border:'1px solid',
            boxShadow: "none",
            borderRadius: "6px",
            //marginTop: "155px",
            maxWidth: "0px",
            minWidth: "26%",
            margin: "0px",
            padding: "30px",
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
              overflowY: "hidden",
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
          <Link style={{
            fontSize: "18px",
            color: "#3e8cb5",
            fontFamily: "Arial",
          }}
            color="inherit"
            to={`/normalizer`}
            state={{
              from: `${1}`
            }}

          >
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                marginRight: "10px",
                // width: "70px",
                // height: "35px",
                background: "transparent",
                color: "#3e8cb5"
              }}
              variant="outlined"
              autoFocus
              onClick={handleAllFeedMandatory2}
            >
              Ok
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      {/* </Link> */}
      <Snackbar
        className={classes.customSnackbar}
        open={successAlertTriger}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b>{successAlertTrigerMSG}</b>
        </Alert>
      </Snackbar>
    </Stack>
    // </Footer>
  );
}

export default Footerbuttons;
