import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAppraiserRejectsNormalizerContext } from "../../../context/AppraiserRejectsNormalizer";
import { Link, useNavigate } from "react-router-dom";
import { useAppraiserAcceptNormalizerMutation, useCreateEmployeeAppraisalMutation } from "../../../service/employee/appraisal/appraisal";
import { AlertAcceptDialog } from "../..";
import { useCreateAzureBlobMutation } from "../../../service/azureblob";
import { useAttachmentsAppraiserMutation } from "../../../service/employee/appraisal/appraisal";
import { useUpdateEmployeeAppraisalMutation } from "../../../service/employee/appraisal/appraisal";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import { useNormalizerContext } from "../../../context/normalizerContext";
// import { useAppraiserRejectsNormalizerContext } from "../../../context/AppraiserRejectsNormalizer";
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

const Footerbuttons = (props: any) => {
  //@ts-ignore
  const { updateMutation, otherRecommendation, appraiserOverallFeedback, appraiserFeedbackComments, appraiserAreaOfImprovementComments, appraiserOtherRecommendationComments, appraiserTrainingRecommendationComments, checkboxIdHandler, checkboxHandler, employee_id, trainingRecommendationFormValues, overallFeed,setOverallFeed, areaImprovement, isLoading, empData, openSnackbar, acceptButton, setacceptButton, rejectButton, setrejectButton } = useAppraiserRejectsNormalizerContext()
  //@ts-ignore
  // const { otherRecommendationComments, trainingRecommendationComments, normalizerAreaImprovementComments, normalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerTrainingRecommendationComments } = useNormalizerContext()
  const { navPrompt, setnavPrompt, setValue,moveTab,setMoveTab } = props;
  
  // const {normalizerOtherRecommendationComments}=useNormalizerContext()
  const [appraiserAcceptNormalizer] = useAppraiserAcceptNormalizerMutation()
  const [updateObjectiveDescription] = useUpdateEmployeeAppraisalMutation();
  const [sendItem, { data }] = useCreateAzureBlobMutation();
  const [attachmentsAppraiser] = useAttachmentsAppraiserMutation()
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] = useState("");
  // const [updateMutation] = useCreateEmployeeAppraisalMutation()
console.log(appraiserOverallFeedback,"appraiserOverallFeedback")
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {

    setOpen(true);
    // setNewId(id);
    // setNewName(nameAlert);
  };
  const handleClickIdClose = () => {
    //setnavPrompt(false)
    appraiserAcceptNormalizer(employee_id);
    setOpen(false);
    navigate("/normalizer");

  };

  // if (isLoading) {
  //   <p>Loading...</p>
  // }
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  const [navsaveandsubmitTrigger, setnavsaveandsubmitTrigger] = useState(false);
  const [appraiserComments, setAppraiserComments] = useState<any>("")
  const [message, setMessage] = useState<any>("")
  const [fileSelected, setFileSelected] = useState<any>('');


  const imageClick = () => {
    const newData = {
      // token:tokens,
      // newstitle: newsTitle,
      // newsdesc: convertedContent,
      newspic: fileSelected,
      // newspicname: name

    };

    sendItem(newData).then((res: any) => {
      attachmentsAppraiser({
        attachments: {
          // url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id
      })
    })
  }
  // const [message, setmessage] = React.useState('');

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    // if (!fileList) return;
    //@ts-ignore
    setName(fileList[0].name)
    // setFileSelected(fileList[0]);
    let reader = new FileReader();
    //@ts-ignore
    reader.readAsDataURL(fileList[0])
    reader.onload = (e) => {
      setFileSelected(e.target?.result)

    }
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
  const handleSave = () => {
    
    if(appraiserOverallFeedback == null || appraiserOverallFeedback == undefined || appraiserOverallFeedback == ""){
      setMessage('Please add the rejection reasons in the Overall Feedback')
      setAllFeedMandatory1(true)
    }else if (overallFeed[0]?.value == "" || overallFeed[1]?.value == "" || overallFeed[2]?.value == ""){
      setMessage("Please add Feedback Questionnaire on the Recommendation page.")
    setAllFeedMandatory1(true)
    }else if(areaImprovement[0]?.value == "" || areaImprovement[0]?.specific_actions[0]?.value == ""){
      setMessage("Please add Area of Improvement on the Recommendation page.")
      setAllFeedMandatory1(true)
    } else if ((trainingRecommendationFormValues.filter((i:any) => {
      return (i.name == "" || i.training_name == "" || i.justification == "")
    }).length > 0)){
      setMessage("Please add Training Recommendation on the Recommendation page.")
      setAllFeedMandatory1(true);
    }
     else if ((checkboxIdHandler(checkboxHandler(otherRecommendation))).length === 0){
      setMessage("Please add Other Recommendation on the Recommendation page.")
      setAllFeedMandatory1(true);
    }
    else{
      updateMutation({
        // "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.appraiser_overall_feedback": appraiserOverallFeedback,
        "appraisal.training_recommendation":
          trainingRecommendationFormValues,
        "appraisal.feedback_questions": overallFeed,
        "appraisal.area_of_improvement": areaImprovement,
        // "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
        // "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
        // "appraisal.feedback_questions_comments": appraiserFeedbackComments,
        // "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
        // "normalizerIsChecked": false,
        // "normalizerIsDisabled": false,
        // "normalizer.normalizer_status": 'appraiser-rejected',
        // "appraiserIsDisabled": false,
        // "appraisal.appraiser_status": "appraiser-rejected",
        id: employee_id,
      });
     setMessage('Changes have been saved.')
    setAllFeedMandatory1(true)
    }
  }
  console.log(overallFeed,"overallFeed")
  console.log(areaImprovement[0]?.specific_actions[0]?.value,"areaImprovement")

  useEffect(() => {
    if (navPrompt === false && navTrigger === true) {
      console.log('nav')
      handleClickIdClose()
    }
  }, [navTrigger]);
  // useEffect(() => {
  //   if(navPrompt === false && navsaveandsubmitTrigger === true){
  //     console.log('nav')
  //     let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")
  //     let overallFeedValues = overallFeed.filter((item: any) => item.value != "")
  //     updateMutation({
  //         "appraisal.other_recommendation": checkboxIdHandler(
  //             checkboxHandler(otherRecommendation)
  //         ),
  //         // "appraisal.appraiser_overall_feedback": appraiserOverallFeedback,
  //         "appraisal.training_recommendation":
  //         trainingRecommendationValues,
  //         "appraisal.feedback_questions": overallFeedValues,
  //         "appraisal.area_of_improvement": areaImprovement,
  //         "reviewerIsChecked": false,
  //         "reviewerIsDisabled": false,
  //         "reviewer.reviewer_status": 'appraiser-rejected',
  //         "appraiserIsDisabled": false,
  //         // "appraiser_status": "reviewer-rejected",
  //         "normalizerIsDisabled": true,
  //         "normalizerIsChecked": true,
  //         id: employee_id,
  //     })
  //     setAllFeedMandatory(true);
  //   //   navigate(`/dashboardreview`)

  //   }
  //  }, [navsaveandsubmitTrigger]);
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    setMoveTab(false);
    setMessage('')
  };
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    // setMoveTab(false);
    setMessage('')
  };

  const saveHandler = () => {
    if (appraiserComments) {
      let Message = "";
      let Status = false;
      let temp = appraiserComments?.map((i: any) => {
        console.log(i, 'iiiiiiiiii')

        // if (employeeData?.data?.appraisal?.potential === true) {
        //   Status = true;
        //   Message = "Please select the Potential Level."
        // }
        // else if (i.ratings === "" || i.ratings === undefined) {
        //   Status = true;
        //   Message = "Please enter rating for all the Objective Titles."
        // }
        // else if (i.remarks === "") {
        //   Status = true;
        //   Message = "Please enter comments for all the Objective Titles."
        // }
        // return {
        //   Status,
        //   Message
        // }

      })

      if (temp) {
        temp.map((i: any) => {
          if (i.Status === true) {
            setOpen(true);
            setMessage(Message)
          } else if (i.Status === false) {
            setOpen(false);
            updateObjectiveDescription(
              {
                "appraisal.objective_description": appraiserComments,
                "appraisal.appraiser_status": 'normalizer-rejected-draft',
                id: employee_id,
              }
            ).then((j: any) => {
              if (!j.error) {
                setOpen(true);
                setMessage("The recommendations are saved successfully.")
              }
            })
          }
        })
      }
    }
  }
  console.log(moveTab,"new")
  const moveTabHandler = () => {  
    if (moveTab === true) {
      setAllFeedMandatory(true);
      setMessage("Please save the changes before leaving the page.");
    } 
    else {
      setValue(0);
    }
  }
 
  //nav prompt
  return (
    // <Footer>
    <Stack justifyContent="center" spacing={2} direction="row"
      marginTop={"20px"}
    >
      {/* <Button
                variant="contained"
                disabled={acceptButton}
                style={{
                    fontSize: "15px",
                    textTransform: "none",
                    color:"#3e8cb5",
                    fontFamily:"Arial",
                    background:"transparent",
                    borderColor:"#3e8cb5"
                }}
                 onClick={handleClickOpen}
               >
                <Typo1>save</Typo1>
            </Button> */}
      {/* <Link to={`/reviewer`}>
                <Button
                    variant="contained"
                    disabled={openSnackbar}
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
                            "reviewer.other_recommendation": checkboxIdHandler(
                                checkboxHandler(otherRecommendation)
                            ),
                            "reviewer.training_recommendation":
                                trainingRecommendationFormValues,
                            "reviewer.feedback_questions": overallFeed,
                            "reviewer.area_of_improvement": areaImprovement,
                            id: employee_id,
                        })
                        navigate(`/dashboardreview`)
                    }}
                >
                    <Typo1>Save</Typo1>
                </Button>
            </Link> */}

      {/*<Link to={`/reviewer`}>*/}
      <Button
        variant="outlined"
        // disabled={openSnackbar || rejectButton}
        style={{
          fontSize: "15px",
          textTransform: "none",
          color: "#3e8cb5",
          fontFamily: "Arial",
          background: "transparent",
          borderColor: "#3e8cb5",
           height:"35px"

        }}
        onClick={() => {
          handleSave();
          setnavPrompt(false);
          // setnavsaveandsubmitTrigger(true);

          // if (name && fileSelected) {
          //     return imageClick();
          //   }
        }}
      >
        Save as Draft
      </Button>
      {/*</Link>*/}

      <Button
        variant="outlined"
        style={{
          color: "#3e8cb5",
          fontSize: "15px",
          textTransform: "none",
          fontFamily: "Arial",
          background: "transparent",
          borderColor: "#3e8cb5",
          height:"35px",
          width:"70px"

        }}
        onClick={() => {
          // setValue(0);
          moveTabHandler();
          // saveRecommendationsHandler();
        }}
      >
        {/* <Link to={`/dashboardreview`}> */}
        Back
        {/* </Link> */}

      </Button>
      <Dialog
                  // fullScreen={fullScreen}
                  open={allFeedMandatory1}
                  onClose={handleAllFeedMandatory1}
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
                      margin:"0px",
                      padding:"30px",
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
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={handleAllFeedMandatory1}
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
      <AlertAcceptDialog
        isAlertOpen={open}
        handleAlertClose={handleClickClose}
        handleAlertIdClose={() => {
          setnavPrompt(false);
          setnavTrigger(true);
        }}

      >
        You are accepting the Normalizer's ratings. Do you confirm?
      </AlertAcceptDialog>
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
              // paddingBottom: "12px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              // height: "100px",
              // width: "300px",
              alignItems: "center",
              overflowY: "hidden",
            }}
          >
            {/* The recommendations are saved successfully! */}
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
            }}
            variant="outlined"
            autoFocus
            onClick={handleAllFeedMandatory}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Stack >
    // </Footer>
  );
}

export default Footerbuttons;
