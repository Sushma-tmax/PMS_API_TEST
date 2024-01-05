import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Snackbar, Alert } from "@mui/material";
import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import { Link, useNavigate } from "react-router-dom";
import { useAppraiserAcceptNormalizerMutation, useCreateEmployeeAppraisalMutation, useGetEmployeeAppraisalQuery } from "../../../../service/employee/appraisal/appraisal";
import { AlertAcceptDialog } from "../../..";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import { useAttachmentsAppraiserMutation } from "../../../../service/employee/appraisal/appraisal";
import { useUpdateEmployeeAppraisalMutation } from "../../../../service/employee/appraisal/appraisal";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import { useNormalizerContext } from "../../../../context/normalizerContext";
import AlertYesNo from "../../../UI/DialogYesNo";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import { APPRAISER_RESUBMITS_REVIEWER_REJECTION, APPRAISER_RESUBMITS_NORMALIZER_REJECTION } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Appraiser";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
// import { useAppraiserRejectsNormalizerContext } from "../../../context/AppraiserRejectsNormalizer";
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
  //@ts-ignore
  const { updateMutation, otherRecommendation, appraiserOverallFeedback, emailData, OtherRecommendationothers, otherscheckbox, checkboxIdHandler, checkboxHandler, employee_id, trainingRecommendationFormValues, overallFeed, areaImprovement, potentialValue, normalizerOverallFeedComments, keepSamePotential, setKeepSamePotential, setReviewedOverallFeedback, empData: employeeData, appraiserOverallFeedComments, disableButtons, setDisableButtons } = useAppraiserRejectsNormalizerContext()
  //@ts-ignore
  const { navPrompt, setnavPrompt, setValue, moveTab, setMoveTab, fetchCancel, objectiveDescription, isCheckedothers, setothersdisable, othersdisable } = props;
  const navigate = useNavigate();
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const { data: empData } = useGetEmployeeAppraisalQuery(employee_id);
  const [appraiserAcceptNormalizer] = useAppraiserAcceptNormalizerMutation()
  const [updateObjectiveDescription] = useUpdateEmployeeAppraisalMutation();
  const [open, setOpen] = useState(false);
  const [moveToRatingTab, setMoveToRatingTab] = useState(false);
  const [keepSameRatingAlert, setKeepSameRatingAlert] = useState(false);
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  const handleClickClose = () => {
    setOpen(false);
    setMoveTab(false);
    setnavPrompt(false);
    setMessage("");
    setDisableButtons(false);
  };

  const handleClickIdClose = () => {
    setnavPrompt(false);
    setDisableButtons(false);
    appraiserAcceptNormalizer(employee_id);
    setOpen(false);
    navigate("/normalizer");
  };

  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  const [message, setMessage] = useState<any>("")
  const [allFieldMandatory, setAllFieldMandatory] = useState(false)
  const [changePotentialAlert, setChangePotentialAlert] = React.useState(false);
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const [isAlertOpen1, setisAlertOpen1] = React.useState(false);
  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [open3, setOpen3] = useState<any>(false);

  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  const handlemessage3 = () => {
    setOpen3(false);
  }
  // refetch
  const CancelButtonHandler = () => {
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
    let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === false);
    setMoveTab(false);
    setnavPrompt(false);
    setValue(0);
    setOpenCancelDialog(false);
    fetchCancel();
    setothersdisable(false);
  }



  const handleSave = () => {
    setDisableButtons(true);
    /***** check validation for area of improvement fields**********/
    let isSpecificActionEmpty = areaImprovement?.filter((item: any) => {
      return item.value?.trim() !== ""
    }).filter((item: any) => {
      return item.specific_actions[0]?.value?.trim() === ""
    });
    let isSpecificAreaEmpty = areaImprovement?.filter((item: any) => {
      return item.specific_actions[0].value?.trim() !== ""
    }).filter((item: any) => {
      return item?.value?.trim() === ""
    });

    let otherrrecomendation = otherRecommendation?.filter(
      (j: any) => j.isChecked === true
    );


    /**************validation to check training recommendation fields**************/
    let trainingRecommendationCategoryNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.name != "")
      .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
    let trainingRecommendationNameNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.training_name != "")
      .filter((item: any) => item.name == "" || item.justification?.trim() === "")
    let trainingRecommendationJustificationNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.justification != "")
      .filter((item: any) => item.name == "" || item.training_name?.trim() === "")
    /**************validation to check training recommendation fields**************/


    if (isSpecificActionEmpty?.length > 0 || isSpecificAreaEmpty?.length > 0) {
      setMessage("Please add specific area for the specific action.")
      setAllFeedMandatory1(true);
    } else if (trainingRecommendationCategoryNotEmpty?.length > 0 || trainingRecommendationNameNotEmpty?.length > 0 || trainingRecommendationJustificationNotEmpty?.length > 0) {
      setAllFeedMandatory1(true)
      setMessage("Please add the missing details in the Training Recommendations.");
    } else if ((otherscheckbox == true && OtherRecommendationothers?.trim() == "" && otherrrecomendation?.length == 0) || (otherscheckbox == true && OtherRecommendationothers?.trim() == undefined && otherrrecomendation?.length == 0)) {
      setMessage("It is mandatory to provide details when selecting \"Other\" option in Further Recommendations.")
      setAllFieldMandatory(true)
    } else {
      let pendingStatus = "";
      if (employeeData?.data?.reviewer?.reviewer_status == "rejected") {
        pendingStatus = "Pending with Appraiser (Reviewer Rejection)"
      } else if (employeeData?.data?.normalizer?.normalizer_status == "rejected") {
        pendingStatus = "Pending with Appraiser (HR Normalizer Rejection)"
      } else {
        pendingStatus = "Pending with Appraiser"
      }

      /********* function to remove additional spaces before and after the text ***************/
      let trimOverallFeedbackQuestionnaire = overallFeed?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      });
      let areaValues = areaImprovement?.filter((item: any) => item.value.trim() != "").map((item: any) => {
        let trimSpecificAction = item.specific_actions?.map((item: any) => {
          return {
            ...item,
            value: item?.value?.trim()
          }
        });
        return {
          ...item,
          value: item?.value?.trim(),
          specific_actions: trimSpecificAction
        }
      });
      let trainingRecommendationValues = trainingRecommendationFormValues?.filter((item: any) => item.name != "").map((item: any) => {
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });
      /********* function to remove additional spaces before and after the text ***************/

      let trimOtherFurtherRecommendation = OtherRecommendationothers?.trim();
      let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

      if ( otherscheckbox == false || filteredOtherRecommendations?.length > 0) {
        trimOtherFurtherRecommendation = "";
      }
      // else {
      //   trimOtherFurtherRecommendation
      // }
      updateMutation({
        // "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.other_recommendation_others": trimOtherFurtherRecommendation,
        "appraisal.others_checkbox": otherscheckbox,
        "appraisal.appraiser_overall_feedback": appraiserOverallFeedback?.trim(),
        "appraisal.training_recommendation": trainingRecommendationValues,
        "appraisal.feedback_questions": trimOverallFeedbackQuestionnaire,
        "appraisal.area_of_improvement": areaValues,
        "appraisal.potential": potentialValue,
        // "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,
        "appraisal.appraiser_status": "draft",
        "appraisal.pa_status": pendingStatus,
        "appraisal.appraiser_rejection_reason": appraiserOverallFeedComments?.trim(),
        id: employee_id,
      }).then((res: any) => {
        if (!res.error) {
          setnavPrompt(false)
          setMoveTab(false)
          //new alert 
          setSuccessAlertTrigerMSG("Changes were successfully saved.")
          setSuccessAlertTriger(true);
          setDisableButtons(false);

        } else {
          updateLoggedRole({
            pa_action_by: `${res.error} : ${new Date()}`,
            id: employee_id
          })
          setMessage("Something Went Wrong.")
          setOpen3(true)
        }
      })
    }
  }

  useEffect(() => {
    if (navPrompt === false && navTrigger === true) {
      console.log('nav')
      handleClickIdClose()
    }
  }, [navTrigger]);


  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    setMoveTab(false);
    setMessage('');
    setDisableButtons(false)
  };

  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    setMessage('')
  };

  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
    navigate(`/dashboardreview`, { state: { from: `${1}` } });
    setMessage('')
  };

  const moveTabHandler = () => {
    if (moveTab === true) {
      setAllFeedMandatory(true);
      setMessage("Please save the changes before leaving the page.");
    }
    else {
      setValue(0);
    }
  }

  const submitButtonHandler = () => {
    setDisableButtons(true);
    /***** check validation for area of improvement fields**********/
    let isSpecificActionEmpty = areaImprovement?.filter((item: any) => {
      return item.value?.trim() !== ""
    }).filter((item: any) => {
      return item.specific_actions[0]?.value?.trim() === ""
    });
    let isSpecificAreaEmpty = areaImprovement?.filter((item: any) => {
      return item.specific_actions[0].value?.trim() !== ""
    }).filter((item: any) => {
      return item?.value?.trim() === ""
    });
    /***** check validation for area of improvement fields **********/


    /**************validation to check training recommendation fields**************/
    let trainingRecommendationCategoryNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.name != "")
      .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
    let trainingRecommendationNameNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.training_name != "")
      .filter((item: any) => item.name == "" || item.justification?.trim() === "")
    let trainingRecommendationJustificationNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.justification != "")
      .filter((item: any) => item.name == "" || item.training_name?.trim() === "")
    /**************validation to check training recommendation fields**************/

    /************validation to check if any overall feedback fields are empty *********************** */
    if (overallFeed?.filter((item: any) => item.value?.trim() == "")?.length > 0 || overallFeed?.length == 0) {
      setMessage("It is mandatory to add the overall feedback. Please visit the Overall Feedback page.")
      setAllFieldMandatory(true)
    } else if (trainingRecommendationCategoryNotEmpty?.length > 0 || trainingRecommendationNameNotEmpty?.length > 0 || trainingRecommendationJustificationNotEmpty?.length > 0) {
      setAllFieldMandatory(true)
      setMessage("Please add the missing details in the Training Recommendations.");
    } else if (isSpecificActionEmpty?.length > 0 || isSpecificAreaEmpty?.length > 0) {
      setAllFieldMandatory(true)
      setMessage("Please add the missing details in the Areas for Improvement.");
    } else if ((otherscheckbox == true && OtherRecommendationothers?.trim() == "") || (otherscheckbox == true && OtherRecommendationothers?.trim() == undefined)) {
      setMessage("It is mandatory to provide details when selecting \"Other\" option in Further Recommendations.")
      setAllFieldMandatory(true)
    } else if (objectiveDescription) {
      /************validation to check comments are provided or not for rating < 3, rating >=4  *********************** */
      let Message = "";
      let Status = false;
      objectiveDescription?.forEach((i: any, index: any) => {
        if (i.ratings?.rating !== "" && i.ratings?.rating !== undefined) {
          if (((i.ratings?.rating < 3) || (i.ratings?.rating >= 4)) && (i.comments?.trim() == "" || i.comments?.trim() == undefined)) {
            Status = true;
            Message = `It is mandatory to provide a justification for the rating below 3, and 4 and above.`
          }
        }
        if (index == objectiveDescription?.length - 1) {
          if (Status === true) {
            setOpen(true);
            setMessage(Message);
          }
          else {

            let trimOverallFeedbackQuestionnaire = overallFeed?.map((item: any) => {
              return {
                ...item,
                value: item?.value?.trim()
              }
            });
            let areaValues = areaImprovement?.filter((item: any) => item?.value?.trim() != "")?.map((item: any) => {
              let trimSpecificAction = item.specific_actions?.map((item: any) => {
                return {
                  ...item,
                  value: item?.value?.trim()
                }
              })
              return {
                ...item,
                value: item?.value?.trim(),
                specific_actions: trimSpecificAction
              }
            });
            let trainingRecommendationValues = trainingRecommendationFormValues?.filter((item: any) => item.name != "")?.map((item: any) => {
              return {
                ...item,
                training_name: item?.training_name?.trim(),
                justification: item?.justification?.trim(),
              }
            });
            let trimOtherFurtherRecommendation = OtherRecommendationothers?.trim();
            let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

            if (otherscheckbox == false || filteredOtherRecommendations?.length > 0) {
              trimOtherFurtherRecommendation = "";
            }
            //  else {
            //   trimOtherFurtherRecommendation
            // }
            updateObjectiveDescription({
              // "appraisal.objective_description": objectiveDescription,
              "appraisal.potential": potentialValue,
              "appraisal.other_recommendation": checkboxIdHandler(
                checkboxHandler(otherRecommendation)),
              "appraisal.others_checkbox": otherscheckbox,
              "appraisal.other_recommendation_others": trimOtherFurtherRecommendation,
              "appraisal.appraiser_overall_feedback": appraiserOverallFeedback?.trim(),
              "appraisal.training_recommendation": trainingRecommendationValues,
              "appraisal.feedback_questions": trimOverallFeedbackQuestionnaire,
              "appraisal.area_of_improvement": areaValues,
              "appraisal.appraiser_rejection_reason": appraiserOverallFeedComments?.trim(),

              "appraisal_previous_submission.potential": potentialValue,
              "appraisal_previous_submission.feedback_questions": trimOverallFeedbackQuestionnaire,
              "appraisal_previous_submission.area_of_improvement": areaValues,
              "appraisal_previous_submission.training_recommendation": trainingRecommendationValues,
              "appraisal_previous_submission.other_recommendation": checkboxIdHandler(
                checkboxHandler(otherRecommendation)),
              "appraisal_previous_submission.others_checkbox": otherscheckbox,
              "appraisal_previous_submission.other_recommendation_others": trimOtherFurtherRecommendation,
              "appraisal_previous_submission.appraiser_overall_feedback": appraiserOverallFeedback?.trim(),
              id: employee_id,
            });
            setMoveTab(false);
            setOpen(false);
            setnavPrompt(false)
            if (objectiveDescription?.filter((item: any) => item.action_performed)?.length == 0) {
              setKeepSameRatingAlert(true);
              setMessage("Would you like to keep the same ratings?")
            } else if (!keepSamePotential && empData?.data?.appraisal_template?.potential === true && empData?.data?.employee?.employee_status !== "rejected") {
              setChangePotentialAlert(true);
              setMessage(`Would you like to keep the same potential level as ${potentialValue}?`)
            } else {
              setisAlertOpen1(true);
            }
          }
        }
      })
    }
  }


  const allFieldMandatoryClose = () => {
    if (moveToRatingTab == true) {
      setAllFieldMandatory(false);
      setMessage("");
      setValue(0);
      setDisableButtons(false);
    } else {
      setValue(1);
      setAllFieldMandatory(false);
      setMessage("");
      setDisableButtons(false);
    }
  }


  const handlePotentialChange = () => {
    setChangePotentialAlert(false);
    setMessage(false);
    setDisableButtons(false);
  }

  const handleKeepSamePotential = () => {
    setKeepSamePotential(true);
    setChangePotentialAlert(false);
    setMessage(false);
    setisAlertOpen1(true);
  }

  const handleKeepSameRatings = () => {
    setKeepSameRatingAlert(false);
    setMessage("");
    if (!keepSamePotential && empData?.data?.appraisal_template?.potential === true && empData?.data?.employee?.employee_status !== "rejected") {
      setChangePotentialAlert(true);
      setMessage(`Would you like to keep the same potential level as ${potentialValue}?`)
    } else {
      setisAlertOpen1(true);
    }
  }

  const handleRatingsChange = () => {
    setKeepSameRatingAlert(false);
    setAllFieldMandatory(true);
    setMoveToRatingTab(true);
    setDisableButtons(false);
    setMessage("Please change your ratings.");
  }

  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setisAlertOpen(false);
    setisAlertOpen1(true);
  };


  const handleAlertYes1 = () => {
    setisAlertOpen1(false);
    let appraiserObjDesc = employeeData?.data?.appraisal?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      }
    );

    let previousRating = employeeData?.data?.appraisal_previous_submission?.objective_description
      .map((item: any) => item)

    let trainingValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")

    let pendingStatus = employeeData?.data?.employee?.employee_status == "rejected" ? "Pending with Reviewer (Employee Rejection)" : "Pending with Reviewer"

    updateObjectiveDescription({
      "appraisal.objective_description": appraiserObjDesc,
      "appraisal.pa_status": pendingStatus,
      "appraisal.pa_rating": employeeData?.data?.current_rating?.overall_rating,
      "appraisal.appraiser_rejected": true,
      "appraisal.appraisal_acceptance": false,
      "appraisal_previous_submission.objective_description": appraiserObjDesc,
      // "appraisal_previous_rating.objective_description": employeeData?.data?.appraisal_previous_submission?.objective_description,
      "appraisal_previous_submission.appraiser_rating": employeeData?.data?.appraisal?.appraiser_rating,
      "appraisal_previous_submission.pa_status": pendingStatus,
      "appraisal.appraiser_status": "accepted",
      "reviewerIsDisabled": false,
      "reviewerIsChecked": false,
      "reviewer.reviewer_status": 'pending',
      // "reviewer.rejection_count": 0,
      // "appraiser.rejection_count": 0,
      "appraisal.appraiser_rating": employeeData?.data?.current_rating?.overall_rating,
      "current_previous_submission.objective_description": employeeData?.data?.current_rating?.objective_description,
      "appraisal.appraiser_rejection_reason": appraiserOverallFeedComments,
      "reviewer_previous_submission.objective_description": employeeData?.data?.reviewer?.objective_description,
      // "appraisal.other_recommendation": checkboxIdHandler(
      //   checkboxHandler(otherRecommendation)
      // ),
      // "appraisal.others_checkbox": otherscheckbox,
      // "appraisal.other_recommendation_others": OtherRecommendationothers,
      // "appraisal.appraiser_overall_feedback": appraiserOverallFeedback,
      // "appraisal.training_recommendation":
      //   trainingValues,
      // "appraisal.feedback_questions": overallFeed,
      // "appraisal.area_of_improvement": areaImprovement,
      "appraisal.appraiser_PA_rejected": true,
      id: employee_id,
    }).then((res: any) => {
      if (!res.error) {
        updateLoggedRole({
          pa_action_by: `Appraiser (Resubmitted)(from Overall Feedbak Tab) : ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false);
        setSuccessAlertTrigerMSG("The performance appraisal was resubmitted to the Reviewer.")
        setSuccessAlertTriger(true)


        // Notification action after Appraiser submits PA to Reviewer after Normalizer rejection -(for Reviewer)
        let normalizerName = employeeData?.data?.normalizer_name;
        let reviwerName = employeeData?.data?.reviewer_name;
        let appraiserName = employeeData?.data?.appraiser_name;
        let employeeName = employeeData?.data?.first_name;
        let calendarName = employeeData?.data?.calendar?.calendar_type;
        let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
        let employeeCode = employeeData?.data?.employee_code
        let reviewerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.firstName;

        if (employeeData?.data?.normalizer?.normalizer_PA_rejected == true) {
          let tempSubject = APPRAISER_RESUBMITS_NORMALIZER_REJECTION?.subject;
          tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
          tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
          tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
          tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);


          let tempHtml = APPRAISER_RESUBMITS_NORMALIZER_REJECTION?.html;
          tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
          tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
          tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
          tempHtml = tempHtml?.replace("[Normalizer name]", `${normalizerName}`);
          tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
          tempHtml = tempHtml?.replace("[Reviewer FirstName]", `${reviewerFirstName}`);


          let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
          let email = APPRAISER_RESUBMITS_NORMALIZER_REJECTION?.to;
          email = email?.replace("[email]", `${reviewerEmail}`);

          sendEmailNotification(
            {
              to: email,
              subject: tempSubject,
              html: tempHtml
            }
          )
        } else {
          let tempSubject = APPRAISER_RESUBMITS_REVIEWER_REJECTION?.subject;
          tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
          tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
          tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
          tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);


          let tempHtml = APPRAISER_RESUBMITS_REVIEWER_REJECTION?.html;
          tempHtml = tempHtml?.replace("[Reviewer FirstName]", `${reviewerFirstName}`);
          tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
          tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
          tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
          tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
          tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);


          let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
          let email = APPRAISER_RESUBMITS_REVIEWER_REJECTION?.to;
          email = email?.replace("[email]", `${reviewerEmail}`);

          sendEmailNotification(
            {
              to: email,
              subject: tempSubject,
              html: tempHtml
            }
          )
        }
      }
      else {
        updateLoggedRole({
          pa_action_by: `Appraiser (Resubmitted)(from Overall Feedbak Tab) : ${res.error} : ${new Date()}`,
          id: employee_id
        })
        setMessage("Something Went Wrong.")
        setOpen3(true)
      }
    });
  };

  const handleAlertNo = () => {
    // setOpenYes(false);
    setisAlertOpen(false);
    setMessage("");
    setValue(1);
  }

  const handleAlertNo1 = () => {
    setisAlertOpen1(false);
    setMessage("");
    setDisableButtons(false);
  }
  //nav prompt


  return (
    <Stack justifyContent="center" spacing={2} direction="row"
      marginTop={"20px"} >

      {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") &&
        <>
          <Button
            variant="outlined"
            disabled={disableButtons}
            style={{
              fontSize: "15px",
              textTransform: "none",
              color: "#3e8cb5",
              fontFamily: "Arial",
              background: "transparent",
              borderColor: "#3e8cb5",
              height: "35px",
              ...((disableButtons) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color: "#ccc",
              }),
            }}
            onClick={() => {
              handleSave();
              //setnavPrompt(false);
            }}
          >
            Save as Draft
          </Button>
          <Button
            disabled={disableButtons}
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              background: "transparent",
              height: "35px",
              // width: "70px",
              color: "#3E8CB5",
              ...((disableButtons) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color: "#ccc",
              }),
            }}
            variant="outlined"
            onClick={submitButtonHandler}
          >
            Save and Submit
          </Button>

          <Button
            disabled={disableButtons}
            variant="outlined"
            style={{
              color: "#3e8cb5",
              fontSize: "15px",
              textTransform: "none",
              fontFamily: "Arial",
              background: "transparent",
              borderColor: "#3e8cb5",
              height: "35px",
              width: "70px",
              ...((disableButtons) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color: "#ccc",
              }),
            }}
            onClick={() => {
              moveTabHandler();
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

      {/* <AlertAcceptDialog
        isAlertOpen={open}
        handleAlertClose={handleClickClose}
        handleAlertIdClose={() => {
          setnavPrompt(false);
          setnavTrigger(true);
        }}
      >
       {message}
      </AlertAcceptDialog> */}

      <AlertDialogSuccess
        isAlertOpen={open}
        handleAlertClose={handleClickClose}>
        {message}
      </AlertDialogSuccess>

      <AlertDialogSuccess
        isAlertOpen={allFieldMandatory}
        handleAlertClose={allFieldMandatoryClose}>
        {message}
      </AlertDialogSuccess>

      <AlertYesNo
        isAlertOpen={changePotentialAlert}
        handleAlertYes={handleKeepSamePotential}
        handleAlertClose={handlePotentialChange}>
        {message}
      </AlertYesNo>

      {/* handler to keep the same ratings or change the ratings */}
      <AlertYesNo
        isAlertOpen={keepSameRatingAlert}
        handleAlertYes={handleKeepSameRatings}
        handleAlertClose={handleRatingsChange}>
        {message}
      </AlertYesNo>

      <Dialog
        open={allFeedMandatory1}
        PaperProps={{
          style: {
            boxShadow: "none",
            borderRadius: "6px",
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
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
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
        open={allFeedMandatory}
        PaperProps={{
          style: {
            boxShadow: "none",
            borderRadius: "6px",
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
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
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
            {/* changed as per 5/4/2023 */}
            The performance appraisal was resubmitted to the Reviewer.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //paddingBottom: "30px"
          }}
        >
          <Link
            to={`/dashboardreview`}
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


      <Dialog
        open={isAlertOpen}
        // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            boxShadow: "none",
            borderRadius: "6px",
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
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              // height: "100px",
              alignItems: "center",
              overflowY: "hidden",
            }}
          >
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
              // onClick={handleAlertNo}
              onClick={handleAlertNo}
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Stack>

      </Dialog>
      <Dialog
        open={isAlertOpen1}
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
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              alignItems: "center",
              overflowY: "hidden",
            }}
          >
            {/* changed as per 5/4/2023 */}
            Are you sure you wish to resubmit the performance appraisal?
          </DialogContentText>
        </DialogContent>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
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
              onClick={handleAlertNo1}
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
      <AlertDialogSuccess
        isAlertOpen={open3}
        handleAlertClose={handlemessage3}
      >
        {message}
      </AlertDialogSuccess>
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
    </Stack >
    // </Footer>
  );
}

export default Footerbuttons;
