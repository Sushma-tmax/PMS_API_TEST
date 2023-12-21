import * as React from "react";
import { styled } from "@mui/material/styles";
import HeaderTabs from "../NormalizerRejection/HeaderTabs";
import Table2 from "../NormalizerRejection/Table2";
import RTrecommandation from "../NormalizerRejection/RTrecommandation";
import Checkboxs from "../NormalizerRejection/Checkboxs";
import Footerbuttons from "../NormalizerRejection/Footerbuttons";
import Performancefeedbacksummary from "../NormalizerRejection/Performancefeedbacksummary";
import ReviewerOtherRecommendations from "../NormalizerRejection/ReviewerOtherRecommendations";
import { Navcancelbuttons } from "./Navcancelbuttons";
import Stack from "@mui/material/Stack";
import Headleft from "../../appraisal/components/Icons/Headleft.svg";
import { IconButton, Typography, Button, Breadcrumbs } from "@mui/material";
import Header from "../ReviewerRejection/Header";
import NormalizerRating from "./Rating/ReviewerRating";
import NTrainingComments from "./NormalizerTrainingRecommendationComments";
import NormalizerOtherComments from "./NormalizerOtherRecommendation";
import { useContext, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import Headleft from "../../appraisal/components/Icons/Headleft.svg";
import { Link } from 'react-router-dom';
import { useNormalizerContext } from "../../../context/normalizerContext";
//prompt -------functions
import ProvidedNormalizerContextProvider from '../../../context/normalizerContext';
import ProvidedReviewerContext from "../../../context/AppraiserRejectsNormalizer"
import NFeedbackComments from "./NormalizerFeedbackComments";
import ProvidedReviewerContextProvider from "../../../context/reviewerContextContext";


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
  marginTop: "-10px",
  marginLeft: "2.5%",
  marginRight: "2.5%",
  textTransform: 'none',
  background: "#FFFFFF",

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
const Rejection = (props: any) => {
  //@ts-ignore
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);

  //Tab functionalities 
  const [value, setValue] = React.useState(0);
  const [moveTab, setMoveTab] = React.useState<any>(false)

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
  usePrompt('Please save the changes before you leave the page.', formIsDirty);
  //prompt ------functions


  const { employeeData, trainingData, ratingData, otherData } = props;

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




  return (
    <ProvidedReviewerContext>
      <>
        {/* {employeeData.data.appraisal.appraiser_status && */}
        <>


          <div style={{ backgroundColor: "#F1F1F1" }}>
            {/* <Train> */}
            <Dialog
              open={rejectAlert}
              onClose={handleSliderDialogClose}
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
              marginLeft="32px"
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
                  color="inherit" to={`/dashboardreview`}>PA Dashboard</Link>
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
                <Link style={{
                  fontSize: "18px",
                  color: "#333333",
                  fontFamily: "Arial",
                }} color="text.primary" to={""} aria-current="page">
                  {employeeData && employeeData?.data?.calendar?.name}
                </Link>
              </Breadcrumbs>
            </Stack>
            {/* </Train> */}

            <Container1>

              {/* <Header/> */}

              {employeeData && (
                //  && checkIfRejected("rating") 

                // <HeaderTabs employee1Data={employeeData} rating1Data={ratingData} />
                <NormalizerRating
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
                    <ProvidedNormalizerContextProvider>
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
                          <NTrainingComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} moveTab={moveTab}
                            setMoveTab={setMoveTab} />
                          <RTrecommandation training1Data={trainingData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} moveTab={moveTab}
                            setMoveTab={setMoveTab} />
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
                            <NormalizerOtherComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} moveTab={moveTab}
                              setMoveTab={setMoveTab} />
                            {/* <ProvidedReviewerContextProvider> */}
                            <Checkboxs other1Data={otherData} navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                              moveTab={moveTab}
                              setMoveTab={setMoveTab}
                            />
                            {/* </ProvidedReviewerContextProvider> */}

                          </>
                        )}
                      <Contain1>
                        <ProvidedReviewerContextProvider>
                          <NFeedbackComments moveTab={moveTab}
                            setMoveTab={setMoveTab}
                            navPrompt={navPrompt} 
                            setnavPrompt={setnavPrompt}/>
                        </ProvidedReviewerContextProvider>
                      </Contain1>
                      <Footer>
                        <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt} setValue={setValue} moveTab={moveTab}
                          setMoveTab={setMoveTab} />
                      </Footer>
                    </ProvidedNormalizerContextProvider>
                  </div>
                }
              </Container2>
            </Container1>
          </div>
        </>
        {/* } */}
      </>
    </ProvidedReviewerContext>
  );
};

export default Rejection;
