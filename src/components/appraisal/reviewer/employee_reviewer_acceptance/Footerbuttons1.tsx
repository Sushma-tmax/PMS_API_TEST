import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetEmployeeAppraisalQuery,
  useAcceptReviewerEmployeeRejectionMutation,
  useGetTalentCategoryQuery

} from "../../../../service";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import Closeicon from "../../../../assets/Images/Closeicon.svg";
import { IconButton } from "@mui/material";
import AlertYesNo from "../../../UI/DialogYesNo";
import { REVIEWER_ACCEPTS_PA_AFTER_EMPLOYEE_REJECTION } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Reviewer";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { REVIEWER_ACCEPTS_RATING_UPTO_INFO } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Reviewer";
import { makeStyles } from "@mui/styles";
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
  height: "35px",
  width: "70px",
  fontWeight: 400,

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
// const checkboxHandler = (event: any) => {
//     console.log(event.target.value);
//   };





const FooterButoons1 = (props: any) => {
  const classes = useStyles();
  const { setnavPrompt, navPrompt, handleChange, value1, setValue1, moveTab, setMoveTab } = props;
  // const { updateMutation, employee_id, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments } = useReviewerContext()
  //@ts-ignore
  const { updateMutation, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments, reviewedOverallFeedback, setReviewedOverallFeedback, emailData, reviewerComments } = useReviewerContext()

  const { employee_id } = useParams();
  const { data: employeeData } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(employee_id, 'paramsid')
  const [acceptReviewer] = useAcceptReviewerEmployeeRejectionMutation();
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [zeroselect, setzeroselect] = React.useState(false);
  const [opendialog, setOpendialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);

  const [zeroselectApprove, setzeroselectApprove] = React.useState(false);
  const [errorApprove, seterrorApprove] = React.useState(false);
  const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
  const [approved, setApproved] = React.useState(false);
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory } = useGetTalentCategoryQuery({ overall_rating: talentRating, potential: talentPotential });
  const [open1, setOpen1] = React.useState(false);
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
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

  console.log(users, "users");
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData.data);
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.current_rating?.overall_rating)
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
    setValue1(0);
  };
  // const rejectHandler = () => {
  // const rejectfilter = users.filter((i: any) => {
  //   return i.reviewerIsChecked === true && i.reviewerIsDisabled === false;
  // });
  // const reviewerValue = rejectfilter.map(
  //   (j: any) => j.reviewer.reviewer_status
  // )[0];

  //   if (rejectfilter.length > 1) {
  //       setError(true);
  //       setOpenAlert(true);
  //     }else if (
  //       (rejectfilter.length === 1 && reviewerValue === "pending") ||
  //       reviewerValue === "draft"
  //     ){
  //      return ( setError(false),
  //   setOpenAlert(false),
  //   setzeroselect(false),
  //   handleDialogOpen(),
  //   setcheckedEmployeeid(() => {
  //       return rejectfilter.map((j: any) => j._id);
  //     })
  //      );
  //     }else if (rejectfilter.length === 0) {
  //       setzeroselect(true);
  //       setOpenAlert(true);
  //     }
  // }
  // const checkboxIdHandler = (res: any) => {
  //   if (res) {
  //     const check = res?.map((i: any) => {
  //       return i?._id;
  //     });
  //     console.log(check, "check");
  //     return check;
  //   }
  // };
  // const checkboxHandler = (checkbox: any) => {
  //   if (checkbox) {
  //     const res = checkbox?.filter((i: any) => {
  //       return i?.reviewerIsChecked === true && !i?.reviewerIsDisabled;
  //     });
  //     return res;
  //   }
  // };
  // const approvedSuccessfully = () => {
  //   return setApproved(true),
  //   setOpen1(true);
  // };
  // const handleApprove = () => {
  //   const rejectfilter = users.filter((i: any) => {
  //     return i.reviewerIsChecked === true && i.reviewerIsDisabled === false;
  //   });
  //   console.log(rejectfilter,"rejectfilter")
  //   if (rejectfilter.length > 1) {
  //     seterrorApprove(true);
  //     setOpenAlert(true);
  //   } else if (rejectfilter.length === 0) {
  //     setzeroselectApprove(true);
  //     setOpenAlert(true);
  //   } else {
  //     return (
  //       acceptReviewer({
  //         id: checkboxIdHandler(checkboxHandler(users)),
  //       }),
  //       approvedSuccessfully()
  //     );
  //   }
  // };
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [message1, setmessage1] = React.useState('');

  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    setOpenYes1(false);
    setmessage1("");
    navigate(`/reviewer`, { state: { from: `${1}` } });
  };
  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
  };

  const submithandler = () => {
    setOpenYes1(true);
    setmessage1('Are you sure you wish to accept the performance appraisal?')
  }
  // The performance appraisal has been submitted successfully to Normalizer.
  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setOpenYes(false);
    setOpenYes1(true);
    //  acceptReviewer({
    //   id: employee_id
    // })
    setmessage1('Are you sure you wish to accept the performance appraisal?')
    // setmessage1('Are you sure you wish to accept selected performance appraisal?')
    // setAllFeedMandatory(true);
    // setdisableSubmit(true);
    // setnavPrompt(false);
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
        //  setAllFeedMandatory(true);
        // changed as per 4/27/2023
        //  setmessage('The overall rating was auto-renormalized. The performance appraisal is completed.')
        //snackbar
        setSuccessAlertTrigerMSG("The overall rating was auto-renormalized. The performance appraisal is completed.")
        setSuccessAlertTriger(true)
      } else {
        // setAllFeedMandatory(true);
        // changed as per 5/4/2023
        // setmessage('The performance appraisal has been submitted to the HR Normalizer for re-normalization. The Employee’s overall PA rating changed after the PA meeting by more than 0.3 and must be re-normalized by the HR Normalizer.')
        //snackbar
        setSuccessAlertTrigerMSG("The performance appraisal has been submitted to the HR Normalizer for re-normalization. The Employee’s overall PA rating changed after the PA meeting by more than 0.3 and must be re-normalized by the HR Normalizer.")
        setSuccessAlertTriger(true)
      }
      // setmessage('The performance appraisal has been submitted successfully to Normalizer.')
      // setAllFeedMandatory(true);
      setdisableSubmit(true);
      setnavPrompt(false);

      let appraiserName = empData?.data?.appraiser_name;
      let reviewerName = empData?.data?.reviewer_name;
      let normalizername = empData?.data?.normalizer_name;
      let employeeName = empData?.data?.first_name;
      let calendarName = empData?.data?.calendar?.calendar_type;
      let calendarYear = empData?.data?.calendar?.start_date?.slice(0, 4);
      let dueDate = empData?.data?.calendar?.end_date_employee_acknowledgement?.slice(0, 10)
      let previousRating = employeeData?.data?.normalizer?.normalizer_rating;
      let newRating = employeeData?.data?.current_rating?.overall_rating;
      let employeeCode = employeeData?.data?.employee_code;
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
        let emailInfo = REVIEWER_ACCEPTS_RATING_UPTO_INFO?.to;
        const recipientEmails = [`${appraiserEmailInfo}`, `${normalizerEmailInfo}`]
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
    }).then((res:any) => {
      updateLoggedRole({
        pa_action_by: `Reviewer (Accepted) (from Rating Tab) : ${new Date()}`,
        id: employee_id
      });
    } )
  }


   

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
  const handleCloseAlert = () => {
    setOpenAlert(false);
    setError(false);
    setzeroselectApprove(false);
    seterrorApprove(false);
    setzeroselect(false);
  };

  const saveHandler = () => {
    updateMutation({

      "reviewer.reviewer_status": 'draft',
      "appraisal.pa_status": "Pending with Reviewer (Employee Rejection)",
      //  "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
      // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
      "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
      // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
      id: employee_id,
    })
    //setmessage('Changes were successfully saved.')
    // if (moveTab == true) {
    //   setAllFeedMandatory2(true);
    //   setmessage("Changes were successfully saved.");
    //   setnavPrompt(false);
    // } else {
    //   setAllFeedMandatory2(true);
    //   setmessage("No changes were made to save.");
    //   setnavPrompt(false);
    // }

    //setAllFeedMandatory2(true);
    //setmessage("Changes were successfully saved.");
    setnavPrompt(false);
    //new alert 
    setSuccessAlertTrigerMSG("Changes were successfully saved.")
    setSuccessAlertTriger(true)
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
                background: "transparent",
                height: "35px",
                width: "70px",
                color: "#3e8cb5",
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

      <Stack justifyContent="center" spacing={2} paddingTop="30px" direction="row">

        {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer") && (
          <>
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
                //  width: "150px"
              }}
              onClick={() => {
                // saveRecommendationsHandler();
                // handleBackButton();
                saveHandler()
              }}
            >
              {/* <Link to={`/reviewer`}> */}
              Save as Draft
              {/* </Link> */}

            </Button>
            <AddButton
              // variant="outlined"
              variant="outlined"
              disabled={disableSubmit}
              style={{
                backgroundColor: "Transparent",
                fontSize: "15px",
                fontWeight: 400,
                textTransform: "none",
                color: "#3e8cb5",
                borderColor: "#3E8CB5",
                height: "35px",
                width: "155px",
                fontFamily: "arial"
              }}
              onClick={() => {
                // handleApprove();
                // approvedSuccessfully()
                // handleClickOpen1();
                // setnavPrompt(false)
                // setnavTrigger(true)
                // return (
                //       acceptReviewer({
                //         id: checkboxIdHandler(checkboxHandler(users)),
                //       }),
                //       approvedSuccessfully()
                //     );
                submithandler()
              }}
            >
              Save and Submit
            </AddButton>
            <Link
              to={`/reviewer`}
              state={{
                from: `${1}`
              }}
            >
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
              // onClick={() => {
              //   // saveRecommendationsHandler();
              //   // handleBackButton();
              //   saveHandler()
              // }}
              >
                {/* <Link to={`/reviewer`}> */}
                Cancel
                {/* </Link> */}

              </Button>
            </Link>

          </>
        )}
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
                color: "#3e8cb5",
              }}
              variant="outlined"
              autoFocus
              onClick={handleAllFeedMandatory2}
            >
              Ok
            </Button>

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
export default FooterButoons1