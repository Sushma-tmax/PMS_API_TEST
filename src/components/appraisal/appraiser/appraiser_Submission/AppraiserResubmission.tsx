import * as React from "react";
import { styled } from "@mui/material/styles";
import RTrecommandation from "./TrainingRecommendation";
import Checkboxs from "./FurtherRecommendation";
import Footerbuttons from "./OverallTab__FooterButtons";
import Performancefeedbacksummary from "./FeedbackQuestionnaire__AreasImprovement";
import Stack from "@mui/material/Stack";
import Headleft from "../../../../assets/Images/Headleft.svg";
import { IconButton, Typography, Button, Breadcrumbs } from "@mui/material";
import NormalizerRating from "./RatingTab__FooterButtons";
import { useContext, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import Headleft from "../../appraisal/components/Icons/Headleft.svg";
import { Link } from 'react-router-dom';
import { useNormalizerContext } from "../../../../context/normalizerContext";
//prompt -------functions
import ProvidedNormalizerContextProvider from '../../../../context/normalizerContext';
import ProvidedReviewerContext from "../../../../context/AppraiserRejectsNormalizer"
import NFeedbackComments from "./AppraiserMessageForEmployee__ReviewerComments";
import ProvidedReviewerContextProvider from "../../../../context/reviewerContextContext";
import { APPRAISER_VIEW_PA } from "../../../../constants/routes/Routing";
import { useNavigate, useParams } from "react-router-dom";


export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {

      any: any
    }
  }
  React.useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {

          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
//prompt -------functions

const Container1 = styled("div")({
  // position: "relative",
  // width: "96%",
  // height: "1907px",
  // marginLeft: "25px",
  // marginRight: "25px",
  // marginTop: "24px",
  textTransform: "none",
  paddingBottom:"25px"
});
const Train = styled("div")({
  // marginLeft: "25px",
  // marginRight:"25px",
  //background: "#F2F9FA",
  //height: "1280px",
  // marginLeft: "25px",
  // background: "#FFFFFF",
  marginLeft: "2.5%",
  // marginRight: "2.5%",
  // marginTop: "30px",
  // textTransform: 'none'
});
const Container2 = styled("div")({

  // background: "#F2F9FA",
  // marginTop: "-10px",
  marginLeft: "25px",
  marginRight: "25px",
  textTransform: 'none',
  background: "#FFFFFF",
  padding:"35px",
  paddingTop:"0px"

});

const Footer = styled("div")({
  // marginLeft: "450px",
  paddingTop: "120px",
  paddingBottom: "45px",
  // marginTop : "20px"
});
const Contain1 = styled("div")({
  // marginLeft: "450px",
  // paddingTop: "30px",
  // paddingBottom: "45px",
  // marginTop : "20px"
});
const Heading1 = styled("div")({
  fontSize: "24px",
  fontWeight: 400,
  color: "#004C75",
  marginLeft: "20px",
  marginTop: "20px",
  fontFamily: "regular",
});
const AppraiserSubmission = (props: any) => {
  //@ts-ignore
  //prompt ------functions
  const { employee_id } = useParams();
  let navigate = useNavigate();
  const [navPrompt, setnavPrompt] = React.useState(false);
  const [objectiveDescription, setobjectiveDescription] = React.useState<any>([]);
  const [isCheckedothers, setisCheckedothers] = React.useState(false);

  //Tab functionalities 
  const [value, setValue] = React.useState(0);
  const [moveTab, setMoveTab] = React.useState<any>(false)
  const [othersdisable, setothersdisable] =React.useState(false);

  const [rejectAlert, setrejectAlert] = React.useState(false);
  console.log(value, 'Tabvalue')
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (moveTab === true) {
      setrejectAlert(true);
    } else {
      setValue(newValue);
    }
  };
  const handleSliderDialogClose = () => {

    setrejectAlert(false);

  };
  const handleSliderDialogCancel = () => {
    if (value === 0) {
      setValue(1)
    } else {
      setValue(0)
    }
    setrejectAlert(false);

  };
  //Tab functionalities

  console.log(navPrompt, 'navPrompt')
  const formIsDirty = navPrompt;
  usePrompt(
  // 'Please save the changes before you leave the page.',
  "Any changes you have made will not be saved if you leave the page.",
   formIsDirty);
  //prompt ------functions


  const { employeeData, trainingData, ratingData, otherData, fetchCancel, trainingCancel, areaCancel, otherCancel } = props;

  // if (employeeData && employeeData?.data.appraisal.appraiser_status !== 'normalizer-rejected') {
  //   return (
  //     <>Normalizer should reject first </>
  //   )
  // }
  console.log("usenormContext");

  console.log(employeeData, "empdata"); console.log("usenormContext");
  // console.log(employeeData.data.reviewer.reviewer_rejected_value.filter((j:any) => j.value === "rating")[0].isChecked,'employeeData')



  const checkIfRejected = (value: string) => {
    if (employeeData !== undefined) {
      return employeeData?.data?.normalizer?.normalizer_rejected_value?.filter(
        (j: any) => j?.value === value
      )[0]?.isChecked;
    }
  };

  React.useEffect(() => {
    if (employeeData) {
    if (!employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser")) {
      navigate(`${APPRAISER_VIEW_PA}/employee/${employee_id}`)
    }
    }
  },[employeeData])


  return (
    // <ProvidedReviewerContext>
      <>
        {/* {employeeData.data.appraisal.appraiser_status && */}
        <>


          <div style={{ backgroundColor: "#F1F1F1" }}>
            {/* <Train> */}
            <Dialog
              open={rejectAlert}
              // onClose={handleSliderDialogClose}
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
                  Please save the changes before leaving the page.
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
                      color: "#3E8CB5",
                      // marginRight: "10px",
                      height: "35px",
                      width: "70px",
                      background: "transparent"
                    }}
                    variant="outlined"
                    autoFocus
                    onClick={handleSliderDialogClose}
                  // onClick={() => {
                  //   handleClickOpen1();
                  //   handleClose();
                  // }}
                  >
                    Ok
                  </Button>
                  {/* <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  marginRight: "10px",
                  height:"35px",
                  width:"70px",
                  background:"transparent"
                }}
                variant="outlined"
                autoFocus
                onClick={handleSliderDialogCancel}
              // onClick={() => {
              //   handleClickOpen1();
              //   handleClose();
              // }}
              >
                Cancel
              </Button> */}
                </DialogActions>
              </div>
            </Dialog>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0}
              marginLeft="25px"
              // marginTop='20px'
              minHeight="50px"
            >
              {/* <IconButton >
                <Link
                  to={`/dashboardreview`}
                // onClick={() => startAppraisal(j._id)}
                >
                  <img src={Headleft} alt="icon" />
                </Link>
              </IconButton> */}
              {/* <Typography
            style={{
              paddingLeft: "5px",
              fontSize: "24px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          >
            {" "}
            {employeeData && employeeData?.data?.calendar?.name}
          </Typography> */}
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  style={{
                    fontSize: "18px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                  }}
                  color="inherit" to={`/dashboardreview`}> My Team Dashboard</Link>
                <Link style={{
                  fontSize: "18px",
                  color: "#3e8cb5",
                  fontFamily: "Arial",
                }}
                  color="inherit"
                  to={`/dashboardreview`}
                  state={{
                    from: `${1}`
                  }}

                >My Actions</Link>
                <Typography style={{
                  fontSize: "18px",
                  color: "#333333",
                  fontFamily: "Arial",
                }} 
                // color="text.primary" to={""}
                //  aria-current="page" 
                 >
                  {employeeData && employeeData?.data?.calendar?.name}
                </Typography>
              </Breadcrumbs>
            </Stack>
            {/* </Train> */}

            <Container1>

              {/* <Header/> */}

              {employeeData && (
                //  && checkIfRejected("rating") 

                // <HeaderTabs employee1Data={employeeData} rating1Data={ratingData} />
                <NormalizerRating
                objectiveDescription={objectiveDescription}
                setObjectiveDescription={setobjectiveDescription}              
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
                  value={value}
                  setValue={setValue}
                  handleChange={handleChange}
                  moveTab={moveTab}
                  setMoveTab={setMoveTab}
                />
              )}

              {/* {employeeData && checkIfRejected('rating') &&<Navcancelbuttons/>} */}

              <Container2>
                {value === 1 &&
                  <div>
                    {/* <ProvidedNormalizerContextProvider> */}
                      <Performancefeedbacksummary
                        employeeData={employeeData}
                        navPrompt={navPrompt}
                        setnavPrompt={setnavPrompt}
                        moveTab={moveTab}
                        setMoveTab={setMoveTab}
                      />

                      {employeeData && (
                        // && checkIfRejected("training_recommendation(s)") 
                        <>                         
                         {employeeData?.data?.appraisal_template?.training_recommendation?.length > 0 && ( <RTrecommandation employeeData={employeeData} training1Data={trainingData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} moveTab={moveTab}
                            setMoveTab={setMoveTab} />
)}
                        </>
                      )}
                      {/*{employeeData && checkIfRejected("training_recommendation(s)") && (*/}
                      {/*  <Table2 />*/}
                      {/*)}*/}

                      {/*{employeeData && checkIfRejected("other_recommendation(s)") && (*/}
                      {/*  <ReviewerOtherRecommendations />*/}
                      {/*)}*/}
                      {employeeData &&
                        (
                          <>                    

                          {employeeData?.data?.appraisal_template?.other_recommendation?.length > 0 && (  <Checkboxs 
                          isCheckedothers={isCheckedothers}
                          setothersdisable={setothersdisable}
                          othersdisable={othersdisable}
                          setisCheckedothers={setisCheckedothers}
                          other1Data={otherData} 
                          employeeData={employeeData} navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                              moveTab={moveTab}
                              setMoveTab={setMoveTab}
                            />)}
                            {/* </ProvidedReviewerContextProvider> */}

                          </>
                        )}
                      <Contain1>
                        <ProvidedReviewerContextProvider>
                          {/* this component has Appraiser Message for Employee And Reviewer Comments */}
                          <NFeedbackComments
                            employeeData={employeeData}
                            moveTab={moveTab}
                            setMoveTab={setMoveTab}
                            navPrompt={navPrompt}
                            setnavPrompt={setnavPrompt} />
                        </ProvidedReviewerContextProvider>
                      </Contain1>
                      <Footer>
                        <Footerbuttons
                        isCheckedothers={isCheckedothers}
                        employee1Data={employeeData}
                        objectiveDescription={objectiveDescription}
                         navPrompt={navPrompt} setnavPrompt={setnavPrompt} setValue={setValue} moveTab={moveTab}
                          setMoveTab={setMoveTab} fetchCancel={fetchCancel}
                          otherCancel={otherCancel}
                          areaCancel={areaCancel}
                          trainingCancel={trainingCancel} />
                      </Footer>
                    {/* </ProvidedNormalizerContextProvider> */}
                  </div>
                }
              </Container2>
            </Container1>
          </div>
        </>
        {/* } */}
      </>
    // </ProvidedReviewerContext>
  );
};

export default AppraiserSubmission;
