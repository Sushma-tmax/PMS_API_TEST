import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Avatar, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, Popover, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, Tabs, Tab, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAcceptNormalizerMutation, useGetTalentCategoryQuery } from "../../../../service";
import Closeicon from "../../../assets/Images/Closeicon.svg"
import { useNormalizerContext } from "../../../../context/normalizerContext";
import { useGetEmployeeAppraisalQuery } from "../../../../service";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { NORMALIZER_ACCEPTS_PA_INFO, NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Normalizer";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { NORMALIZER_ACCEPTS_PA } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Normalizer";
import { useAcceptNormalizerGradeExceptionMutation } from "../../../../service/employee/appraisal/appraisal";
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


const FooterButtonsN = (props: any) => {
  const classes = useStyles();
  const { setnavPrompt, navPrompt, value, refetch, setValue, handleChange, moveTab, setMoveTab, fetchCancel, employeeData } = props;
  const [acceptNormalizer] = useAcceptNormalizerMutation();
  const { employee_id } = useParams();
  // @ts-ignore
  // const{moveTab, setMoveTab } =useAppraisalContext();
  const [acceptNormalizerGradeException] = useAcceptNormalizerGradeExceptionMutation();
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory , isLoading : talentCategoryIsLoading } = useGetTalentCategoryQuery({ overall_rating: talentRating, potential: talentPotential });

  useGetEmployeeAppraisalQuery(employee_id);
  const navigate = useNavigate();
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  // @ts-ignore
  const { updateMutation, normalizerAreaImprovementComments, normalizerOverallFeedComments, setNormalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerTrainingRecommendationComments, normalizerComments, setNormalizerComments, normalizerReason, setReviewedOverallFeedback, reviewedOverallFeedback, emailData, disableButtons, setDisableButtons } = useNormalizerContext()
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const [isAlertOpen1, setisAlertOpen1] = React.useState(false);
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

  const [message, setmessage] = React.useState('');
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    // setMoveTab(false);
    setmessage('');
    setisAlertOpen1(false);
    navigate(`/normalizer`, { state: { from: `${1}` } });
  };

  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    setmessage('')
  };
  const submitButtonHandler = () => {
    setDisableButtons(true);
    updateMutation({

      "normalizer.normalizer_status": 'draft',
      "appraisal.pa_status": "Pending with HR Normalizer",
      //  "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
      // "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
      // "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,
      // "normalizer.area_of_improvement_comments": normalizerAreaImprovementComments,
      // "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,
      "normalizer.reason_for_rejection": normalizerComments?.trim(),
      "normalizer_previous_submission.reason_for_rejection": normalizerComments?.trim(),

      id: employee_id,
    }).then((res: any) => {
      setMoveTab(false);
      setnavPrompt(false);
      setDisableButtons(false)
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
    })
    // if(normalizerOverallFeedComments == undefined || normalizerOverallFeedComments == null ||normalizerOverallFeedComments =="" ){
    //   setmessage('Please add the rejection reasons in the Overall Feedback.')
    // setAllFeedMandatory1(true)
    // }else{
    // if (moveTab == true) {
    //   setMoveTab(false);
    //   setmessage('Changes were successfully saved.');
    //   setAllFeedMandatory1(true);
    // }
    // else {
    //   setMoveTab(false);
    //   setmessage('No changes were made to save.');
    //   setAllFeedMandatory1(true);
    // } 

    //setmessage('Changes were successfully saved.');
    //setAllFeedMandatory1(true);


    // }
  }
  const moveTabHandler = () => {
    if (moveTab === true) {
      setmessage("Please save the changes before leaving the page.");
      setAllFeedMandatory1(true);

    } else if (moveTab === false) {
      setValue(0);
    }
  }

  console.log(moveTab, "dd")
  console.log(normalizerComments, "jjjjjjjjjj")
  const handleAlertYes = () => {

    setReviewedOverallFeedback(true);
    setisAlertOpen(false);
    setisAlertOpen1(true);
  };

  const formatDate = (date: any) => {
    const day = date ? parseInt(date[2]) : null;
    const month = date ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date)) : null;
    const year = date ? parseInt(date[0]) : null;
    return date ? `${day} ${month} ${year}` : ''
  }


  const handleAlertYes1 = () => {
    let date: any = new Date()
    const normalized_Date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    setisAlertOpen1(false);

    let appraiserName = employeeData?.data?.appraiser_name;
    let normalizerName = employeeData?.data?.normalizer_name;
    let employeeName = employeeData?.data?.first_name;
    let calendarName = employeeData?.data?.calendar?.calendar_type;
    let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
    let Employee_Due_Date = employeeData ? (employeeData?.data?.calendar?.end_date_employee_acknowledgement || '').slice(0, 10).split('-') : '';
    let formatted_Employee_Due_Date = formatDate(Employee_Due_Date);; // Concatenate the parts in the desired format
    let employeeCode = employeeData?.data?.employee_code;
    let employeeFirstName = employeeData?.data?.first_name;

    if (employeeData && employeeData.data.isGradeException == true) {
      acceptNormalizerGradeException({
        id: employee_id,
        talentCategory: talentCategory?.data,
        current_overallRating: employeeData?.data?.current_rating?.overall_rating,
        normalizer_comments: normalizerComments?.trim()
      }).then((res: any) => {
        updateLoggedRole({
          pa_action_by: `Normalizer (Completed) (Grade-Exception) (from Overall Feedback Tab) : ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false);
        setSuccessAlertTrigerMSG("The performance appraisal was normalized and completed.")
        setSuccessAlertTriger(true);
      });
      //setmessage('The performance appraisal was normalized and completed.')
      //setAllFeedMandatory(true);
      //snackbar

      // Normalizer accepts Reviewer PA (for Appraiser/Reviewer) for Grade 6 to 10

      let tempSubjectInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.subject;
      tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

      let tempHtmlInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.html;
      tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

      // tempHtmlInfo = tempHtmlInfo.replace("[dd/mm/yy]", `${dueDate}`);

      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let emailInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.to;
      // const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
      emailInfo = emailInfo?.replace("[email]", `${appraiserEmail}`);
      const ccemail = [`${reviewerEmail}`]
      sendEmailNotification(
        {
          to: emailInfo,
          cc: ccemail,
          subject: tempSubjectInfo,
          html: tempHtmlInfo
        }
      )
    } else {
      let reviewerObjectiveDescription = employeeData?.data?.reviewer?.objective_description
        .map((item: any) => {
          return {
            ...item,
            rejection_reason: ""
          }
        })
      acceptNormalizer({
        id: employee_id,
        current_overallRating: employeeData?.data?.current_rating?.overall_rating,
        reviewerObjectiveDescription: reviewerObjectiveDescription,
        normalized_Date: normalized_Date,
        current_previous_submission: employeeData?.data?.current_rating?.objective_description,
        previous_overall_rating: employeeData?.data?.current_rating?.overall_rating,
        appraisal_previous_rating: employeeData?.data?.appraisal?.objective_description,
        normalized_overallRating: employeeData?.data?.current_rating?.overall_rating,
        normalizer_comments: normalizerComments?.trim()
      }).then((res: any) => {
        updateLoggedRole({
          pa_action_by: `Normalizer (Normalized) (from Overall Feedback Tab) : ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false)
        setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Employee.")
        setSuccessAlertTriger(true)
      });
      // setmessage('The performance appraisal was submitted to the Employee.')
      // setAllFeedMandatory(true);
      //snackbar

      // Notification action to Employee after Normalizer accepts PA (for Employee)
      let tempSubject = NORMALIZER_ACCEPTS_PA?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

      let tempHtml = NORMALIZER_ACCEPTS_PA?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
      tempHtml = tempHtml?.replace("[dd/mm/yy]", `${formatted_Employee_Due_Date}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[Employee FirstName]", `${employeeFirstName}`);

      let employeeEmail = NORMALIZER_ACCEPTS_PA?.to
      let email = employeeData?.data?.email
      email = email?.replace("[email]", `${employeeEmail}`);

      sendEmailNotification(
        {
          to: email,
          subject: tempSubject,
          html: tempHtml
        }
      )

      // Notification info after Normalizer accepts PA (for Appraiser / Reviewer)

      let tempSubjectInfo = NORMALIZER_ACCEPTS_PA_INFO?.subject;
      tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

      let tempHtmlInfo = NORMALIZER_ACCEPTS_PA_INFO?.html;
      tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

      // tempHtmlInfo = tempHtmlInfo.replace("[dd/mm/yy]", `${dueDate}`);

      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let emailInfo = NORMALIZER_ACCEPTS_PA_INFO?.to;
      const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
      emailInfo = emailInfo?.replace("[email]", `${appraiserEmail}`);
      const ccemail = [`${reviewerEmail}`]
      sendEmailNotification(
        {
          to: emailInfo,
          cc: ccemail,
          subject: tempSubjectInfo,
          html: tempHtmlInfo
        }
      )
    }
    setnavPrompt(false);
    setMoveTab(false)
  };
  const handleAlertClose = () => {
    setisAlertOpen(false);
    setValue(1)
    // setRatingAppraiser('')
  };
  const handleAlertClose1 = () => {
    setisAlertOpen1(false);
    setDisableButtons(false)
    // setValue(1)
    // setRatingAppraiser('')
  };
  const submitButtonHandler1 = () => {
    setDisableButtons(true);
    setisAlertOpen1(true);
  }

  useEffect(() => {
    if (employeeData) {
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.current_rating?.overall_rating);
    }
  }, [employeeData])
  return (
    <div>
      <Stack justifyContent="center" spacing={2} direction="row">
        {employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
          <>
            <Button
              disabled={disableButtons || talentCategoryIsLoading}
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
                color: "#3e8cb5",
                height: '35px',
                // width:"70px",
                fontFamily: "arial",
                ...((disableButtons || talentCategoryIsLoading) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),

              }}
              onClick={() => {
                submitButtonHandler();
                setnavPrompt(false)
              }}
            >
              Save as Draft
            </Button>
            <Button
              disabled={disableButtons || talentCategoryIsLoading}
              style={{
                borderRadius: "4px",
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                ...((disableButtons || talentCategoryIsLoading) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
                // width: "70px",
              }}
              variant="outlined"
              onClick={submitButtonHandler1}
            >
              Save and Submit
            </Button>
            <Button
              disabled={disableButtons}
              variant="outlined"
              style={{
                background: "transparent",
                borderColor: "#3e8cb5",
                fontSize: "15px",
                textTransform: "none",
                color: "#3e8cb5",
                height: '35px',
                width: "70px",
                fontFamily: "arial",
                ...((disableButtons) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
                }),
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
            <Button
              disabled={disableButtons}
              variant="outlined"
              style={{
                background: "transparent",
                borderColor: "#3e8cb5",
                fontSize: "15px",
                textTransform: "none",
                color: "#3e8cb5",
                height: '35px',
                width: "70px",
                fontFamily: "arial",
                ...((disableButtons) && {
                  cursor: "not-allowed",
                  borderColor: "#ccc",
                  color: "#ccc",
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
                  // marginRight: "10px",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                  color: "#3e8cb5"
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
                  height: "35px",
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
                  height: "35px",
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
              {/* Are you sure you wish to accept selected performance appraisal?  */}
              Are you sure you wish to accept the performance appraisal?
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
                  height: "35px",
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
                  height: "35px",
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
export default FooterButtonsN