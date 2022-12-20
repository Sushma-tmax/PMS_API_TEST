import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../context/reviewerContextContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  useAcceptReviewerMutation,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useRejectReviewerAppraisalEmployeeMutation,
} from "./../../../service";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import { useParams } from "react-router-dom";
import AlertYesNo from "../../UI/DialogYesNo";
import AlertDialogSuccess from "../../UI/DialogSuccess";
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
  const { setnavPrompt, navPrompt, moveTab, setMoveTab, value, setValue } = props;
  const [acceptReviewer] = useAcceptReviewerMutation();
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);
  const [openYes2, setOpenYes2] = useState(false);
  const [Message1, setMessage1] = useState("")
  const [Message, setMessage] = useState("")
  //@ts-ignore
  const { updateMutation, employee_id, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments } = useReviewerContext()
  const navigate = useNavigate();
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

  const rejectionHandler = (count: any) => {
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
    let reviewerObjDesc =  empData?.data?.reviewer?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      }
    );
    if (count === 0 || count === undefined) {
      updateMutation({

        "reviewer.objective_description" : reviewerObjDesc,
        "reviewer.rejection_count": 1,
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "appraiserIsDisabled": false,
        "appraisal.appraiser_status": "reviewer-rejected",
        "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    } else if (count === 1) {
      updateMutation({
        "reviewer.objective_description" : reviewerObjDesc,
        "reviewer.rejection_count": 2,
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "appraiserIsDisabled": false,
        "appraisal.appraiser_status": "reviewer-rejected",
        "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    } else if (count === 2) {
      updateMutation({
        "reviewer.objective_description" : reviewerObjDesc,
        "reviewer.rejection_count": 3,
        "reviewerIsChecked": true,
        "reviewerIsDisabled": true,
        "reviewer.reviewer_status": 'rejected',
        "normalizerIsDisabled": false,
        "normalizerIsChecked": false,
        "normalizer.normalizer_status": 'pending',
        "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
        "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
        "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
        "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
        id: employee_id,
      })
    }
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
    // setValue(1);
  }
  const handleAlertClose2 = () => {
    // setAllFeedMandatory(false);
    setOpenYes2(false);
    // setOpenYes(true);
    setMessage("");
    // setValue(1);
  }

  console.log(value, 'valueeee')

  const handleAlertYes1 = () => {
    // rejectionHandler(empData.data.reviewer.rejection_count);
    // // updateMutation({
    // //     "reviewerIsChecked": true,
    // //     "reviewerIsDisabled": true,
    // //     "reviewer.reviewer_status": 'rejected',
    // //     "appraiserIsDisabled": false,
    // //     "appraisal.appraiser_status": "reviewer-rejected",
    // //     "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
    // //     "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
    // //     "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
    // //     "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
    // //     id: employee_id,
    // // })
    // if (empData.data.reviewer.rejection_count == 2)
    //   setmessage('The performance appraisal has been submitted successfully to the Normalizer.')
    // else
    //   setmessage('The performance appraisal has been submitted successfully to the Appraiser.')
    // setAllFeedMandatory(true);
    // setdisableSubmit(true);
    // setOpenYes1(true);
    // setMessage1('Are you sure you would like to Reject the Performance Appraisal?')
    if (reviewerOverallFeedComments == undefined || reviewerOverallFeedComments == null || reviewerOverallFeedComments == "") {
      setOpenYes(false);
      setOpenYes1(false);
      setOpenYes2(true);
      setMessage("Please add the rejection reasons in the Overall Feedback.")
    } else {
      rejectionHandler(empData.data.reviewer.rejection_count);
      // updateMutation({
      //   "reviewerIsChecked": true,
      //   "reviewerIsDisabled": true,
      //   "reviewer.reviewer_status": 'rejected',
      //   "appraiserIsDisabled": false,
      //   "appraisal.appraiser_status": "reviewer-rejected",
      //   // "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
      //   // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
      //   // "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
      //   // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
      //   id: employee_id,
      // });
      if (empData.data.reviewer.rejection_count == 2)
        setmessage('The performance appraisal has been submitted successfully to the Normalizer.')
      else
        setmessage('The performance appraisal has been submitted successfully to the Appraiser.')
      setAllFeedMandatory(true);
      setdisableSubmit(true);
    }
  }


  const handleAlertYes = () => {
    if (empData && empData?.data?.reviewer?.rejection_count == 2) {
      setOpenYes(false);
      setOpenYes1(true);
      setMessage1("The Performance Appraisal will be submitted to the Normalizer. Are you sure you want to reject the appraisal?")
    } else {
      setOpenYes(false);
      setOpenYes1(true);
      setMessage1("Are you sure you would like to reject the Performance Appraisal?")
    }

    // rejectionHandler(empData.data.reviewer.rejection_count);
    // // updateMutation({
    // //     "reviewerIsChecked": true,
    // //     "reviewerIsDisabled": true,
    // //     "reviewer.reviewer_status": 'rejected',
    // //     "appraiserIsDisabled": false,
    // //     "appraisal.appraiser_status": "reviewer-rejected",
    // //     "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
    // //     "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
    // //     "reviewer.feedback_questions_comments": reviewerOverallFeedComments,
    // //     "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
    // //     id: employee_id,
    // // })
    // if (empData.data.reviewer.rejection_count == 2)
    //   setmessage('The performance appraisal has been submitted successfully to the Normalizer.')
    // else
    //   setmessage('The performance appraisal has been submitted successfully to the Appraiser.')
    // setAllFeedMandatory(true);
    // setdisableSubmit(true);
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
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);
  const [message, setmessage] = React.useState('');
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    setOpenYes1(false)
  };
  const handleAllFeedMandatory2 = () => {
    setAllFeedMandatory2(false);
    setOpenYes1(false)
    setMoveTab(false);
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
    // setMoveTab(false);
    updateMutation({

      "reviewer.reviewer_status": 'draft',
      "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
      "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
      "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
      "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
      id: employee_id,
    })
    //setmessage('Changes have been saved.')
    setAllFeedMandatory2(true);

  }
  const submitHandler = () => {
    setOpenYes(true);
    setMessage("Did you review the recommendations ?")
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
          fontFamily: "Arial",
          // width: "70px",
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
        variant="outlined"
        // disabled={disableSubmit}
        style={{
          height: "35px",
          fontFamily: "Arial",
          // width: "70px",
          backgroundColor: "Transparent",
          color: "#3e8cb5",
          borderColor: "#3E8CB5",
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
            fontFamily: "Arial",
          }}
        // onClick={() => {
        //   saveHandler()
        // }}
        >
          {/* <Link to={`/reviewer`}>
                    Cancel
                </Link> */}
          Cancel
        </Button>
      </Link>
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
        handleAlertYes={handleAlertYes}>
        {Message}
      </AlertYesNo>
      <AlertYesNo
        isAlertOpen={openYes1}
        handleAlertClose={handleAlertClose1}
        handleAlertYes={handleAlertYes1}>
        {Message1}
      </AlertYesNo>

      <AlertDialogSuccess
        isAlertOpen={openYes2}
        handleAlertClose={handleAlertClose2}>
        {Message}
      </AlertDialogSuccess>
      <Dialog
        // fullScreen={fullScreen}
        open={allFeedMandatory}
        onClose={handleAllFeedMandatory}
        BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
        BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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

            Changes have been saved.
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

    </Stack>
    // </Footer>
  );
}

export default Footerbuttons;
