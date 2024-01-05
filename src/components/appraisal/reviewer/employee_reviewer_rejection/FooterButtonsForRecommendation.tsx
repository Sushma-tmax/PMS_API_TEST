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
import { REVIEWER_REJECTS_PA_AFTER_EMPLOYEE_REJECTION } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Reviewer";
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
const FooterButtonsForRecommendation = (props: any) => {
  const classes = useStyles();
  const { setnavPrompt, navPrompt, setValue, value, moveTab, setMoveTab, refetch, fetchCancel, objectiveDescription } = props;
  //@ts-ignore
  const { updateMutation, employee_id, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewedOverallFeedback, setReviewedOverallFeedback, emailData, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments } = useReviewerContext()
  const navigate = useNavigate();
  const [openOk, setOpenOk] = useState(false);
  const [message, setMessage] = useState("")
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
  const [sendEmailNotification] = useSendEmailNotificationMutation();

  const CancelButtonHnadler = () => {
    if (navPrompt == true || moveTab == true) {
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
    setOpenOk(false);
    setMessage("");
  }
  const handleAlertClose11 = () => {
    setOpenYes(false);
    setMessage("");
    setValue(1);
  }
  const handleAlertClose1 = () => {
    setOpenYes1(false);
    setMessage1("");
  }
  const handleAlertClose2 = () => {
    setOpenYes2(false);
    setMessage("");
  }
  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setOpenYes(false);

    let rejectedReviewerRatings = empData?.data?.reviewer?.objective_description
      ?.filter((item: any) => item.action_performed === true && item.rating_rejected === true);

    if (rejectedReviewerRatings?.length == 0) {
      setAcceptedRatingsAndReject(true);
      setMessage("You accepted all rejected ratings. Are you sure you wish to reject the performance appraisal?")
    } else {
      setOpenYes1(true);
      setMessage1("Are you sure you wish to reject the performance appraisal?")
    }
  }
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory3, setAllFeedMandatory3] = React.useState(false);

  const handleAlertYes1 = () => {
    rejectionHandler(empData.data.reviewer.rejection_count);
    //  setMessage('The performance appraisal was submitted to the Appraiser.')
    //    setAllFeedMandatory3(true);
    // setdisableSubmit(true);
    // }
    //snackbar
    setOpenYes1(false);
    setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Appraiser.")
    setSuccessAlertTriger(true)
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
    let reviewerObjDesc = empData?.data?.reviewer?.objective_description?.map((i: any) => {
      if (i.action_performed == false) {
        let tempAppraiserRating = empData?.data?.appraisal?.objective_description.find((item: any) => {
          return item.name?._id == i.name?._id
        })
        return {
          ...i,
          ratings: tempAppraiserRating.ratings,
          action_performed: false,
        }
      } else return {
        ...i,
        action_performed: false
      }
    }
    );
    updateMutation({

      "reviewer.objective_description": reviewerObjDesc,
      "reviewer.rejection_count": count == undefined ? 1 : count + 1,
      "reviewerIsChecked": true,
      "reviewerIsDisabled": true,
      "reviewer.reviewer_status": 'rejected',
      "reviewer_previous_submission.objective_description": reviewerObjDesc,
      "reviewer_previous_submission.reviewer_status": 'rejected',
      "reviewer_previous_submission.reviewer_rating": empData?.data?.reviewer?.reviewer_rating,
      "appraiserIsDisabled": false,
      "appraisal.appraiser_status": "reviewer-rejected-employee",
      "appraisal.pa_status": "Pending with Appraiser (Reviewer Rejection)",
      "appraisal.pa_rating": empData?.data?.current_rating?.overall_rating,
      "appraisal.status": "rejected",
      "appraisal.show_reviewer": true,
      "appraisal_previous_submission.pa_status": "Pending with Appraiser (Reviewer Rejection)",
      "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      "reviewer_previous_submission.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      "reviewer.reviewer_rating": empData?.data?.current_rating?.overall_rating,
      "current_previous_submission.objective_description": empData?.data?.current_rating.objective_description,
      "appraisal_previous_submission.objective_description": empData?.data?.appraisal?.objective_description,
      "reviewer.reviewer_PA_rejected": true,
      "reviewer.reviewer_comments" : "" ,
      "reviewer_previous_submission.reviewer_comments" : "" ,
      id: employee_id,
    }).then((res: any) => {
      updateLoggedRole({
        pa_action_by : `Reviewer (Rejected) (from Overall Feedback Tab ) : ${new Date()}`,
        id : employee_id
      })
    })

    let appraiserName = empData?.data?.appraiser_name;
    let reviewerName = empData?.data?.reviewer_name;
    let employeeName = empData?.data?.first_name;
    let calendarName = empData?.data?.calendar?.calendar_type;
    let calendarYear = empData?.data?.calendar?.start_date?.slice(0, 4);
    let dueDate = empData?.data?.calendar?.end_date_employee_acknowledgement?.slice(0, 10);
    let employeeCode = empData?.data?.employee_code;
    let appraiserFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.appraiser_code)?.firstName;

      // Notification action Reviewer rejects Employee rejected PA (overall rating difference greater than 0.3) (For Appraiser)
      let tempSubject = REVIEWER_REJECTS_PA_AFTER_EMPLOYEE_REJECTION?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

      let tempHtml = REVIEWER_REJECTS_PA_AFTER_EMPLOYEE_REJECTION?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[Reviewer name]", `${reviewerName}`);
      tempHtml = tempHtml?.replace("[Appraiser FirstName]", `${appraiserFirstName}`);


      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.appraiser_code)?.email
      let email = REVIEWER_REJECTS_PA_AFTER_EMPLOYEE_REJECTION?.to;
      email = email?.replace("[email]", `${appraiserEmail}`);

      sendEmailNotification(
        {
          to: email,
          subject: tempSubject,
          html: tempHtml
        }
      )

    

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
        id: employee_id,
      })
    }
  }
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);

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
    updateMutation({

      "reviewer.reviewer_status": 'draft',
      "appraisal.pa_status": " Pending with Reviewer(Employee Rejection)",
      // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
      // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
      "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
      id: employee_id,
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
    //setMessage1('Changes were successfully saved.')
    // setAllFeedMandatory(true);
    setMoveTab(false);
    setnavPrompt(false);
    //new alert 
    setSuccessAlertTrigerMSG("Changes were successfully saved.")
    setSuccessAlertTriger(true)

    // }
  }

  const [openYes2, setOpenYes2] = useState(false);
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);
  const [acceptedRatingsAndReject, setAcceptedRatingsAndReject] = useState(false);
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);
  const [updatedRejectionReason, setUpdatedRejectionReason] = useState(false);
  const [updateRejectionReasonAlert, setUpdateRejectionReasonAlert] = useState(false);

  const handleAcceptedRatingsAndRejectYes = () => {
    setAcceptedRatingsAndReject(false);
    setUpdatedRejectionReason(true);
    setMessage("Have you updated your rejection reasons?")
  }

  const handleAcceptedRatingsAndRejectNo = () => {
    setAcceptedRatingsAndReject(false);
    setNavigateToDashboard(true);
    setMessage("Please select the Bulk Accept or Accept buttons.")
  }
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
  };
  const handleAllFeedMandatory3 = () => {
    setAllFeedMandatory3(false);
  };
  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
    setOpenYes1(false);
    setMessage("")

  };
  const handleUpdatedRejectionReasonYes = () => {
    setUpdatedRejectionReason(false);
    setMessage("");
    handleAlertYes1();
  }
  const handleUpdateRejectionReasonAlertClose = () => {
    setUpdateRejectionReasonAlert(false);
    setMessage("")
  }
  const handleUpdatedRejectionReasonNo = () => {
    setUpdatedRejectionReason(false);
    setUpdateRejectionReasonAlert(true);
    setMessage("Please update your rejection reasons.")
  }
  const submitHandler = () => {
    let appraisalResubmittedRatings = empData?.data?.appraisal?.objective_description?.filter((item: any) => {
      return (item.rating_rejected == true || item.rating_resubmitted == true)
    }).map((item: any) => item?.name?._id);
    let actionPerformed = objectiveDescription?.filter((item: any) => {
      return appraisalResubmittedRatings?.includes(item?.name?._id) && item?.action_performed == false
    });
    // if (actionPerformed?.length > 0) {
    //   setAllFeedMandatory2(true);
    //   setMessage("You cannot submit the performance appraisal. Please accept or reject the ratings.")
    // } else
    if (reviewerOverallFeedComments?.trim() == undefined || reviewerOverallFeedComments?.trim() == null || reviewerOverallFeedComments?.trim() == "") {
      setOpenYes(false);
      setOpenYes1(false);
      setOpenYes2(true);
      setMessage("Please add rejection reason.")
    } else {
      setOpenYes1(true);
      setMessage1("Are you sure you wish to reject the performance appraisal?")

      // let rejectedReviewerRatings = empData?.data?.reviewer?.objective_description
      // ?.filter((item: any) => item.action_performed === true && item.rating_rejected === true);
      // setAllFeedMandatory2(false);
      // if (rejectedReviewerRatings?.length == 0) {
      //   setAcceptedRatingsAndReject(true);
      //   setMessage("You accepted all rejected ratings. Are you sure you wish to reject the performance appraisal?")
      // }
      //  else {
      //   setOpenYes1(true);
      //   setMessage1("Are you sure you wish to reject the performance appraisal?")
      // }     
    }
    // setMessage(" Did you review the recommendation ?")
  }
  const handleNavigateToDashboard = () => {
    setNavigateToDashboard(false);
    setMessage("");
    navigate(`/reviewer`, { state: { from: `${1}` } })
  }
  return (
    // <Footer>
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
              fontFamily: "arial"
              // width: "70px",
            }}
            onClick={() => {
              saveHandler()

            }}
          >
            Save as Draft
          </Button>
          {/* </Link> */}
          <Button
            variant="outlined"
            style={{
              backgroundColor: "Transparent",
              fontSize: "15px",
              fontWeight: 400,
              textTransform: "none",
              color: "#3e8cb5",
              borderColor: "#3E8CB5",
              height: "35px",
              fontFamily: "arial"
              // width: "70px",
            }}
            onClick={() => {
              setnavPrompt(false);
              submitHandler();
            }}
          >
            Save and Submit
          </Button>
          <Button
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
              fontFamily: "arial"
            }}
            onClick={() => { backHandler() }}
          >
            Back
            {/* <Link to={`/reviewer`}>
                    Back
                </Link> */}

          </Button>
          <Button
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
              fontFamily: "arial"
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


      <AlertDialogSuccess
        isAlertOpen={openOk}
        handleAlertClose={handleAlertClose}>
        {message}
      </AlertDialogSuccess>

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
        </DialogActions>
      </Dialog>
      <AlertYesNo
        isAlertOpen={openYes}
        handleAlertClose={handleAlertClose11}
        handleAlertYes={handleAlertYes}
      // handleAlertYes={handleAlertYes}
      >
        {message}
      </AlertYesNo>
      <AlertYesNo
        isAlertOpen={updatedRejectionReason}
        handleAlertClose={handleUpdatedRejectionReasonNo}
        handleAlertYes={handleUpdatedRejectionReasonYes}>
        {message}
      </AlertYesNo>
      <AlertDialogSuccess
        isAlertOpen={updateRejectionReasonAlert}
        handleAlertClose={handleUpdateRejectionReasonAlertClose}>
        {message}
      </AlertDialogSuccess>
      <AlertDialogSuccess
        isAlertOpen={navigateToDashboard}
        handleAlertClose={handleNavigateToDashboard}>
        {message}
      </AlertDialogSuccess>
      <AlertYesNo
        isAlertOpen={openYes1}
        handleAlertClose={handleAlertClose1}
        handleAlertYes={handleAlertYes1}>
        {message1}
      </AlertYesNo>

      <AlertYesNo
        isAlertOpen={acceptedRatingsAndReject}
        handleAlertClose={handleAcceptedRatingsAndRejectNo}
        handleAlertYes={handleAcceptedRatingsAndRejectYes}>
        {message}
      </AlertYesNo>
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
      <Dialog
        // fullScreen={fullScreen}
        open={allFeedMandatory3}
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
              onClick={handleAllFeedMandatory3}
            >
              Ok
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
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

export default FooterButtonsForRecommendation;
