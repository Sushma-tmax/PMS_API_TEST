import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetEmployeeAppraisalQuery,
  useGetTalentCategoryQuery,
  useAcceptReviewerEmployeeRejectionMutation

} from "../../../../service";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import Closeicon from "../../../../assets/Images/Closeicon.svg";
import { IconButton } from "@mui/material";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { REVIEWER_ACCEPTS_RATING_UPTO_INFO } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Reviewer";
import AlertYesNo from "../../../UI/DialogYesNo";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { REVIEWER_ACCEPTS_PA_AFTER_EMPLOYEE_REJECTION } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Reviewer";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
// const checkboxHandler = (event: any) => {
//     console.log(event.target.value);
//   };

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



const FooterButtonsRecommendation = (props: any) => {
  const classes = useStyles();
  const { setnavPrompt, navPrompt, value1, setValue1, moveTab, setMoveTab, handleChange, fetchCancel } = props;
  // const { updateMutation, employee_id, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments } = useReviewerContext()
  //@ts-ignore
  const { updateMutation, empData, reviewerOverallFeedComments, setReviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerComments, setReviewerComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments, reviewedOverallFeedback, setReviewedOverallFeedback, emailData } = useReviewerContext()
  const { employee_id } = useParams();
  const { data: employeeData } =
    useGetEmployeeAppraisalQuery(employee_id);
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory } = useGetTalentCategoryQuery({ overall_rating: talentRating, potential: talentPotential });

  const [acceptReviewer] = useAcceptReviewerEmployeeRejectionMutation();
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [zeroselect, setzeroselect] = React.useState(false);
  const [opendialog, setOpendialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openOk, setOpenOk] = useState(false);
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");

  const [zeroselectApprove, setzeroselectApprove] = React.useState(false);
  const [errorApprove, seterrorApprove] = React.useState(false);
  const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
  const [approved, setApproved] = React.useState(false);

  const [open1, setOpen1] = React.useState(false);
  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);

  // refetch
  const CancelButtonHandler = () => {
    if (navPrompt || moveTab) {
      setOpenCancelDialog(true);
    } else {
      setOpenCancelDialog(false);
      setValue1(0);
    }
  }

  const rejectCancelButtonHandler = () => {
    setOpenCancelDialog(false);
  }
  const acceptCancelButtonHandler = () => {

    setMoveTab(false);
    setnavPrompt(false);
    setValue1(0);
    setOpenCancelDialog(false);
    fetchCancel();
  }
  console.log(users, "users");
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData.data);
    }
  }, [employeeData]);
  const navigate = useNavigate();
  const updateRejectionCount = (count: any) => {

    if (count === 0 || count === undefined) {
      return 1;
    } else if (count === 1) {
      return 2;
    } else if (count === 2) {
      return 3;
    }
  }
  const handleDialogOpen = () => {
    setOpendialog(true);
  };

  const handleDialogClose = () => {
    setOpendialog(false);
    setIsOpen(false);
  };

  const handleDialogNo = () => {
    setOpendialog(false);
    setIsOpen(true);
  };
  const handleBackButton = () => {
    if (moveTab === true) {
      setOpenOk(true);
      setMessage("Please save the changes before leaving the page.")
    }
    else {
      setValue1(0);
    }
  };
  // const RatingHandler = () => { 
  //   setReviewerOverallFeedComments(reviewerOverallFeedComments)
  //   setMoveTab(false)
  //   setValue1(0);
  // }
  console.log(reviewerOverallFeedComments, "reviewerOverallFeedComments")
  const handleAlertClose = () => {
    setOpenOk(false);
    setMessage("")
  }

  // const handleAlertYes = () => {
  //   setOpenYes(false);
  //   setAllFeedMandatory(true);
  //   updateMutation({
  //       "reviewer.reviewer_status": 'Draft',
  //       "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
  //       "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
  //       "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
  //       "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
  //       id: employee_id,
  //     })    
  //     setnavPrompt(false);
  // }

  // const handleAlertNo = () => {
  //   setOpenYes(false);
  //   setValue1(0);
  // }

  const rejectHandler = () => {
    const rejectfilter = users.filter((i: any) => {
      return i.reviewerIsChecked === true && i.reviewerIsDisabled === false;
    });
    const reviewerValue = rejectfilter.map(
      (j: any) => j.reviewer.reviewer_status
    )[0];

    if (rejectfilter.length > 1) {
      setError(true);
      setOpenAlert(true);
    } else if (
      (rejectfilter.length === 1 && reviewerValue === "pending") ||
      reviewerValue === "draft"
    ) {
      return (setError(false),
        setOpenAlert(false),
        setzeroselect(false),
        handleDialogOpen(),
        setcheckedEmployeeid(() => {
          return rejectfilter.map((j: any) => j._id);
        })
      );
    } else if (rejectfilter.length === 0) {
      setzeroselect(true);
      setOpenAlert(true);
    }
  }
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      // setUsers(employeeData.data);
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.current_rating?.overall_rating)
    }
  }, [employeeData]);
  const checkboxIdHandler = (res: any) => {
    if (res) {
      const check = res?.map((i: any) => {
        return i?._id;
      });
      console.log(check, "check");
      return check;
    }
  };
  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox?.filter((i: any) => {
        return i?.reviewerIsChecked === true && !i?.reviewerIsDisabled;
      });
      return res;
    }
  };
  const approvedSuccessfully = () => {
    return setApproved(true),
      setOpen1(true);
  };
  const handleApprove = () => {
    const rejectfilter = users.filter((i: any) => {
      return i.reviewerIsChecked === true && i.reviewerIsDisabled === false;
    });
    console.log(rejectfilter, "rejectfilter")
    if (rejectfilter.length > 1) {
      seterrorApprove(true);
      setOpenAlert(true);
    } else if (rejectfilter.length === 0) {
      setzeroselectApprove(true);
      setOpenAlert(true);
    } else {
      return (
        acceptReviewer({
          id: checkboxIdHandler(checkboxHandler(users)),
        }),
        approvedSuccessfully()
      );
    }
  };

  // const handleApprove = () =>{
  //     acceptReviewer({
  //         id: checkboxIdHandler(checkboxHandler(users))
  //     })
  // }
  const handleCloseAlert = () => {
    setOpenAlert(false);
    setError(false);
    setzeroselectApprove(false);
    seterrorApprove(false);
    setzeroselect(false);
  };
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);

  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    setMessage("")
  };
  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
    setOpenYes1(false);
    setMessage1("");
    navigate(`/reviewer`, { state: { from: `${1}` } });
  };
  const saveHandler = () => {

    // setOpenYes(true);
    // setMessage("Did you review the recommendations ?")
    updateMutation({
      "reviewer.reviewer_status": 'draft',
      "appraisal.pa_status": "Pending with Reviewer (Employee Rejection)",
      // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
      // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
      "reviewer.reviewer_comments_draft": reviewerComments?.trim(),
      // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
      id: employee_id,
    })
    // if(reviewerOverallFeedComments == undefined || reviewerOverallFeedComments == null || reviewerOverallFeedComments =="" ){
    //   setMessage1('Please add the rejection reasons in the Overall Feedback.')
    //   setAllFeedMandatory(true);
    // }else{
    // if (moveTab == true) {
    //   setMoveTab(false);
    //   setMessage1('Changes were successfully saved.')
    //   setAllFeedMandatory(true);
    // } else {
    //   setMoveTab(false);
    //   setMessage1('No changes were made to save.')
    //   setAllFeedMandatory(true);
    // }
    setMoveTab(false);
    //setMessage1('Changes were successfully saved.')
    //setAllFeedMandatory(true);
    setnavPrompt(false);
    // }
    //new alert 
    setSuccessAlertTrigerMSG("Changes were successfully saved.")
    setSuccessAlertTriger(true)
  }
  const RatingHandler = () => {
    setReviewerOverallFeedComments(reviewerOverallFeedComments)
    setMoveTab(false)
    setValue1(0);
  }
  console.log(reviewerOverallFeedComments, "jjjjjjjjjj")
  const handleAlertNo = () => {
    setOpenYes(false);
    console.log(value1, 'valueeeeee')
    setValue1(1)
  }
  const handleAlertNo1 = () => {
    setOpenYes1(false);
    console.log(value1, 'valueeeeee')
    // setValue1(1)
  }
  const submithandler = () => {
    setOpenYes1(true);
    setMessage1('Are you sure you wish to accept the performance appraisal?')
  }

  const handleSubmitPA = () => {
    let appraisal_objective_description = employeeData?.data?.appraisal?.objective_description?.map((item: any) => {
      return {
        ...item,
        rating_rejected: false
      }
    })
    setOpenYes1(false);
    acceptReviewer({
      id: employee_id,
      current_previous_submission: employeeData?.data?.current_rating?.objective_description,
      current_overallRating: employeeData?.data?.current_rating?.overall_rating,
      appraisal_previous_submission: employeeData?.data?.appraisal?.objective_description,
      talentCategory: talentCategory?.data,
      appraisal_objective_description: appraisal_objective_description,
      reviewer_comments: reviewerComments?.trim(),
      reviewer_comments_draft: reviewerComments?.trim(),
    }).then((res: any) => {
      if (Math.abs(employeeData?.data?.current_rating?.overall_rating - employeeData?.data?.normalizer.normalized_overallRating) <= 0.3) {
        //  setAllFeedMandatory2(true);
        // changed as per 4/27/2023
        //   setMessage('The overall rating was auto-renormalized. The performance appraisal is completed.')
        //snackbar
        setSuccessAlertTrigerMSG("The overall rating was auto-renormalized. The performance appraisal is completed.")
        setSuccessAlertTriger(true)
      } else {
        // setAllFeedMandatory2(true);
        // changed as per 5/4/2023
        //  setMessage('The performance appraisal has been submitted to the HR Normalizer for re-normalization. The Employee’s overall PA rating changed after the PA meeting by more than 0.3 and must be re-normalized by the HR Normalizer.')
        setSuccessAlertTrigerMSG("The performance appraisal has been submitted to the HR Normalizer for re-normalization. The Employee’s overall PA rating changed after the PA meeting by more than 0.3 and must be re-normalized by the HR Normalizer.")
        setSuccessAlertTriger(true)
      }
      // setmessage('The performance appraisal has been submitted successfully to Normalizer.')
      // setAllFeedMandatory(true);
      // setdisableSubmit(true);
      setnavPrompt(false);
      setMoveTab(false);

      let appraiserName = empData?.data?.appraiser_name;
      let reviewerName = empData?.data?.reviewer_name;
      let normalizername = empData?.data?.normalizer_name;
      let employeeName = empData?.data?.first_name;
      let calendarName = empData?.data?.calendar?.calendar_type;
      let calendarYear = empData?.data?.calendar?.start_date?.slice(0, 4);
      let dueDate = empData?.data?.calendar?.end_date_employee_acknowledgement?.slice(0, 10)
      let previousRating = employeeData?.data?.normalizer?.normalizer_rating;
      let newRating = employeeData?.data?.current_rating?.overall_rating;
      let employeeCode = employeeData?.data?.employee_code
      let normalizerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.firstName;
      let employeeFirstName = employeeData?.data?.first_name;
      let employeeEmail = employeeData?.data?.email;

      if (Math.abs(employeeData?.data?.current_rating?.overall_rating - employeeData?.data?.normalizer.normalized_overallRating) <= 0.3) {
        //// Notification info Reviewer accepts Employee rejected PA (overall rating is upto 0.3) (for Employee)
        let tempSubjectInfo = REVIEWER_ACCEPTS_RATING_UPTO_INFO?.subject;
        tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
        tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
        tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
        tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

        let tempHtmlInfo = REVIEWER_ACCEPTS_RATING_UPTO_INFO?.html;
        tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
        tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
        tempHtmlInfo = tempHtmlInfo?.replace("[Reviewer name]", `${reviewerName}`);
        tempHtmlInfo = tempHtmlInfo?.replace("[previous rating]", `${previousRating}`);
        tempHtmlInfo = tempHtmlInfo?.replace("[new rating]", `${newRating}`);
        tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
        tempHtmlInfo = tempHtmlInfo?.replace("[Employee FirstName]", `${employeeFirstName}`);
        tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

        let appraiserEmailInfo = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.appraiser_code)?.email
        let normalizerEmailInfo = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.normalizer_code)?.email
        const recipientEmails = [`${appraiserEmailInfo}`, `${normalizerEmailInfo}`]
        let emailInfo = REVIEWER_ACCEPTS_RATING_UPTO_INFO?.to;
        emailInfo = emailInfo?.replace("[email]", `${employeeEmail}`);

        sendEmailNotification(
          {
            to: emailInfo,
            cc: recipientEmails,
            subject: tempSubjectInfo,
            html: tempHtmlInfo
          }
        )
      } else {
        // Notification action Reviewer accepts Employee rejected PA (overall rating difference greater than 0.3) (for Normalizer)
        let tempSubject = REVIEWER_ACCEPTS_PA_AFTER_EMPLOYEE_REJECTION?.subject;
        tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
        tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
        tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
        tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

        let tempHtml = REVIEWER_ACCEPTS_PA_AFTER_EMPLOYEE_REJECTION?.html;
        tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
        tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
        tempHtml = tempHtml?.replace("[Reviewer name]", `${reviewerName}`);
        tempHtml = tempHtml?.replace("[Normalizer FirstName]", `${normalizerFirstName}`);
        tempHtml = tempHtml?.replace("[previous rating]", `${previousRating}`);
        tempHtml = tempHtml?.replace("[new rating]", `${newRating}`);
        tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
        tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
        tempHtml = tempHtml?.replace("[Employee FirstName]", `${employeeFirstName}`);

        let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === empData?.data?.normalizer_code)?.email
        let email = REVIEWER_ACCEPTS_PA_AFTER_EMPLOYEE_REJECTION?.to;
        email = email?.replace("[email]", `${normalizerEmail}`);

        sendEmailNotification(
          {
            to: email,
            subject: tempSubject,
            html: tempHtml
          }
        )
      }

      updateLoggedRole({
        pa_action_by: `Reviewer (Accepted)(from Overall Feedback Tab) : ${new Date()}`,
        id: employee_id
      })
    })
  }


  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setOpenYes(false);
    setOpenYes1(true);
    //  acceptReviewer({
    //   id: employee_id
    // })
    setMessage1('Are you sure you wish to accept the performance appraisal?')
    // setmessage1('Are you sure you wish to accept selected performance appraisal?')
    // setAllFeedMandatory(true);
    // setdisableSubmit(true);
    // setnavPrompt(false);
  }
  return (
    <div>
      {approved && (
        <Dialog
          open={open1}
          //   onClose={handleClose}
          // aria-labelledby="responsive-dialog-title"
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
        >
          <DialogContent>
            <DialogContentText
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
            >Approved successfully.</DialogContentText>
          </DialogContent>
        </Dialog>
      )}

      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText
            style={{
              fontFamily: "Arial",
            }}
          >
            {error && (
              // <Alert severity="error">
              <div>
                Multiple employees cannot be rejected - select one employee.
              </div>
              // </Alert>
            )}
            {zeroselect && (
              // <Alert severity="error">
              <div>
                {" "}
                Atleast one employees should be selected - select one
                employee.
              </div>

              // </Alert>
            )}
            {errorApprove && (
              <div>
                Multiple employees cannot be rejected - select one employee.
              </div>
            )}
            {zeroselectApprove && (
              <div>
                {" "}
                Atleast one employees should be selected - select one
                employee.
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <div style={{ alignItems: "center" }}>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                background: "transparent",
                height: "35px",
                width: "70px"
              }}
              variant="outlined"
              autoFocus
              onClick={handleCloseAlert}
            >
              Ok
            </Button>
          </DialogActions>
        </div>   

      </Dialog>

      <Stack justifyContent="center" spacing={2} direction="row">
        { employeeData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer") &&
          <>
            <Button
              // variant="outlined"
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
                // width: "70px"
              }}
              onClick={() => {
                saveHandler();
                // handleApprove();
                // approvedSuccessfully()
                // handleClickOpen1();
                setnavPrompt(false);
                // setnavTrigger(true)
                // return (
                //       acceptReviewer({
                //         id: checkboxIdHandler(checkboxHandler(users)),
                //       }),
                //       approvedSuccessfully()
                //     );
              }}
            >
              Save as Draft
            </Button>
            <Button
              // variant="outlined"
              variant="outlined"
              // disabled={disableSubmit}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                fontWeight: 400,
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                fontFamily: "arial"
                // width: "70px"
              }}
              onClick={() => {
                submithandler()
              }}
            >
              Save and Submit
            </Button>
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
                width: "70px",
                fontFamily: "arial"
              }}
              onClick={() => {
                // saveRecommendationsHandler();
                handleBackButton();
              }}
            >
              Back
            </Button>
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
                width: "70px",
                fontFamily: "arial"
              }}
              onClick={() => {
                CancelButtonHandler();
              }}
            >

              Cancel


            </Button>
          </>
        }

        <AlertDialogSuccess
          isAlertOpen={openOk}
          handleAlertClose={handleAlertClose}>
          {message}
        </AlertDialogSuccess>

        {/* <AlertYesNo
         isAlertOpen = {openYes}
         handleAlertClose = {handleAlertNo}
         handleAlertYes = {handleAlertYes}
        >
         
        </AlertYesNo> */}
        <AlertYesNo
          isAlertOpen={openYes}
          handleAlertClose={handleAlertNo}
          handleAlertYes={handleAlertYes}
        // handleAlertYes={handleAlertYes}
        >
          {message}
        </AlertYesNo>

        <AlertYesNo
          isAlertOpen={openYes1}
          handleAlertClose={handleAlertNo1}
          handleAlertYes={handleSubmitPA}>
          {message1}
        </AlertYesNo>

        {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
        <AlertDialogOkCancelForUnsavedChanges
          isAlertOpen={openCancelDialog}
          handleAlertClose={rejectCancelButtonHandler}
          handleAlertIdClose={acceptCancelButtonHandler}
        >
        </AlertDialogOkCancelForUnsavedChanges>


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
                onClick={handleAllFeedMandatory2}
              >
                Ok
              </Button>
            </Link>
          </DialogActions>
        </Dialog>

      </Stack>
      <Snackbar
        className={classes.customSnackbar}
        open={successAlertTriger}
        autoHideDuration={2000}
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
    </div>
  )
}
export default FooterButtonsRecommendation;