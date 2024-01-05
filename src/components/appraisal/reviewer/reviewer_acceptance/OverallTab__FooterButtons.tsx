import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetEmployeeAppraisalQuery,
  useAcceptReviewerMutation

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
import AlertYesNo from "../../../UI/DialogYesNo";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { REVIEWER_ACCEPTS_PA, REVIEWER_ACCEPTS_PA_AFTER_NORMALIZER_REJECTION } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Reviewer";
import { REVIEWER_ACCEPTS_PA_INFO } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Reviewer";
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
  //@ts-ignore
  const { updateMutation, empData, reviewerOverallFeedComments, setReviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerComments, setReviewerComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments, reviewedOverallFeedback, setReviewedOverallFeedback, emailData, disableButtons, setDisableButtons } = useReviewerContext()
  const { employee_id } = useParams();
  const navigate = useNavigate();
  const { data: employeeData } = useGetEmployeeAppraisalQuery(employee_id);
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [acceptReviewer] = useAcceptReviewerMutation();
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
  const [approved, setApproved] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
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
    fetchCancel();
    setOpenCancelDialog(false);
    setMoveTab(false);
    setnavPrompt(false);
    setValue1(0);
  }

  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData.data);
    }
  }, [employeeData]);

  const handleBackButton = () => {
    if (moveTab === true) {
      setOpenOk(true);
      setMessage("Please save the changes before leaving the page.")
    }
    else {
      setValue1(0);
    }
  };

  const handleAlertClose = () => {
    setOpenOk(false);
    setMessage("")
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setError(false);
    setzeroselectApprove(false);
    seterrorApprove(false);
    setzeroselect(false);
  };

  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    setMessage1("")
  };
  const handleAllFeedMandatory1 = () => {
    navigate(`/reviewer`, { state: { from: `${1}` } });
    setAllFeedMandatory1(false);
    setOpenYes1(false);
    setMessage1("");
  };

  const submithandler = () => {
    setDisableButtons(true);
    setOpenYes1(true);
    setMessage1('Are you sure you wish to accept the performance appraisal?')
  }

  const saveHandler = () => {
    setDisableButtons(true);
    updateMutation({
      "reviewer.reviewer_status": 'draft',
      "appraisal.pa_status": "Pending with Reviewer",
      "reviewer.reviewer_comments_draft": reviewerComments?.trim(),
      id: employee_id,
    }).then((res: any) => {
      setMoveTab(false);
      setnavPrompt(false);
      //new alert 
      setDisableButtons(false);
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true);

    })

    // }
  }

  const handleAlertNo = () => {
    setOpenYes(false);
    console.log(value1, 'valueeeeee')
    setValue1(1)
  }

  const handleAlertNo1 = () => {
    setOpenYes1(false);
    setDisableButtons(false);
    console.log(value1, 'valueeeeee')
    // setValue1(1)
  }

  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setOpenYes(false);
    setOpenYes1(true);
    setMessage1('Are you sure you wish to accept the performance appraisal?')
  }

  const handleSubmitPA = () => {
    let appraisal_objective_description = employeeData?.data?.appraisal?.objective_description
      .map((item: any) => {
        return {
          ...item,
          rating_rejected: false,
          rating_accepted: false
        }
      })
    acceptReviewer({
      appraisal_objective_description: appraisal_objective_description,
      current_overallRating: employeeData?.data?.current_rating?.overall_rating,
      current_previous_submission: employeeData?.data?.current_rating?.objective_description,
      // "appraisal.appraiser_rejection_reason" : "",
      id: employee_id,
    });
    updateMutation({
      "appraisal.appraiser_rejection_reason": "",
      "reviewer.reviewer_comments_draft": reviewerComments?.trim(),
      "reviewer.reviewer_comments": reviewerComments?.trim(),
      "reviewer_previous_submission.reviewer_comments" : reviewerComments?.trim(),
      id: employee_id,
    }).then((res: any) => {
      updateLoggedRole({
        pa_action_by: `Reviewer (Accepted) (from Overall Feedback Tab): ${new Date()}`,
        id: employee_id
      });
      setOpenYes1(false);
      setSuccessAlertTrigerMSG("The performance appraisal was submitted to the HR Normalizer.")
      setSuccessAlertTriger(true)
      setdisableSubmit(true);
      setDisableButtons(false);
      setnavPrompt(false);
      setMoveTab(false);
    })
    //snackbar


    let reviewerName = employeeData?.data?.reviewer_name;
    let normalizerName = employeeData?.data?.normalizer_name;
    let employeeName = employeeData?.data?.first_name;
    let calendarName = employeeData?.data?.calendar?.calendar_type;
    let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4)
    let employeeCode = employeeData?.data?.employee_code
    let appraiserFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.firstName;
    let normalizerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.firstName;

    if (employeeData?.data?.normalizer?.normalizer_PA_rejected == true) {
      /**Notification action after Reviewer accepts PA after Normalizer rejection (for Normalizer)  */
      let tempSubject = REVIEWER_ACCEPTS_PA_AFTER_NORMALIZER_REJECTION?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

      let tempHtml = REVIEWER_ACCEPTS_PA_AFTER_NORMALIZER_REJECTION?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[Normalizer FirstName]", `${normalizerFirstName}`);

      let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email
      let email = REVIEWER_ACCEPTS_PA_AFTER_NORMALIZER_REJECTION?.to;
      email = email?.replace("[email]", `${normalizerEmail}`);

      sendEmailNotification(
        {
          to: email,
          subject: tempSubject,
          html: tempHtml
        }
      )
    } else {
      /**Notification action after Reviewer accepts PA (for Normalizer) */
      let tempSubject = REVIEWER_ACCEPTS_PA?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

      let tempHtml = REVIEWER_ACCEPTS_PA?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[Reviewer name]", `${reviewerName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[Normalizer FirstName]", `${normalizerFirstName}`);

      let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email
      let email = REVIEWER_ACCEPTS_PA?.to;
      email = email?.replace("[email]", `${normalizerEmail}`);

      sendEmailNotification(
        {
          to: email,
          subject: tempSubject,
          html: tempHtml
        }
      )
    }


    /**Notification info after Reviewer accepts PA (for Appraiser) */
    let tempSubjectInfo = REVIEWER_ACCEPTS_PA_INFO?.subject;
    tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

    let tempHtmlInfo = REVIEWER_ACCEPTS_PA_INFO?.html;
    tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[Reviewer name]", `${reviewerName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[Appraiser FirstName]", `${appraiserFirstName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

    let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
    let emailInfo = REVIEWER_ACCEPTS_PA_INFO?.to;
    emailInfo = emailInfo?.replace("[email]", `${appraiserEmail}`);

    sendEmailNotification(
      {
        to: emailInfo,
        subject: tempSubjectInfo,
        html: tempHtmlInfo
      }
    )
  }

  return (
    <div>
      {approved && (
        <Dialog
          open={open1}
          PaperProps={{
            style: {
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",
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
        {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer") &&
          <>
            <Button
              // variant="outlined"
              disabled={disableButtons}
              variant="outlined"
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                fontWeight: 400,
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                fontFamily: "arial",
                ...((disableButtons) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
                // width: "70px"
              }}
              onClick={() => {
                saveHandler();
                setnavPrompt(false);
              }}
            >
              Save as Draft
            </Button>
            <Button
              // variant="outlined"
              variant="outlined"
              disabled={disableButtons || disableSubmit}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                fontWeight: 400,
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                width: "155px",
                fontFamily: "arial",
                ...((disableButtons) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
              }}
              onClick={() => {
                submithandler()
              }}
            >
              Save and Submit
            </Button>
            <Button
              disabled={disableButtons}
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
                fontFamily: "arial",
                ...((disableButtons) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
              }}
              onClick={() => {
                handleBackButton();
              }}
            >
              Back
            </Button>
            <Button
              disabled={disableButtons}
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
                fontFamily: "arial",
                ...((disableButtons) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
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
          handleAlertClose={handleAlertNo}
          handleAlertYes={handleAlertYes}
        >
          {message}
        </AlertYesNo>

        <AlertYesNo
          isAlertOpen={openYes1}
          handleAlertClose={handleAlertNo1}
          handleAlertYes={handleSubmitPA}>
          {message1}
        </AlertYesNo>
        <Dialog
          open={allFeedMandatory}
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
      </Stack>
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
    </div>
  )
}
export default FooterButtonsRecommendation;