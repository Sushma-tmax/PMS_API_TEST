import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";
import { Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { useAttachmentsAppraiserOverviewMutation, useUpdateEmployeeAppraisalMutation } from "../../../../service/employee/appraisal/appraisal";
import { APPRAISER_SUBMITS_TO_REVIEWER } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Appraiser";
import { useGetEmailIdsQuery, useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import _ from "lodash";
import { makeStyles } from '@mui/styles';
import AlertDialogOkCancelForUnsavedChanges from "../../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../../service/employee/employee";
import AlertDialogSuccess from "../../../UI/DialogSuccess";

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



function Footerbuttons(props: any) {
  const { setnavPrompt, navPrompt, setValue, fetchCancel, fetchCancel2, appraiserComments, employeeData, ratingData,
    disableSubmit, setNavigateDashboard, setReviewedOverallFeedback, setDisableSubmit, appraiserRatingPreviousSubmission,
    employee1Data, navigateDashboard } = props;
  // @ts-ignore
  const { updateMutation, otherRecommendationcheckbox, otherscheckbox, otherRecommendation, otherRecommendationothers, employee_id, checkboxIdHandler, checkboxHandler, trainingRecommendationFormValues, overallFeed, errorHandler, areaImprovement, handleClick, openSnackbar, appOverallFeed, setEmptyAppOverall, moveTab, setMoveTab, potentialValue, disableButtons, setDisableButtons } =
    useAppraisalContext();
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [updateObjectiveDescription] = useUpdateEmployeeAppraisalMutation();
  const [attachmentsAppraiser] = useAttachmentsAppraiserOverviewMutation();
  const { data: emailData } = useGetEmailIdsQuery({ appraiser_code: employeeData?.data?.appraiser_code, reviewer_code: employeeData?.data?.reviewer_code, normalizer_code: employeeData?.data?.normalizer_code })
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [message, setMessage] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [open, setOpen] = useState<any>(false);
  const [open2, setOpen2] = useState<any>(false);
  const [message2, setMessage2] = useState<any>("");
  const [open1, setOpen1] = useState<any>(false);
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  const [navsaveandsubmitTrigger, setnavsaveandsubmitTrigger] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  //alert 
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("");
  const [updateLoggedRole] = useCheckRoleLogsMutation()
  const [open3, setOpen3] = useState<any>(false);


  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    // setMoveTab(false);
    setMessage('');
    setDisableButtons(false);
  };

  // refetch
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
    // fetchCancel();
  }
  const handlemessage3 = () => {
    setOpen3(false);
  }
  const acceptCancelButtonHandler = () => {
    setMoveTab(false);
    setnavPrompt(false);
    setOpenCancelDialog(false);
    setValue(0);
    fetchCancel();
    fetchCancel2();
  }

  const moveTabHandler = () => {
    if (moveTab === true) {
      setAllFeedMandatory(true);
      setMessage("Please save the changes before leaving the page.");
    } else {
      setValue(0);
    }
  }

  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
  }


  const dialogHandler = () => {
    setDisableButtons(true);
    let area = areaImprovement.filter((item: any) => {
      /**if specific area is empty and specific action is not empty */
      return ((item.value?.trim() == "" && item.specific_actions[0]?.value?.trim() !== "") ||
        (item.value?.trim() !== "" && item.specific_actions[0]?.value?.trim() == ""))
    });

    /** if Training category is empty and if training name or training jusification is not empty */
    let trainingRecommendationCategoryNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.name != "")
      .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
    let trainingRecommendationJustificationNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.justification != "")
      .filter((item: any) => item.name == "" || item.training_name?.trim() === "")
    let trainingRecommendationNameNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.training_name != "")
      .filter((item: any) => item.name == "" || item.justification?.trim() === "")

    /** check if any of the Other recommendation field is empty **********/
    const otherrrecomendation = otherRecommendation?.filter(
      (j: any) => j.isChecked === true
    );

    if (area?.length > 0) {
      setAllFeedMandatory(true);
      setMessage("Please add the missing details in the Areas for Improvement.")
    } else if (trainingRecommendationCategoryNotEmpty?.length > 0 || trainingRecommendationJustificationNotEmpty?.length > 0 || trainingRecommendationNameNotEmpty?.length > 0) {
      setAllFeedMandatory(true);
      setMessage("Please add the missing details in the Training Recommendations.")
    } else if (otherscheckbox == true && otherRecommendationothers?.trim() == "" && otherrrecomendation?.length == 0 || otherscheckbox == true && otherRecommendationothers?.trim() == undefined && otherrrecomendation?.length == 0) {
      setAllFeedMandatory(true);
      setMessage("It is mandatory to provide details when selecting \"Other\" option in Further Recommendations.")
    } else {
      setnavPrompt(false);
      setnavTrigger(true);
    }
  }

  // const dialog1Handler = () => {
  //   if (appOverallFeed === "") {
  //     setAllFeedMandatory(true);
  //   } else if (appOverallFeed != "") {
  //     setnavPrompt(false);
  //     setnavsaveandsubmitTrigger(true);
  //     setEmptyAppOverall(false)
  //   }
  // }

  // console.log(checkboxIdHandler(checkboxHandler(otherRecommendation)?.length),"lenghtttt")
  useEffect(() => {

    console.log(trainingRecommendationFormValues,otherscheckbox, otherRecommendationothers, overallFeed, areaImprovement, appOverallFeed, 'checkdata')
    if (navPrompt === false && navTrigger === true) {
      console.log('nav')
      let trimOverallFeedbackQuestionnaire = overallFeed?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      });
      let areaValues = areaImprovement.filter((item: any) => item.value.trim() != "").map((item: any) => {
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
      let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "").map((item: any) => {
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });
      let trimOtherFurtherRecommendation = otherRecommendationothers?.trim();
      let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

      if (otherscheckbox == false || filteredOtherRecommendations?.length > 0) {
        trimOtherFurtherRecommendation = "";
      }
      // else {
      // No need for an assignment here, keep the existing value
      // }
      console.log(filteredOtherRecommendations?.length, trimOtherFurtherRecommendation, "otherRecommendations")

      updateMutation({
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.others_checkbox": otherRecommendationcheckbox,
        "appraisal.other_recommendation_others": trimOtherFurtherRecommendation,
        // @ts-ignore
        "appraisal.others_checkbox": otherscheckbox,
        "appraisal.training_recommendation":
          trainingRecommendationValues,
        "appraisal.potential": potentialValue,
        "appraisal.feedback_questions": trimOverallFeedbackQuestionnaire,
        "appraisal.area_of_improvement": areaValues,
        "appraisal.appraiser_overall_feedback": appOverallFeed.trim(),
        "appraisal.appraiser_status": 'draft',
        "appraisal.pa_status": "Pending with Appraiser",
        "appraisal.status": "not-started",
        id: employee_id,
      }).then((res: any) => {
        if (!res.error) {
          //commented to test the new alert
          // setAllFeedMandatory(true);
          // setMessage("Changes were successfully saved.");
          //new alert
          setSuccessAlertTrigerMSG("Changes were successfully saved.")
          setSuccessAlertTriger(true)
          setMoveTab(false);
          setnavPrompt(false);
          setDisableButtons(false);
          setnavTrigger(false)
        } else {
          updateLoggedRole({
            pa_action_by: `Appraiser save as draft from Overall Feedback tab : ${res.error} : ${new Date()}`,
            id: employee_id
          })
          setMessage2("Something Went Wrong.")
          setOpen3(true)
        }
      });
      errorHandler();
      handleClick();
    }

  }, [navTrigger]);


  useEffect(() => {
    if (navPrompt === false && navsaveandsubmitTrigger === true) {
      console.log('nav')
      let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")
      let overallFeedValues = overallFeed.filter((item: any) => item.value != "")
      let areaValues = areaImprovement.filter((item: any) => item.value != "")

      updateMutation({
        "appraisal.potential": potentialValue,
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.others_checkbox": otherRecommendationcheckbox,
        "appraisal.other_recommendation_others": otherRecommendationothers,
        // @ts-ignore
        "appraisal.others_checkbox": otherscheckbox,
        "appraisal.training_recommendation":
          trainingRecommendationValues,
        "appraisal.feedback_questions": overallFeedValues,
        "appraisal.area_of_improvement": areaValues,
        "appraisal.appraiser_overall_feedback": appOverallFeed,
        "appraisal.appraiser_status": 'submitted',
        "appraisal.status": "in-progress",
        "reviewer.status": "in-progress",
        "normalizer.status": "in-progress",
        "reviewerIsDisabled": false,
        "reviewerIsChecked": false,
        "reviewer.reviewer_status": 'pending',


        id: employee_id,
      }).then((res: any) => {
        // if (res.data) navigate(`/dashboardreview`)
        console.log(res);
        setnavPrompt(false);

      });
      errorHandler();

    }
  }, [navsaveandsubmitTrigger]);


  const submitRatingTabData = (Status: any, Message: any) => {
    if (Status === false) {
      setOpen(false);

      /********* function to remove additional spaces before and after the text ***************/
      let trimOverallFeedbackQuestionnaire = overallFeed?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      });
      let areaValues = areaImprovement.filter((item: any) => item.value.trim() != "").map((item: any) => {
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
      let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "").map((item: any) => {
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });
      // let trimOtherFurtherRecommendation = otherRecommendationothers?.trim();
      /********* function to remove additional spaces before and after the text ***************/
      let trimOtherFurtherRecommendation = otherRecommendationothers?.trim();
      let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

      if (otherscheckbox == false || filteredOtherRecommendations?.length > 0) {
        trimOtherFurtherRecommendation = "";
      }
      // else {
      //   trimOtherFurtherRecommendation
      // }

      updateObjectiveDescription({
        // "appraisal.objective_description": appraiserComments,
        "appraisal.potential": potentialValue,
        // "appraisal.appraiser_status": "draft",
        // "appraisal.pa_status": "Pending with Appraiser",
        // "appraisal.status": "not-started",
        // "current_rating.objective_description": appraiserComments,
        "appraisal.training_recommendation":
          trainingRecommendationValues,
        "appraisal.feedback_questions": trimOverallFeedbackQuestionnaire,
        "appraisal.area_of_improvement": areaValues,
        "appraisal.appraiser_overall_feedback": appOverallFeed.trim(),
        "appraisal.others_checkbox": otherRecommendationcheckbox,
        "appraisal.other_recommendation_others": trimOtherFurtherRecommendation,
        // @ts-ignore
        "appraisal.others_checkbox": otherscheckbox,
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        id: employee_id,
      }).then((j: any) => {
        if (!j.error) {
          setMoveTab(false);
          setnavPrompt(false);
        }
      });
    }
  };


  //  to close submit dialog
  const handleDialogCloseYes = () => {
    setReviewedOverallFeedback(true);
    setOpen1(false);
    submitData();
    // setMoveTab(false);
    // setnavPrompt(false);
    setDisableSubmit(true);
    setNavigateDashboard(true);
  };


  const submitData = () => {
    // let areaValues = areaImprovement.filter((item: any) => item.value != "")

    let files = attachedFiles.map((item: any) => {
      return {
        url: item.name,
        objective_description: item.objective_description,
      };
    });
    // attachmentsAppraiser({
    //   id: employee_id,
    //   attachments: files,
    // });
    let overallRating: any = "0";
    if (appraiserComments.length > 0 && employee1Data) {
      const currentObjectiveDescriptionMapped = appraiserComments?.map((i: any) => {
        const sum = (i.value * i.objective_type.value) / 10000
        let rating = ratingData?.data?.find((item: any) => item._id == i.ratings)?.rating;
        const newSum = sum * rating
        return newSum ? newSum : 0
      })
      overallRating = _.sum(currentObjectiveDescriptionMapped).toFixed(2);

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

      let trainingRecommendationValues : any = trainingRecommendationFormValues?.filter((item: any) => item.name != "")?.map((item: any) => {
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });

      let trimOtherFurtherRecommendation = otherRecommendationothers?.trim();
      let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

      if (filteredOtherRecommendations?.length > 0) {
        trimOtherFurtherRecommendation = "";
      }

      updateObjectiveDescription({
        "appraisal.objective_description": appraiserComments,
        "appraisal.appraiser_status": "submitted",
        "appraisal.status": "in-progress",
        "appraisal.appraiser_rejected": false,
        "appraisal.potential": potentialValue,
        "appraisal.feedback_questions": trimOverallFeedbackQuestionnaire,
        "appraisal.area_of_improvement": areaValues,
        "appraisal.training_recommendation":
          trainingRecommendationValues,
        // "appraisal.others_checkbox": otherRecommendationcheckbox,
        "appraisal.other_recommendation_others": trimOtherFurtherRecommendation,
        // @ts-ignore
        "appraisal.others_checkbox": otherscheckbox,
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.appraiser_overall_feedback": appOverallFeed.trim(),
        "appraisal.show_appraiser": true,
        "appraisal.pa_status": "Pending with Reviewer",
        "appraisal.pa_rating": overallRating,
        "appraisal.appraiser_rating": overallRating,
        // "appraisal.potential": potentialValue,
        // "appraisal.others_checkbox": otherscheckbox,
        "appraisal_previous_submission.objective_description": appraiserComments,
        "appraisal_previous_submission.appraiser_status": "submitted",
        "appraisal_previous_submission.status": "in-progress",
        "appraisal_previous_submission.appraiser_rating": appraiserRatingPreviousSubmission,
        "appraisal_previous_submission.pa_status": "Pending with Reviewer",
        "appraisal_previous_submission.potential": potentialValue,
        "appraisal_previous_submission.feedback_questions": trimOverallFeedbackQuestionnaire,
        "appraisal_previous_submission.area_of_improvement": areaValues,
        "appraisal_previous_submission.training_recommendation":
          trainingRecommendationValues,
        "appraisal_previous_submission.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal_previous_submission.others_checkbox": otherscheckbox,
        "appraisal_previous_submission.other_recommendation_others": trimOtherFurtherRecommendation,
        "appraisal_previous_submission.appraiser_overall_feedback": appOverallFeed.trim(),
        "current_rating.objective_description": appraiserComments,
        "current_previous_submission.objective_description": appraiserComments,
        // "current_rating.overall_rating" : employee1Data?.data?.appraisal?.appraiser_rating,
        "reviewer.status": "in-progress",
        "normalizer.status": "in-progress",
        reviewerIsDisabled: false,
        reviewerIsChecked: false,
        "reviewer.reviewer_status": "pending",
        "appraisal_previous_rating.objective_description": appraiserComments,
        employee: {},
        id: employee_id,

      }).then((j: any) => {
        if (!j.error) {
          setnavPrompt(false);
          setMoveTab(false);
          setDisableButtons(false);
          // setOpen(true);
          // setMessage(
          //   "The performance appraisal was submitted to the Reviewer."
          // );
          //snackbar
          setSuccessAlertTriger(true)
          setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Reviewer.")
          updateLoggedRole({
            pa_action_by: `Appraiser (Submitted) (from Overall Feedback tab) : ${new Date()}`,
            id: employee_id
          })
          let appraiserName = employee1Data?.data?.appraiser_name;
          let employeeName = employee1Data?.data?.first_name;
          let employeeCode = employee1Data?.data?.employee_code;
          let calendarName = employee1Data?.data?.calendar?.calendar_type;
          let calendarYear = employee1Data?.data?.calendar?.start_date?.slice(0, 4);
          let reviewerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employee1Data?.data?.reviewer_code)?.firstName;

          let tempSubject = APPRAISER_SUBMITS_TO_REVIEWER?.subject;
          tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
          tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
          tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
          tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

          let tempHtml = APPRAISER_SUBMITS_TO_REVIEWER?.html;
          tempHtml = tempHtml?.replace("[Reviewer FirstName]", `${reviewerFirstName}`);
          tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
          tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
          tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
          tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
          tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);

          let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employee1Data?.data?.reviewer_code)?.email;
          let email = APPRAISER_SUBMITS_TO_REVIEWER?.to;
          email = email?.replace("[email]", `${reviewerEmail}`);

          sendEmailNotification(
            {
              to: email,
              subject: tempSubject,
              html: tempHtml
            }
          )
        } else {
          updateLoggedRole({
            pa_action_by: `Appraiser (Error-Submitted) Overall Feedback tab ${j.error} : ${new Date()}`,
            id: employee_id
          })
          setMessage2("Something Went Wrong.")
          setOpen3(true)
        }
      })   
    }
  };


  const submitHandler = () => {
    setDisableButtons(true);
    const otherrrecomendation = otherRecommendation?.filter(
      (j: any) => j.isChecked === true
    );

    if (appraiserComments) {
      let Message = "";
      let Status = false;
      appraiserComments?.forEach((i: any, index: any) => {
        if (
          employeeData?.data?.appraisal_template?.potential === true &&
          potentialValue == undefined
        ) {
          Status = true;
          Message = "Please select the Potential Level.";
          // saveData(Status, Message);
        } else if (i.ratings === "" || i.ratings === undefined) {
          Status = true;
          Message = "It is mandatory to add ratings in all fields.";
        } else if (i.ratings !== "" && i.ratings !== undefined && ratingData) {
          let rating = ratingData?.data?.find((item: any) => i.ratings == item._id).rating;
          if (((rating < 3) || (rating >= 4)) && (i.comments?.trim() == "" || i.comments?.trim() == undefined)) {
            Status = true;
            Message = `It is mandatory to provide a justification for the rating below 3, and 4 and above.`
          }
        }

        if (index == appraiserComments.length - 1) {
          if (Status === true) {
            setOpen(true);
            setMessage(Message);
          } else {

            let specificArea = areaImprovement?.filter((item: any) => {
              return item.value?.trim() !== ""
            }).filter((item: any) => {
              return item.specific_actions[0]?.value?.trim() === ""
            });
            let specificArea1 = areaImprovement?.filter((item: any) => {
              return item.specific_actions[0].value?.trim() !== ""
            }).filter((item: any) => {
              return item?.value?.trim() === ""
            });
            let trainingRecommendation = employeeData?.data?.appraisal?.training_recommendation?.filter((item: any) => item.name !== "")
              .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
            let trainingRecommendationCategoryNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.name != "")
              .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
            let trainingRecommendationJustificationNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.justification != "")
              .filter((item: any) => item.name == "" || item.training_name?.trim() === "")
            let trainingRecommendationNameNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.training_name != "")
              .filter((item: any) => item.name == "" || item.justification?.trim() === "")
            /******** #429 (GIT) : This Function is commented as it should not save any other textfields until 
             * training and area improvement data is correctly added********************************/
            // submitRatingTabData(Status, Message);
            if (
              overallFeed?.filter((item: any) => item.value?.trim() == "")?.length > 0 ||
              overallFeed?.length == 0
            ) {
              setOpen2(true);
              setMessage2("Please provide your feedback on the overall feedback questions. ")
            } else if (specificArea?.length > 0 || specificArea1?.length > 0) {
              setOpen2(true);
              setMessage2("Please add the missing details in the Areas for Improvement.")
            } else if (trainingRecommendationCategoryNotEmpty?.length > 0 || trainingRecommendationJustificationNotEmpty?.length > 0 || trainingRecommendationNameNotEmpty?.length > 0) {
              setOpen2(true);
              setMessage2("Please add the missing details in the Training Recommendations.")
            } else if (otherscheckbox == true && otherRecommendationothers?.trim() == "" && otherrrecomendation?.length == 0 || otherscheckbox == true && otherRecommendationothers?.trim() == undefined && otherrrecomendation?.length == 0) {
              setOpen2(true);
              setMessage2("It is mandatory to provide details when selecting \"Other\" option in Further Recommendations.")
            }
            else if (Status === false) {
              setOpen(false);
              handleDialogCloseYes();
            }
          }
        }
      });
    }
  };

  const handleDialogClose2 = () => {
    setOpen2(false);
    setMessage("");
    setDisableButtons(false);
    // setValue(1)
  }

  const handleDialogCloseNo = () => {
    setOpen1(false);
    setMessage("");
    setMoveTab(false);
    setnavPrompt(false);
    // setValue(1);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setMessage("");
    if (navigateDashboard === true) {
      navigate(`/dashboardReview`, {
        state: {
          from: 1,
        },
      });
    }
    setDisableButtons(false);
  };
  //nav prompt

  return (
    <>
      <Dialog
        open={open2}
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
            {" "}
            {message2}
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
              width: "70px",
              height: "35px",
              background: "transparent",
              color: "#3e8cb5"
            }}
            variant="outlined"
            autoFocus
            onClick={handleDialogClose2}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open1}
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
            {" "}
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
              marginRight: "10px",
              color: "#3e8cb5",
              width: "70px",
              height: "35px",
              background: "transparent",
            }}
            variant="outlined"
            autoFocus
            onClick={handleDialogCloseYes}
          >
            Yes
          </Button>
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
              color: "#3e8cb5",
            }}
            variant="outlined"
            autoFocus
            onClick={handleDialogCloseNo}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleDialogClose}
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
            {" "}
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
              width: "70px",
              height: "35px",
              background: "transparent",
              color: "#3e8cb5"
            }}
            variant="outlined"
            autoFocus
            onClick={handleDialogClose}
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

      <AlertDialogOkCancelForUnsavedChanges
        isAlertOpen={openCancelDialog}
        handleAlertClose={rejectCancelButtonHandler}
        handleAlertIdClose={acceptCancelButtonHandler}
      >
      </AlertDialogOkCancelForUnsavedChanges>

      {(employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") || employeeData?.data?.appraisal?.status == "not-started") &&
        <Stack justifyContent="center" spacing={2} direction="row">
          <Button
            disabled={disableButtons || openSnackbar}
            variant="outlined"
            style={{
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              height: "35px",
              //  width: "153px",
              background: "transparent",
              ...((disableButtons) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color: "#ccc",
              }),
            }}
            onClick={() => {
              dialogHandler()
            }}
          >
            Save as Draft
          </Button>
          <Button
            disabled={disableButtons || disableSubmit}
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
              ...((disableButtons) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color: "#ccc",
              }),
            }}
            variant="outlined"
            onClick={() => {
              submitHandler();
            }}
          >
            Save and Submit
          </Button>
          <Button
            variant="outlined"
            disabled={disableButtons}
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
              ...((disableButtons) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color: "#ccc",
              }),
            }}
            onClick={() => {
              moveTabHandler()
            }}
          >
            Back
          </Button>
          <Button
            disabled={disableButtons}
            variant="outlined"
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
              ...((disableButtons) && {
                cursor: "not-allowed",
                borderColor: "#ccc",
                color: "#ccc",
              }),
            }}
            onClick={() => {
              // setValue(0);
              CancelButtonHnadler()
            }}
          >
            Cancel
          </Button>

        </Stack>
      }
      <AlertDialogSuccess
        isAlertOpen={open3}
        handleAlertClose={handlemessage3}
      >
        {message2}
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
    </>
  );
}

export default Footerbuttons;
