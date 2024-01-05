import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useRejectReviewerAppraisalEmployeeMutation,
} from "./../../../../service";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import { useParams } from "react-router-dom";
import AlertYesNo from "../../../UI/DialogYesNo";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { REVIEWER_REJECTS_PA } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Reviewer";
import AlertAcceptDialog from "../../../UI/DialogAccept";
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
const AddButton = styled(Button)({
  fontSize: "15px",
  textTransform: "none",
  color: "#3e8cb5",
  fontFamily: "Arial",
  background: "transparent",
  borderColor: "#3e8cb5",
  // "&:hover": {
  //     borderColor: "#004C75",
  // },
  "&:disabled": {

    color: '#a9a4a4',
    borderColor: "#a9a4a4",
  },
  "&:active": {},
  "&:focus": {},
});

const Footerbuttons = (props: any) => {
  const classes = useStyles();
  const { setnavPrompt, navPrompt, moveTab, setMoveTab, employeeDataIsFetching, value, setValue, objectiveDescription, fetchCancel } = props;
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);
  const [acceptedRatingsAndReject, setAcceptedRatingsAndReject] = useState(false);
  const [updatedRejectionReason, setUpdatedRejectionReason] = useState(false);
  const [updateRejectionReasonAlert, setUpdateRejectionReasonAlert] = useState(false);
  const [navigateToDashboard, setNavigateToDashboard] = useState(false);
  const [openYes2, setOpenYes2] = useState(false);
  const [Message1, setMessage1] = useState("")
  const [Message, setMessage] = useState("")
  const [cancelRatingsAlert, setCancelRatingsAlert] = useState(false)
  //@ts-ignore
  const { updateMutation, employee_id, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments, normalizerOverallFeedback, reviewedOverallFeedback, setReviewedOverallFeedback, emailData , disableButtons , setDisableButtons} = useReviewerContext()
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const navigate = useNavigate();
  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  // if (isLoading) {
  //   <p>Loading...</p>
  // }
  const updateRejectionCount = (count: any) => {

    if (count === 0 || count === undefined) {
      return 1;
    } else if (count === 1) {
      return 2;
    } else if (count === 2) {
      return 3;
    }
  }

  const cancelHandler = () => {
    let reviewerActionPerformed = objectiveDescription?.filter((item: any) => item.action_performed)
    if (reviewerActionPerformed?.length > 0) {
      setCancelRatingsAlert(true);
      setnavPrompt(false);
    } else {
      navigate(`/reviewer`, { state: { from: `${1}` } })
    }
  }

  const handleCloseCancelRatingsAlert = () => {
    setCancelRatingsAlert(false);
    setMessage("")
  }

  const handleCancelRatingsAlert = () => {
    setCancelRatingsAlert(false);
    let previousData = {
      appraisal: empData?.data?.appraisal_previous_submission?.objective_description,
      reviewer: empData?.data?.reviewer_previous_submission.objective_description,
      current: empData?.data?.current_previous_submission.objective_description
    }

    updateMutation({
      "appraisal.objective_description": previousData?.appraisal,
      "reviewer.objective_description": previousData?.reviewer,
      "current_rating.objective_description": previousData?.current,
      id: employee_id,
    })
      .then((res: any) => {
        if (!res.error) {
          navigate(`/reviewer`, { state: { from: `${1}` } })
        }

      })
  }


  const rejectionHandler = (count: any) => {
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
      "reviewer.reviewer_comments": "",
      "reviewer.reviewer_comments_draft": "",
      "reviewer_previous_submission.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      "reviewer_previous_submission.reviewer_comments": "",
      "current_previous_submission.objective_description": empData?.data?.current_rating.objective_description,
      "appraisal_previous_submission.objective_description": empData?.data?.appraisal?.objective_description,
      "reviewer.reviewer_PA_rejected": true,
      id: employee_id,
    }).then((res: any) => {
      updateLoggedRole({
        pa_action_by : `Reviewer (Rejected)(from Rating Tab) : ${new Date()}`,
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

    // Notification action after Reviewer rejects PA (for Appraiser) (Pre-normalization)
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
    //     "reviewer.objective_description" : reviewerObjDesc,
    //     "reviewer.rejection_count": 2,
    //     "reviewerIsChecked": true,
    //     "reviewerIsDisabled": true,
    //     "reviewer.reviewer_status": 'rejected',
    //     "reviewer_previous_submission.objective_description": reviewerObjDesc,
    //     "reviewer_previous_submission.reviewer_status": 'rejected',
    //     "reviewer_previous_submission.reviewer_rating":empData?.data?.reviewer?.reviewer_rating,
    //     "appraiserIsDisabled": false,
    //     "appraisal.appraiser_status": "reviewer-rejected",
    //     "appraisal.pa_status" : "Pending with Appraiser (Reviewer Rejection)",
    //     "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
    //     "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
    //     "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
    //     "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
    //     id: employee_id,
    //   })
    // } else if (count === 2) {
    //   updateMutation({
    //     "reviewer.objective_description" : reviewerObjDesc,
    //     "reviewer.rejection_count": 3,
    //     "reviewerIsChecked": true,
    //     "reviewerIsDisabled": true,
    //     "reviewer.reviewer_status": 'rejected',
    //     "reviewer_previous_submission.objective_description": reviewerObjDesc,
    //     "reviewer_previous_submission.reviewer_status": 'rejected',
    //     "reviewer_previous_submission.reviewer_rating":empData?.data?.reviewer?.reviewer_rating,
    //     // "appraiserIsDisabled": false,
    //     // "appraisal.appraiser_status": "reviewer-rejected",
    //     // "appraisal.pa_status" : "Pending with Appraiser (Reviewer Rejection)",
    //      "normalizerIsDisabled": false,
    //     "normalizerIsChecked": false,
    //       "appraisal.pa_status" : "Pending with HR Normalizer",
    //     "normalizer.normalizer_status": 'pending',
    //     "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
    //     "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
    //     "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
    //     "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
    //     id: employee_id,
    //   })
    // }
    //navigate(`/reviewer`);
  }

  const handleAlertClose = () => {
    setOpenYes(false);
    setMessage("");
    setValue(1);
  }
  const handleAlertClose1 = () => {
    // setAllFeedMandatory(false);
    setOpenYes1(false);
    // setOpenYes(true);
    setMessage1("");
    setDisableButtons(false);
    // setValue(1);
  }
  const handleAlertClose2 = () => {
    // setAllFeedMandatory(false);
    setOpenYes2(false);
    // setOpenYes(true);
    setMessage("");
    setDisableButtons(false);
    // setValue(1)
    // setValue(1);
  }

  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);

  // refetch
  const CancelButtonHandler = () => {
    if (navPrompt == true || moveTab == true) {
      setOpenCancelDialog(true);
    } else {
      navigate(`/reviewer`, { state: { from: 1 } })
    }
  }

  const rejectCancelButtonHandler = () => {
    // setMoveTab(false);
    // setnavPrompt(false);
    setOpenCancelDialog(false);
    // navigate('/normalizer')
    // setTimeout(() => {
    //   navigate(`/reviewer`, { state: { from: 1 } })
    // }, 1000);
  }
  const acceptCancelButtonHandler = () => {
    setMoveTab(false);
    setnavPrompt(false);
    setOpenCancelDialog(false);
    fetchCancel().then((res:any) =>  navigate(`/reviewer`, { state: { from: 1 } }) );
    
    // setValue(0);
   

  }
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

  const handleNavigateToDashboard = () => {
    setNavigateToDashboard(false);
    setMessage("");
    navigate(`/reviewer`, { state: { from: `${1}` } })
  }

  const handleUpdatedRejectionReasonYes = () => {
    setUpdatedRejectionReason(false);
    setMessage("");
    handleAlertYes1();
  }

  const handleUpdatedRejectionReasonNo = () => {
    setUpdatedRejectionReason(false);
    setUpdateRejectionReasonAlert(true);
    setMessage("Please update your rejection reasons.")
  }

  const handleUpdateRejectionReasonAlertClose = () => {
    setUpdateRejectionReasonAlert(false);
    setMessage("")
  }

  console.log(value, 'valueeee')

  const handleAlertYes1 = () => {
    setOpenYes(false);
    setOpenYes1(false);
    rejectionHandler(empData.data.reviewer.rejection_count);
    //    setmessage('The performance appraisal was submitted to the Appraiser.')
    //    setAllFeedMandatory(true);
    //snackbar
   
  }


  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setOpenYes(false);
    setOpenYes1(true);
    setMessage1("Are you sure you wish to reject the performance appraisal?")
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
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setMessage1("");
    setAllFeedMandatory(false);
    setOpenYes1(false);
    navigate(`/reviewer`, { state: { from: `${1}` } })
  };
  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
    setOpenYes1(false);
    setMessage("")

  };
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  console.log(navTrigger, navPrompt, 'navTrigger&prompt')
  // useEffect(() => {
  //     if (navPrompt === false && navTrigger === true) {
  //         console.log('func2')
  //         setnavTrigger(false)
  //         rejectionHandler(empData.data.reviewer.rejection_count);
  //         updateMutation({
  //             "reviewerIsChecked": true,
  //             "reviewerIsDisabled": true,
  //             "reviewer.reviewer_status": 'rejected',
  //             "appraiserIsDisabled": false,
  //             "appraisal.appraiser_status": "reviewer-rejected",
  //             "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
  //             "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
  //             "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
  //             "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
  //             id: employee_id,
  //         })
  //         setmessage('The details are submitted successfully.')
  //         setAllFeedMandatory(true);
  //     }
  // }, [navTrigger]);
  //nav prompt



  const saveHandler = () => {
    setDisableButtons(true);
    // setMoveTab(false);
    updateMutation({
      "reviewer.reviewer_status": 'draft',
      "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments?.trim(),
      "appraisal.pa_status": "Pending with Reviewer",
      id: employee_id,
    }).then((res : any) => {
      setMoveTab(false);
      setnavPrompt(false);
      setDisableButtons(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
    })
    //setmessage('Changes were successfully saved.')
    // if (moveTab == true) {
    //   setAllFeedMandatory2(true);
    //   setMessage("Changes were successfully saved.")
    //   setMoveTab(false);
    // } else {
    //   setAllFeedMandatory2(true);
    //   setMessage("No changes were made to save.")
    //   setMoveTab(false);
    // }
    // setAllFeedMandatory2(true);
    // setMessage("Changes were successfully saved.")
   
  }
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


  const handleApprove = () => {
    // acceptReviewer({
    //     id: checkboxIdHandler(checkboxHandler(users)),
    //   })
  };
  //   const checkboxIdHandler = (res: any) => {
  //     if (res) {
  //       const check = res.map((i: any) => {
  //         return i._id;
  //       });
  //       console.log(check, "check");
  //       return check;
  //     }
  //   };
  // const checkboxHandler = (checkbox: any) => {
  //     if (checkbox) {
  //       const res = checkbox.filter((i: any) => {
  //         return i.reviewerIsChecked === true && !i.reviewerIsDisabled;
  //       });
  //       return res;
  //     }
  //   };

  return (
    // <Footer>
    <>
      {/* {empData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer") && */}
      <Stack justifyContent="center" spacing={2} paddingTop="30px" direction="row">
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
              disabled={disableButtons || employeeDataIsFetching}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                fontWeight: 400,
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                fontFamily: "Arial",
                // width: "70px",
                ...((disableButtons || employeeDataIsFetching)  && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
              }}
              onClick={() => {
                saveHandler()
              }}
            >
              {/* <Link to={`/reviewer`}>
                    Cancel
                </Link> */}
              Save as Draft
            </Button>
            <AddButton
              // variant="outlined"
              disabled={disableButtons || employeeDataIsFetching}
              variant="outlined"
              // disabled={disableSubmit}
              style={{
                height: "35px",
                fontFamily: "Arial",
                textTransform: "none",
                fontSize: "15px",
                // width: "70px",
                backgroundColor: "Transparent",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                ...((disableButtons || employeeDataIsFetching) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                })
              }}
              // style={{
              //     backgroundColor: "Transparent",
              //     fontSize: "15px",
              //     fontWeight: 400,
              //     textTransform: "none",
              //     color: "#3e8cb5",
              //     borderColor: "#3E8CB5",
              //   }}
              //disabled={true}
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
              onClick={() => {
                // rejectionHandler(empData.data.reviewer.rejection_count);

                setnavPrompt(false);
                submitHandler();
                // setnavTrigger(true)

                // updateMutation({
                //     "reviewerIsChecked": true,
                //     "reviewerIsDisabled": true,
                //     "reviewer.reviewer_status": 'rejected',
                //     "appraiserIsDisabled": false,
                //     "appraisal.appraiser_status": "reviewer-rejected",
                //     "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
                //     "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
                //     "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
                //     "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
                //     id: employee_id,
                // })

              }}
            >
              Save and Submit
            </AddButton>
            {/* <Link
        to={`/reviewer`}
        state={{
          from: `${1}`
        }}
      > */}
            <Button
              variant="outlined"
              disabled={disableButtons || employeeDataIsFetching}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                fontWeight: 400,
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                width: "70px",
                fontFamily: "Arial",
                ...((disableButtons || employeeDataIsFetching) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
              }}
              onClick={() => {
                // cancelHandler()
                CancelButtonHandler()
              }}
            >
              {/* <Link to={`/reviewer`}>
                    Cancel
                </Link> */}
              Cancel
            </Button>
          </>
        }
        {/* </Link> */}
        {/* </Link> */}

        {/* <Button
                variant="outlined"
                style={{
                    color: "#008E97",
                    fontSize: "16px",
                    fontWeight: 400,
                    textTransform: "none",
                    borderRadius: "7px",
                }}
            >
                {/* <Link to={`/reviewer`}>
                    Cancel
                </Link> */}
        {/* Save
            </Button>  */}

        <AlertYesNo
          isAlertOpen={openYes}
          handleAlertClose={handleAlertClose}
          handleAlertYes={handleAlertYes}
        // handleAlertYes={handleAlertYes}
        >
          {Message}
        </AlertYesNo>

        {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
        <AlertDialogOkCancelForUnsavedChanges
          isAlertOpen={cancelRatingsAlert}
          handleAlertClose={handleCloseCancelRatingsAlert}
          handleAlertIdClose={handleCancelRatingsAlert}
        >
        </AlertDialogOkCancelForUnsavedChanges>


        <AlertYesNo
          isAlertOpen={openYes1}
          handleAlertClose={handleAlertClose1}
          handleAlertYes={handleAlertYes1}>
          {Message1}
        </AlertYesNo>

        <AlertYesNo
          isAlertOpen={acceptedRatingsAndReject}
          handleAlertClose={handleAcceptedRatingsAndRejectNo}
          handleAlertYes={handleAcceptedRatingsAndRejectYes}>
          {Message}
        </AlertYesNo>

        {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
        <AlertDialogOkCancelForUnsavedChanges
          isAlertOpen={openCancelDialog}
          handleAlertClose={rejectCancelButtonHandler}
          handleAlertIdClose={acceptCancelButtonHandler}
        >
        </AlertDialogOkCancelForUnsavedChanges>


        <AlertYesNo
          isAlertOpen={updatedRejectionReason}
          handleAlertClose={handleUpdatedRejectionReasonNo}
          handleAlertYes={handleUpdatedRejectionReasonYes}>
          {Message}
        </AlertYesNo>

        <AlertDialogSuccess
          isAlertOpen={updateRejectionReasonAlert}
          handleAlertClose={handleUpdateRejectionReasonAlertClose}>
          {Message}
        </AlertDialogSuccess>

        <AlertDialogSuccess
          isAlertOpen={navigateToDashboard}
          handleAlertClose={handleNavigateToDashboard}>
          {Message}
        </AlertDialogSuccess>

        {/* <AlertDialogSuccess
        isAlertOpen={openYes2}
        handleAlertClose={handleAlertClose2}>
        {Message}
      </AlertDialogSuccess> */}
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
        <Dialog
          // fullScreen={fullScreen}
          open={allFeedMandatory}
          onClose={handleAllFeedMandatory}
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
                onClick={handleAllFeedMandatory}
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
      {/* } */}
    </>
    // </Footer>
  );
}

export default Footerbuttons;
