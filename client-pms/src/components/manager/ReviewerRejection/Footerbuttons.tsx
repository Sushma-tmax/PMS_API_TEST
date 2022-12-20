import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAppraiserRejectsReviewerContext } from "../../../context/AppraiserRejectsReviewer";
import { Link, useNavigate } from "react-router-dom";
import { useAppraiserAcceptReviewerMutation } from "../../../service/employee/appraisal/appraisal";
import { AlertAcceptDialog } from "../..";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import AlertYesNo from "../../UI/DialogYesNo";
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
    //@ts-ignore
    const { updateMutation, otherRecommendation, appraiserFeedbackComments, appraiserAreaOfImprovementComments, appraiserOtherRecommendationComments, appraiserTrainingRecommendationComments, checkboxIdHandler, checkboxHandler, employee_id, trainingRecommendationFormValues, overallFeed, areaImprovement, isLoading, empData, openSnackbar, acceptButton, setacceptButton, rejectButton, setrejectButton, appraiserOverallFeedback, moveTabValue, setMoveTabValue, potentialValue, setPotentialValue } = useAppraiserRejectsReviewerContext()
    console.log(acceptButton, 'acceptButton')
    const { navPrompt, setnavPrompt, setValue } = props;
    const [appraiserAcceptReviewer] = useAppraiserAcceptReviewerMutation();
    const [open, setOpen] = useState(false);
    const [openYes, setOpenYes] = useState(false);
    const [openYes1, setOpenYes1] = useState(false);
    const [openYes2, setOpenYes2] = useState(false);
    const [openYesReject, setOpenYesReject] = useState(false);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const handleClickClose = () => {
        setOpenYes(false);
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpenYes(true);
        setMessage("Did you review the recommendations ?")
        // setOpen(true);
        // setNewId(id);
        // setNewName(nameAlert);
    };

    const handleAlertYes = () => {
        setOpen(true);

    }

    const handleAlertYesReject = () => {
        // setOpenYesReject(false);
        setOpenYes1(true);
        setMessage("Are you sure you would like to reject the Performance Appraisal?")
    }

    const handleAlertYes1 = () => {
        let appraiserObjDesc =  empData?.data?.appraisal?.objective_description?.map(
            (i: any) => {
              return {
                ...i,
                action_performed: false,
              };
            }
          );
        setOpenYes1(false);
        setMessage("");
        updateMutation({
            "appraisal.objective_description" : appraiserObjDesc,
            "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
            // "appraisal.other_recommendation": checkboxIdHandler(
            //     checkboxHandler(otherRecommendation)
            // ),
            // "appraisal.training_recommendation":
            //     trainingRecommendationFormValues,
            // "appraisal.feedback_questions": overallFeed,
            // "appraisal.area_of_improvement": areaImprovement,
            // "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
            // "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
            // "appraisal.feedback_questions_comments": appraiserFeedbackComments,
            // "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
            // "appraisal.appraiser_overall_feedback": appraiserOverallFeedback,
            "reviewerIsChecked": false,
            "reviewerIsDisabled": false,
            "reviewer.reviewer_status": 'appraiser-rejected',
            "appraiserIsDisabled": false,
            "appraisal.appraiser_status": "appraiser-rejected",
            "appraisal.potential": potentialValue,
            id: employee_id,
        })
        setAllFeedMandatory(true);
    }

    const handleAlertNo1 = () => {
        setOpenYes1(false);
        setOpenYesReject(false)
        // setMessage("");
    }

    const handleAlertNo = () => {
        setOpenYes(false);
        // setMessage("");
        setValue(1);
    }

    const handleAlertNoReject = () => {
        setOpenYesReject(false);
        // setMessage("");
        setValue(1);
        // setOpenYes1(false);
    }

    const handleClickIdClose = () => {
        setnavPrompt(false)
        // appraiserAcceptReviewer(employee_id)
        setOpen(false);
        navigate("/dashboardreview",{state:{
            from: `${1}`
        }});

    };

    const updateRejectionCount = (count: any) => {
        if (count === 0 || count === undefined) {
            return 1;
        } else if (count === 1) {
            return 2;
        } else if (count === 2) {
            return 3;
        }
    }
    const acceptData = () => {
        let appraiserObjDesc =  empData?.data?.appraisal?.objective_description?.map(
            (i: any) => {
              return {
                ...i,
                action_performed: false,
              };
            }
          );
        updateMutation({
            "appraisal.objective_description" : appraiserObjDesc,
            // obj: empData.data.appraisal.objective_description,
            "appraisal.other_recommendation": checkboxIdHandler(
                checkboxHandler(otherRecommendation)
            ),
            "appraisal.potential": potentialValue,            
            // "reviewerIsChecked": false,
            // "reviewerIsDisabled": false,
            // "reviewer.reviewer_status": 'pending',
            // "appraiserIsDisabled": false,
            // "appraisal.appraiser_status": "accepted",
            // "appraisal.potential": potentialValue,
            // "appraisal.training_recommendation":
            //     trainingRecommendationFormValues,
            // "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
            // "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
            // "appraisal.feedback_questions_comments": appraiserFeedbackComments,
            // "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
            // "appraisal.feedback_questions": overallFeed,
            // "appraisal.area_of_improvement": areaImprovement,
            id: employee_id,
        });
        appraiserAcceptReviewer(
             employee_id 
        ).then((data:any)=>{
            if(!data.error){
                setAllFeedMandatory(true)
            }
        })
    }
    // if (isLoading) {
    //   <p>Loading...</p>
    // }
    //nav prompt
    const [navTrigger, setnavTrigger] = useState(false);
    console.log(navTrigger, 'navTrigger')
    const [navsaveandsubmitTrigger, setnavsaveandsubmitTrigger] = useState(false);
    useEffect(() => {
        if (navPrompt === false && navTrigger === true) {
            console.log('nav')
            handleClickIdClose()
        }
        setnavTrigger(false)
    }, [navTrigger]);
    // useEffect(() => {
    //     if (navPrompt === false && navsaveandsubmitTrigger === true) {
    //         console.log('nav')
    //         updateMutation({
    //             "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
    //             "appraisal.other_recommendation": checkboxIdHandler(
    //                 checkboxHandler(otherRecommendation)
    //             ),
    //             "appraisal.training_recommendation":
    //                 trainingRecommendationFormValues,
    //             "appraisal.feedback_questions": overallFeed,
    //             "appraisal.area_o   f_improvement": areaImprovement,
    //             "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
    //             "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
    //             "appraisal.feedback_questions_comments": appraiserFeedbackComments,
    //             "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
    //             "reviewerIsChecked": false,
    //             "reviewerIsDisabled": false,
    //             "reviewer.reviewer_status": 'appraiser-rejected',
    //             "appraiserIsDisabled": false,
    //             "appraisal.appraiser_status": "appraiser-rejected",
    //             id: employee_id,
    //         })
    //         //navigate(`/dashboardreview`)


    //     }
    // }, [navsaveandsubmitTrigger]);
    //nav prompt
    const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
    const handleAllFeedMandatory = () => {
        setAllFeedMandatory(false);
    };
    const rejectionHandler = () => {
        setOpenYesReject(true);
        setMessage("Did you review the recommendations ?")


        // updateMutation({
        //     "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
        //     "appraisal.other_recommendation": checkboxIdHandler(
        //         checkboxHandler(otherRecommendation)
        //     ),
        //     "appraisal.training_recommendation":
        //         trainingRecommendationFormValues,
        //     "appraisal.feedback_questions": overallFeed,
        //     "appraisal.area_o   f_improvement": areaImprovement,
        //     "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
        //     "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
        //     "appraisal.feedback_questions_comments": appraiserFeedbackComments,
        //     "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
        //     "appraisal.appraiser_overall_feedback": appraiserOverallFeedback,
        //     "reviewerIsChecked": false,
        //     "reviewerIsDisabled": false,
        //     "reviewer.reviewer_status": 'appraiser-rejected',
        //     "appraiserIsDisabled": false,
        //     "appraisal.appraiser_status": "appraiser-rejected",
        //     id: employee_id,
        // })
        // setAllFeedMandatory(true);
    }
    return (
        // <Footer>
        <Stack justifyContent="center" spacing={2} direction="row">
            <>
                {/*<Link to={`/dashboardreview`}>*/}
                <>
                    <AddButton
                        variant="outlined"
                        disabled={acceptButton}
                        style={{
                            fontSize: "15px",
                            fontFamily: "Arial",
                            width: "70px",
                            height: "35px",
                            background: "transparent",
                        }}
                        // style={{
                        //     fontSize: "15px",
                        //     textTransform: "none",
                        //     color: "#3e8cb5",
                        //     fontFamily: "Arial",
                        //     background: "transparent",
                        //     borderColor: "#3e8cb5",

                        // }}
                        onClick={handleClickOpen}

                    >
                        <Typo1>Accept</Typo1>
                    </AddButton>
                </>


                {/*</Link>*/}
                {/* <Link to={`/dashboardreview`}>
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
                                "appraisal.other_recommendation": checkboxIdHandler(
                                    checkboxHandler(otherRecommendation)
                                ),
                                "appraisal.training_recommendation":
                                    trainingRecommendationFormValues,
                                "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
                                "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
                                "appraisal.feedback_questions_comments": appraiserFeedbackComments,
                                "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
                                "appraisal.feedback_questions": overallFeed,
                                "appraisal.area_of_improvement": areaImprovement,
                                id: employee_id,
                            })
                            navigate(`/dashboardreview`)
                        }}
                    >
                        <Typo1>Save</Typo1>
                    </Button>
                </Link> */}



                {/*<Link to={`/dashboardreview`}>*/}
                <AddButton
                    variant="outlined"
                    disabled={openSnackbar || rejectButton}
                    style={{
                        fontSize: "15px",
                        fontFamily: "Arial",
                        width: "70px",
                        height: "35px"
                    }}
                    // style={{
                    //     fontSize: "15px",
                    //     textTransform: "none",
                    //     color: "#3e8cb5",
                    //     fontFamily: "Arial",
                    //     background: "transparent",
                    //     borderColor: "#3e8cb5"
                    // }}
                    onClick={() => {

                        // updateMutation({
                        //     "appraisal.rejection_count": updateRejectionCount(empData.data.appraisal.rejection_count),
                        //     "appraisal.other_recommendation": checkboxIdHandler(
                        //         checkboxHandler(otherRecommendation)
                        //     ),
                        //     "appraisal.training_recommendation":
                        //         trainingRecommendationFormValues,
                        //     "appraisal.feedback_questions": overallFeed,
                        //     "appraisal.area_o   f_improvement": areaImprovement,
                        //     "appraisal.other_recommendation_comments": appraiserOtherRecommendationComments,
                        //     "appraisal.training_recommendation_comments": appraiserTrainingRecommendationComments,
                        //     "appraisal.feedback_questions_comments": appraiserFeedbackComments,
                        //     "appraisal.area_of_improvement_comments": appraiserAreaOfImprovementComments,
                        //     "reviewerIsChecked": false,
                        //     "reviewerIsDisabled": false,
                        //     "reviewer.reviewer_status": 'appraiser-rejected',
                        //     "appraiserIsDisabled": false,
                        //     "appraisal.appraiser_status": "appraiser-rejected",
                        //     id: employee_id,
                        // })
                        // navigate(`/dashboardreview`)
                        setnavPrompt(false)
                        rejectionHandler();
                        //setnavsaveandsubmitTrigger(true);
                    }}
                >
                    Reject
                </AddButton>
                <Link
                    to={`/dashboardreview`}
                    state={{
                        from: `${1}`
                    }}
                >
                    <AddButton
                        variant="outlined"
                        // disabled={acceptButton}
                        style={{
                            fontSize: "15px",
                            fontFamily: "Arial",
                            width: "70px",
                            height: "35px",
                            background: "transparent",
                        }}
                    // style={{
                    //     fontSize: "15px",
                    //     textTransform: "none",
                    //     color: "#3e8cb5",
                    //     fontFamily: "Arial",
                    //     background: "transparent",
                    //     borderColor: "#3e8cb5",

                    // }}
                    // onClick={handleClickOpen}

                    >
                        <Typo1>Cancel</Typo1>
                    </AddButton>
                </Link>
                {/*</Link>*/}


                {/* <Link to={`/dashboardreview`}>
                <Button
                    variant="outlined"
                    style={{
                        fontSize: "15px",
                        textTransform: "none",
                        color:"#3e8cb5",
                        fontFamily:"Arial",
                        background:"transparent",
                        borderColor:"#3e8cb5"
                    }}
                >
                  
                        Go Back
                  

                </Button>
                </Link> */}

                <AlertYesNo
                    isAlertOpen={openYes}
                    handleAlertClose={handleAlertNo}
                    handleAlertYes={handleAlertYes}
                >
                    {message}
                </AlertYesNo>

                <AlertYesNo
                    isAlertOpen={openYesReject}
                    handleAlertClose={handleAlertNoReject}
                    handleAlertYes={handleAlertYesReject}
                >
                    {message}
                </AlertYesNo>

                <AlertYesNo
                    isAlertOpen={openYes1}
                    handleAlertClose={handleAlertNo1}
                    handleAlertYes={handleAlertYes1}
                >
                    {message}
                </AlertYesNo>


                <AlertAcceptDialog
                    isAlertOpen={open}
                    handleAlertClose={handleClickClose}
                    handleAlertIdClose={() => {
                        setnavPrompt(false);
                        setnavTrigger(true);
                        acceptData()
                        //handleClickIdClose();
                    }}
                >
                    Are you sure you would like to accept the Performance Appraisal?
                </AlertAcceptDialog>
                <Dialog
                    // fullScreen={fullScreen}
                    open={allFeedMandatory}
                    // onClose={handleAllFeedMandatory}
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
                            The performance appraisal has been successfully submitted to the Reviewer.
                            {/* {message} */}
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
                                onClick={handleAllFeedMandatory}
                            >
                                Ok
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>

            </>
        </Stack>
        // </Footer>

    );
}

export default Footerbuttons;