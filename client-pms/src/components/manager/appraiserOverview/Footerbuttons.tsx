import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import { CREATE_APPRAISAL, DASHBOARDM } from "../../../constants/routes/Routing";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import { Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Typo1 = styled("div")({
  // fontSize: '16px',
  // fontWeight: 400
  paddingRight: "5px",
});

function Footerbuttons(props: any) {
  const { setnavPrompt, navPrompt, setValue} = props;
  // @ts-ignore
  const { updateMutation, otherRecommendation, employee_id, checkboxIdHandler, checkboxHandler, trainingRecommendation, trainingRecommendationFormValues, performanceImprovement, performanceSpecific, overallFeed, errorHandler, areaImprovement, handleClick, openSnackbar, appOverallFeed, emptyAppOverall, setEmptyAppOverall, empData,moveTab,setMoveTab, potentialValue
  } = useAppraisalContext();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [message, setMessage] = useState("")
  const [emptyArea, setEmptyArea] = useState(false)
  const [emptyAreaMessage, setEmptyAreaMessage] = useState("") 

  // const {employee_id} = useParams()
  const [emptyAlert, setEmptyAlert] = useState<any>("")
  const [emptyAlert1, setEmptyAlert1] = useState<any>(false)
  console.log(updateMutation, "````11111`````2222222````");

  console.log(areaImprovement, 'tttttttttttt')

  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    // setMoveTab(false);
    setMessage('')
  };
  
  const moveTabHandler = () => {  
    if (moveTab === true) {
      setAllFeedMandatory(true);
      setMessage("Please save the changes before leaving the page.");
    } else {
      setValue(0);
    }
  }

  const navigate = useNavigate()
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  const [navsaveandsubmitTrigger, setnavsaveandsubmitTrigger] = useState(false);

  useEffect(() => {
    if (areaImprovement) {
      let status = false;
      let Message = "";
      let temp = areaImprovement.map((i: any) => {
        console.log(i, 'iiiiiiiiii')
        if (i.value === "") {
          status = true;
          Message = "Please add Specific Areas on the Recommendation page."
        } else if (i.specific_actions) {
          let temp1 = i.specific_actions.map((j: any) => {
            if (j.value === "") {
              status = true;
              Message = "Please add Specific Action on the Recommendation page."
            }
            return {
              status,
              Message
            }
          })
          if (temp1) {
            temp1.map((k:any) => {
              if (k.status === true) {
                status = true;
                Message = "Please add Specific Action on the Recommendation page."
              } else {
                status = false;
                Message = " "
              }
            })
          }
        }
        return {
          status,
          Message
        }
      })
      console.log(temp, areaImprovement, 'temppppp')
      if (temp) {
        temp.map((i: any) => {
          if (i.status === true) {
            setEmptyArea(true)
            // setAllFeedMandatory(true);
            setEmptyAreaMessage(Message)
            // setEmptyAppOverall(true)
          } else if (i.status === false) {
            setEmptyArea(false)
          }
        })
      }
    }
  })

  const dialogHandler = () => {
    let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")
    let overallFeedValues = overallFeed.filter((item: any) => item.value != "")
    if (appOverallFeed === "") {
      setAllFeedMandatory(true);
      setMessage("Please add Overall Feedback on the Recommendation page.")
      setEmptyAppOverall(true)
    } else if (emptyArea === true) {
      setAllFeedMandatory(true);
      setMessage(emptyAreaMessage)
      setEmptyAppOverall(true)
    }
    else if (overallFeedValues.length === 0) {
      setAllFeedMandatory(true);
      setMessage("Please add Feedback Questionnaire on the Recommendation page.");
      setEmptyAppOverall(true)
    }
    else if ((trainingRecommendationFormValues.filter((i:any) => {
      return (i.name == "" || i.justification == "" || i.training_name == "")
    }).length > 0)) {
      setAllFeedMandatory(true);
      setMessage("Please add Training Recommendation on the Recommendation page.")
      setEmptyAppOverall(true)
    }
    // else if ((checkboxIdHandler(checkboxHandler(otherRecommendation))).length === 0) {
    //   setAllFeedMandatory(true);
    //   setMessage("Please add Other Recommendation on the Recommendation page.")
    //   setEmptyAppOverall(true)
    // }
    else {
      setnavPrompt(false);
      setnavTrigger(true);
      setEmptyAppOverall(false)
    }
  }


  const dialog1Handler = () => {
    if (appOverallFeed === "") {
      setAllFeedMandatory(true);
      setEmptyAppOverall(true)
    } else if (appOverallFeed != "") {
      setnavPrompt(false);
      setnavsaveandsubmitTrigger(true);
      setEmptyAppOverall(false)
    }
  }


  useEffect(() => {

    if (navPrompt === false && navTrigger === true) {
      console.log('nav')
      let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")
      let overallFeedValues = overallFeed.filter((item: any) => item.value != "")
      updateMutation({
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.training_recommendation":
          trainingRecommendationValues,
        "appraisal.feedback_questions": overallFeedValues,
        "appraisal.area_of_improvement": areaImprovement,
        "appraisal.appraiser_overall_feedback": appOverallFeed,
        "appraisal.appraiser_status": 'draft',
        id: employee_id,
      }).then((res: any) => {
        // if (res.data) navigate(`/dashboardreview`)
        console.log(res);
        setnavPrompt(false);
        setMoveTab(false);
        setAllFeedMandatory(true);
        setMessage("Changes have been saved.")

      });
      errorHandler();
      handleClick();

    }
    //  }
    //  else if (appOverallFeed === "" ) {
    //     setOverallFeedMandatory(true)
    //   }
    setnavTrigger(false)
  }, [navTrigger]);


  useEffect(() => {
    if (navPrompt === false && navsaveandsubmitTrigger === true) {
      console.log('nav')
      let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")
      let overallFeedValues = overallFeed.filter((item: any) => item.value != "")
      updateMutation({
        "appraisal.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal.training_recommendation":
          trainingRecommendationValues,
        "appraisal.feedback_questions": overallFeedValues,
        "appraisal.area_of_improvement": areaImprovement,
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
  //nav prompt
  return (
    <>
      <Stack justifyContent="center" spacing={2} direction="row">
        {/* <Link to={`/dashboardreview`}> */}
        <Button
          disabled={openSnackbar}
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
          }}
          onClick={() => {
            // let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")
            // let overallFeedValues = overallFeed.filter((item: any) => item.value != "")
            // updateMutation({
            //   "appraisal.other_recommendation": checkboxIdHandler(
            //     checkboxHandler(otherRecommendation)
            //   ),
            //   "appraisal.training_recommendation":
            //     trainingRecommendationValues,
            //   "appraisal.feedback_questions": overallFeedValues,
            //   "appraisal.area_of_improvement": areaImprovement,
            //   "appraisal.appraiser_status": 'draft',
            //   id: employee_id,
            // }).then((res: any) => {
            //   if (res.data) navigate(`/dashboardreview`)
            //   console.log(res);
            //   setnavPrompt(false)
            // });
            // errorHandler();
            // handleClick();
            // setnavPrompt(false);
            // setnavTrigger(true);
            dialogHandler()
            // navigate(`/dashboardreview`)--not req
          }}
        >
         Save as Draft
        </Button>
        {/* </Link> */}

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
                fontFamily:"Arial",
                // paddingBottom: "12px",
                // paddingRight: "10px",
                // paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                alignItems: "center",
                overflowY:"hidden",
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
              //paddingBottom: "30px"
            }}
          >
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                // marginRight: "10px",
                color:"#3e8cb5",
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

        {/*<Link to={`/dashboardreview`}>*/}
        {/* <Button
          variant="outlined"
          disabled={openSnackbar}
          onClick={() => {

            // let trainingRecommendationValues = trainingRecommendationFormValues.filter((item: any) => item.name != "")
            // let overallFeedValues = overallFeed.filter((item:any)=>item.value!="")
            // updateMutation({
            //   "appraisal.other_recommendation": checkboxIdHandler(
            //     checkboxHandler(otherRecommendation)
            //   ),
            //   "appraisal.training_recommendation":
            //     trainingRecommendationValues,
            //   "appraisal.feedback_questions": overallFeedValues,
            //   "appraisal.area_of_improvement": areaImprovement,
            //   "appraisal.appraiser_status": 'submited',
            //   "appraisal.status": "in-progress",
            //   "reviewer.status": "in-progress",
            //   "normalizer.status": "in-progress",
            //   "reviewerIsDisabled": false,
            //   "reviewerIsChecked": false,
            //   "reviewer.reviewer_status": 'pending',


            //   id: employee_id,
            // }).then((res: any) => {
            //   if (res.data) navigate(`/dashboardreview`)
            //   console.log(res);
            //   setnavPrompt(false)
            // });
            // errorHandler();
            // setnavPrompt(false);
            // setnavsaveandsubmitTrigger(true);
            dialog1Handler()
            // navigate(`/dashboardreview`)
          }}
          
          style={{
            backgroundColor: "Transparent",
            fontSize: "15px",
            fontWeight: 400,
            textTransform: "none",
            color:"#3e8cb5",
            borderColor: "#3E8CB5",
          }}
        >
          Save and Submit
        </Button> */}
        {/*</Link>*/}

        <Button
          variant="outlined"
          style={{
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "15px",
            fontFamily: "Arial",
            borderColor: "#3E8CB5",
            color: "#3E8CB5",
            height: "35px",
              width: "70px",
            background: "transparent",
          }}
          onClick={() => {
            // setValue(0);
            moveTabHandler()           
            // saveRecommendationsHandler();
          }}
        >
          Back
        </Button>

      </Stack>
    </>
  );
}

export default Footerbuttons;
