import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import AlertYesNo from "../../../UI/DialogYesNo";
import { REVIEWER_REJECTS_PA } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Reviewer";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { REVIEWER_REJECTS_PA_3RD_TIME_INFO } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Reviewer";
import AlertDialogOkCancelForUnsavedChanges from "../../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../../service/employee/employee";

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
  const classes = useStyles();
  const { setnavPrompt, navPrompt, setValue, value, moveTab, setMoveTab, refetch, fetchCancel, objectiveDescription } = props;
  //@ts-ignore
  const { updateMutation, reviewedOverallFeedback, employee_id, setReviewedOverallFeedback, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, emailData, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments, normalizerOverallFeedback , disableButtons , setDisableButtons} = useReviewerContext()
  const navigate = useNavigate();
  const [sendEmailNotification] = useSendEmailNotificationMutation();

  const [openOk, setOpenOk] = useState(false);
  const [Message, setMessage] = useState("")
  const [message1, setMessage1] = useState("")
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  // refetch
  const CancelButtonHnadler = () => {
    if (navPrompt == true || moveTab == true) {
      setOpenCancelDialog(true);
    }  else {
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

  const backHandler = () => {
    setValue(0)
    // if (moveTab === true) {
    //   setOpenOk(true);
    //   setMessage("Please save the changes before leaving the page.")
    // } else {
    //   setValue(0)
    // }
  }

  const handleAlertClose = () => {
    // setOpenOk(false);
    setOpenYes(false);
    setMessage("");
  }


  const updateRejectionCount = (count: any) => {

    if (count === 0 || count === undefined) {
      return 1;
    } else if (count === 1) {
      return 2;
    } else if (count === 2) {
      return 3;
    }
  }

  const rejectionHandler = (count: any) => {
    // if (count === 0 || count === undefined) {
    let reviewerObjDesc = empData?.data?.reviewer?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      }
    );
    updateMutation({

      "reviewer.objective_description": reviewerObjDesc,
      "reviewer.rejection_count": count == undefined ? 1 : count + 1,
      "reviewerIsChecked": true,
      "reviewerIsDisabled": true,
      "reviewer.reviewer_status": 'rejected',
      "reviewer.reviewer_rating": empData?.data?.current_rating?.overall_rating,
      "reviewer_previous_submission.objective_description": reviewerObjDesc,
      "reviewer_previous_submission.reviewer_status": 'rejected',
      "reviewer_previous_submission.reviewer_rating": empData?.data?.reviewer?.reviewer_rating,
      "appraiserIsDisabled": false,
      "appraisal.appraiser_status": "reviewer-rejected",
      "appraisal.pa_status": "Pending with Appraiser (Reviewer Rejection)",
      "appraisal.pa_rating": empData?.data?.current_rating?.overall_rating,
      "appraisal.show_reviewer": true,
      "appraisal_previous_submission.pa_status": "Pending with Appraiser (Reviewer Rejection)",
      "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      "current_previous_submission.objective_description": empData?.data?.current_rating.objective_description,
      "appraisal_previous_submission.objective_description": empData?.data?.appraisal?.objective_description,
      "reviewer.reviewer_PA_rejected": true,
      "reviewer.reviewer_comments": "",
      "reviewer.reviewer_comments_draft": "",
      "reviewer_previous_submission.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      "reviewer_previous_submission.reviewer_comments": "",
      id: employee_id,
    }).then((res: any) => {
      updateLoggedRole({
        pa_action_by : `Reviewer (Rejected)(from Overall Feedback Tab) : ${new Date()}`,
        id : employee_id
      });
      setDisableButtons(false);
      setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Appraiser.")
      setSuccessAlertTriger(true)
      setdisableSubmit(true);
    })

    let appraiserFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.appraiser_code)?.firstName;
    let normalizerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.normalizer_code)?.firstName;
    let reviewerName = empData?.data?.reviewer_name;
    let employeeName = empData?.data?.first_name;
    let calendarName = empData?.data?.calendar?.calendar_type;
    let calendarYear = empData?.data?.calendar?.start_date?.slice(0, 4);
    let dueDate = empData?.data?.calendar?.end_date_employee_acknowledgement?.slice(0, 10);
    let employeeCode = empData?.data?.employee_code

    // Notification action after Reviewer rejects PA (for Appraiser)  (Pre-normalization)
    let tempSubject = REVIEWER_REJECTS_PA?.subject;
    tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
    tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
    tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
    tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

    let tempHtml = REVIEWER_REJECTS_PA?.html;
    tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
    tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
    tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
    tempHtml = tempHtml?.replace("[Reviewer name]", `${reviewerName}`);
    tempHtml = tempHtml?.replace("[Appraiser FirstName]", `${appraiserFirstName}`);
    tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);

    let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.appraiser_code)?.email
    let email = REVIEWER_REJECTS_PA?.to;
    email = email?.replace("[email]", `${appraiserEmail}`);


    sendEmailNotification(
      {
        to: email,
        subject: tempSubject,
        html: tempHtml
      }
    )

    if (count && count == 2) {
      let tempSubjectInfo = REVIEWER_REJECTS_PA_3RD_TIME_INFO?.subject;
      tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

      let tempHtmlInfo = REVIEWER_REJECTS_PA_3RD_TIME_INFO?.html;
      tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[Reviewer name]", `${reviewerName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer FirstName]", `${normalizerFirstName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

      let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.normalizer_code)?.email
      let email = REVIEWER_REJECTS_PA_3RD_TIME_INFO?.to;
      email = email?.replace("[email]", `${normalizerEmail}`);


      sendEmailNotification(
        {
          to: email,
          subject: tempSubjectInfo,
          html: tempHtmlInfo
        }
      )
    }
    // } 
    // else if (count === 1) {
    //   updateMutation({
    //     "reviewer.rejection_count": 2,
    //     "reviewerIsChecked": true,
    //     "reviewerIsDisabled": true,
    //     "reviewer.reviewer_status": 'rejected',
    //     "appraiserIsDisabled": false,
    //     "appraisal.appraiser_status": "reviewer-rejected",
    //     // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
    //     // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
    //     "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
    //     // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
    //     id: employee_id,
    //   })
    // } else if (count === 2) {
    //   updateMutation({
    //     "reviewer.rejection_count": 3,
    //     "reviewerIsChecked": true,
    //     "reviewerIsDisabled": true,
    //     // "reviewer.reviewer_status": 'rejected',
    //     // "appraiserIsDisabled": false,
    //     // "appraisal.appraiser_status": "reviewer-rejected",
    //     "normalizerIsDisabled": false,
    //     "normalizerIsChecked": false,
    //     "normalizer.normalizer_status": 'pending',

    //     // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
    //     // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
    //     "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
    //     // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
    //     id: employee_id,
    //   })
    // }
    //navigate(`/reviewer`);
  }


  const handleSubmit = () => {
    if (empData.data.reviewer.rejection_count === 0) {
      updateMutation({
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'accepted',
        "normalizerIsDisabled": false,
        "normalizerIsChecked": false,
        "normalizer.normalizer_status": 'pending',
        "normalizer.normalizer_overall_feedback": normalizerOverallFeedback,
        id: employee_id,
      })
    }
  }
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  console.log(navTrigger, navPrompt, 'navTrigger&prompt')
  useEffect(() => {
    if (navPrompt === false && navTrigger === true) {
      console.log('func2')
      setnavTrigger(false)
      rejectionHandler(empData.data.reviewer.rejection_count);
      updateMutation({
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "appraiserIsDisabled": false,
        "appraisal.appraiser_status": "reviewer-rejected",
        // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
        "normalizer.normalizer_overall_feedback": normalizerOverallFeedback,
        // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    }
  }, [navTrigger]);
  //nav prompt
  const saveHandler = () => {

    // if (reviewerOverallFeedComments == undefined || reviewerOverallFeedComments == null || reviewerOverallFeedComments == "") {
    //   setMessage1('Please fill in all the mandatory fields (*).')
    //   setAllFeedMandatory(true);
    //   // updateMutation({
    //   //   "reviewer.reviewer_status": 'Draft',
    //   //   // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
    //   //   // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
    //   //   "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
    //   //   // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
    //   //   id: employee_id,
    //   // })
    // } else {
      setDisableButtons(true);
    updateMutation({

      "reviewer.reviewer_status": 'draft',
      "appraisal.pa_status": "Pending with Reviewer",
      "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      id: employee_id,
    }).then((res: any) => {
      setMoveTab(false);
      setnavPrompt(false);
      setDisableButtons(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
  
    })
    // if (moveTab == true) {
    //   setMessage1('Changes were successfully saved.')
    //   setAllFeedMandatory(true);
    //   setMoveTab(false);
    // } else {
    //   setMessage1('No changes were made to save.')
    //   setAllFeedMandatory(true);
    //   setMoveTab(false);
    // }
    // setMessage1('Changes were successfully saved.')
    // setAllFeedMandatory(true);
    
    // }
  }
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);

  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);
  const [openYes2, setOpenYes2] = useState(false);
  // const [Message, setMessage] = useState("")
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);

  const [acceptedRatingsAndReject, setAcceptedRatingsAndReject] = useState(false);
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const [updatedRejectionReason, setUpdatedRejectionReason] = useState(false);
  const [updateRejectionReasonAlert, setUpdateRejectionReasonAlert] = useState(false);

  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
  };
  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    setOpenYes1(false);
    setMessage1("");
  };
  // setAllFeedMandatory1
  const submitHandler = () => {
    setDisableButtons(true);
    if (reviewerOverallFeedComments?.trim() == undefined || reviewerOverallFeedComments?.trim() == null || reviewerOverallFeedComments?.trim() == "") {
      setOpenYes(false);
      setOpenYes1(false);
      setOpenYes2(true);
      setMessage("Please add rejection reason.")
    }
    else {
      setAllFeedMandatory2(false);
      setOpenYes1(true);
      setMessage1("Are you sure you wish to reject the performance appraisal?")
    }

    // setMessage(" Did you review the recommendation ?")

  }
  const handleAlertClose1 = () => {
    // setAllFeedMandatory(false);
    setOpenYes1(false);
    // setOpenYes(true);
    setMessage1("");
    setDisableButtons(false);
    // setValue(1);
  }
  const handleUpdatedRejectionReasonYes = () => {
    setUpdatedRejectionReason(false);
    setMessage("");
    handleAlertYes1();
  }
  const handleAlertYes1 = () => {
    setOpenYes(false);
    setOpenYes1(false);
    rejectionHandler(empData.data.reviewer.rejection_count);
    // setMessage1('The performance appraisal was submitted to the Appraiser.')
    // setAllFeedMandatory1(true);
    //snackbar
   
  }

  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setOpenYes(false);
    setOpenYes1(true);
    setMessage1("Are you sure you wish to reject the performance appraisal?")
  }


  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
    setOpenYes1(false);
    setMessage("")

  };
  const handleAlertClose2 = () => {
    setOpenYes2(false);
    setMessage("");
    setDisableButtons(false);
  }
  const handleAcceptedRatingsAndRejectNo = () => {
    setAcceptedRatingsAndReject(false);
    setNavigateToDashboard(true);
    setMessage("Please select the Bulk Accept or Accept buttons.")
  }
  const handleAcceptedRatingsAndRejectYes = () => {
    setAcceptedRatingsAndReject(false);
    setUpdatedRejectionReason(true);
    setMessage("Have you updated your rejection reasons?")
  }


  const handleUpdatedRejectionReasonNo = () => {
    setUpdatedRejectionReason(false);
    setUpdateRejectionReasonAlert(true);
    setMessage("Please update your rejection reasons.")
  }
  const handleNavigateToDashboard = () => {
    setNavigateToDashboard(false);
    setMessage("");
    navigate(`/reviewer`, { state: { from: `${1}` } })
  }
  const handleUpdateRejectionReasonAlertClose = () => {
    setUpdateRejectionReasonAlert(false);
    setMessage("")
  }
  return (
    // <Footer>
    <>
      <Stack justifyContent="center" spacing={2} direction="row">
        {/* <Link to={`/reviewer`}>
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
                            obj: empData.data.appraisal.objective_description,
                            // "reviewer.other_recommendation": checkboxIdHandler(
                            //     checkboxHandler(otherRecommendation)
                            // ),
                            // "reviewer.training_recommendation":
                            // trainingRecommendationFormValues,
                            // "reviewer.feedback_questions": overallFeed,
                            // "reviewer.area_of_improvement": areaImprovement,
                            "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
                            "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
                            "reviewer.feedback_questions_comments":reviewerOverallFeedComments,
                            "reviewer.area_of_improvement_comments":reviewerAreaImprovementComments,
                            id: employee_id,
                        })
                    }}
                >
                    <Typo1>Save</Typo1>
                </Button>
            </Link> */}

        {/* <Link to={`/reviewer`}> */}
        {empData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer") &&
          <>
            <Button
              variant="outlined"
              disabled = {disableButtons}

              // style={{
              //     // color: "#008E97",
              //     // fontSize: "16px",
              //     // border: "1px solid ##008E97",
              //     // fontWeight: 400,
              //     // textTransform: "none",
              //     // borderRadius: "7px",
              //     backgroundColor: "#008E97",
              //     fontSize: "16px",
              //     fontWeight: 400,
              //     textTransform: "none",
              //     borderRadius: "7px",
              // }}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                fontWeight: 400,
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                fontFamily: "arial",
                ...((disableButtons ) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color:  "#ccc",
                }),
                // width: "70px",
              }}
              onClick={() => {
                saveHandler()

              }}
            >
              Save as Draft
            </Button>
            <Button
              variant="outlined"
              disabled={disableButtons}
              style={{
                height: "35px",
                fontSize: "15px",
                textTransform: "none",
                fontFamily: "Arial",
                // width: "70px",
                backgroundColor: "Transparent",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                ...((disableButtons ) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color:  "#ccc",
                }),
              }}
              onClick={() => {
                setnavPrompt(false);
                submitHandler();

              }}
            >
              Save and Submit
            </Button>
            {/* </Link> */}

            <Button
            disabled = {disableButtons}
              variant="outlined"
              // style={{
              //     color: "#008E97",
              //     fontSize: "16px",
              //     fontWeight: 400,
              //     textTransform: "none",
              //     borderRadius: "7px",
              // }}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                width: "70px",
                fontWeight: 400,
                fontFamily: "arial",
                ...((disableButtons ) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color:  "#ccc",
                }),
              }}
              onClick={() => { backHandler() }}
            >
              Back
              {/* <Link to={`/reviewer`}>
                    Back
                </Link> */}

            </Button>
            <Button
               disabled = {disableButtons}
              variant="outlined"
              // style={{
              //     color: "#008E97",
              //     fontSize: "16px",
              //     fontWeight: 400,
              //     textTransform: "none",
              //     borderRadius: "7px",
              // }}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                width: "70px",
                fontWeight: 400,
                fontFamily: "arial",
                ...((disableButtons ) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color:  "#ccc",
                }),
              }}
              onClick={() => { CancelButtonHnadler() }}
            >
              Cancel
              {/* <Link to={`/reviewer`}>
                    Back
                </Link> */}

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


        <AlertYesNo
          isAlertOpen={openYes}
          handleAlertClose={handleAlertClose}
          handleAlertYes={handleAlertYes}
        // handleAlertYes={handleAlertYes}
        >
          {Message}
        </AlertYesNo>
        <AlertDialogSuccess
          isAlertOpen={updateRejectionReasonAlert}
          handleAlertClose={handleUpdateRejectionReasonAlertClose}>
          {Message}
        </AlertDialogSuccess>
        <AlertYesNo
          isAlertOpen={openYes1}
          handleAlertClose={handleAlertClose1}
          handleAlertYes={handleAlertYes1}>
          {message1}
        </AlertYesNo>
        <AlertDialogSuccess
          isAlertOpen={navigateToDashboard}
          handleAlertClose={handleNavigateToDashboard}>
          {Message}
        </AlertDialogSuccess>
        <AlertYesNo
          isAlertOpen={updatedRejectionReason}
          handleAlertClose={handleUpdatedRejectionReasonNo}
          handleAlertYes={handleUpdatedRejectionReasonYes}>
          {Message}
        </AlertYesNo>
        <Dialog
          // fullScreen={fullScreen}
          open={allFeedMandatory2}
          // onClose={handleAllFeedMandatory2}
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

          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                //paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                //height: "100px",
                // width: "300px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >

              {Message}
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
                color: "#3e8cb5",
                width: "70px",
                height: "35px",
                background: "transparent",
              }}
              variant="outlined"
              autoFocus
              onClick={handleAllFeedMandatory2}
            >
              Ok
            </Button>

          </DialogActions>
        </Dialog>
        <Dialog
          // fullScreen={fullScreen}
          open={openYes2}
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
                //paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                //height: "100px",
                // width: "300px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >

              {Message}
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
                color: "#3e8cb5",
                width: "70px",
                height: "35px",
                background: "transparent",
              }}
              variant="outlined"
              autoFocus
              onClick={handleAlertClose2}
            >
              Ok
            </Button>

          </DialogActions>
        </Dialog>
        <AlertDialogSuccess
          isAlertOpen={openOk}
          handleAlertClose={handleAlertClose}>
          {Message}
        </AlertDialogSuccess>
        <AlertYesNo
          isAlertOpen={acceptedRatingsAndReject}
          handleAlertClose={handleAcceptedRatingsAndRejectNo}
          handleAlertYes={handleAcceptedRatingsAndRejectYes}>
          {Message}
        </AlertYesNo>
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
                //paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                //height: "100px",
                // width: "300px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              {/* Changes were successfully saved. */}
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
            {/* <Link
            to={`/reviewer`}
            state={{
              from: `${1}`
            }}
          > */}
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                // marginRight: "10px",
                color: "#3e8cb5",
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
            {/* </Link> */}
          </DialogActions>
        </Dialog>
        <Dialog
          // fullScreen={fullScreen}
          open={allFeedMandatory1}
          onClose={handleAllFeedMandatory1}
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
                //paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                //height: "100px",
                // width: "300px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              {/* Changes were successfully saved. */}
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
            <Link
              to={`/reviewer`}
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
                  // marginRight: "10px",
                  color: "#3e8cb5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleAllFeedMandatory1}
              >
                Ok
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
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

    </>
    // </Footer>
  );
}

export default FooterButtonsForRecommendation;
