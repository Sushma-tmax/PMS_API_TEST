import * as React from 'react';
import { styled } from "@mui/material/styles";

import AppraiserOtherRecommendationN from './AppraiserOtherRecommendation';
import NormalizerRatingN from './NormalizerRating';
import PerformancefeedbacksummaryN from './PerformancefeedbacksummaryN';
import { useContext, useCallback, useState } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import FooterButtonsN from './FooterbuttonsN';
import { useParams, useNavigate } from "react-router-dom";
import { useGetEmployeeAppraisalQuery } from '../../../../service';
import { Box, Breadcrumbs, Button, IconButton, Popover, Container, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Headleft from "../../../assets/Images/Headleft.svg";
import Header from './NormalizerHeader';
import Infoicon from "../../../assets/Images/Infoicon.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Scrollbar } from "react-scrollbars-custom";
import ProvidedReviewerContextProvider from '../../../../context/reviewerContextContext';
import ProvidedAppraisalContextProvider from '../../../../context/appraiserOverviewContext';
import ProvidedNormalizerContextProvider from '../../../../context/normalizerContext';
import NAreaofImprovementN from './AreasofImprovement';
import TrainingRecommendations from './TrainingRecommendations';
import NFeedbackCommentsN from './OverallFeedbackComments';
import Downloadss from "../../../assets/Images/Downloadss.svg"
import Eye from "../../../assets/Images/Eye.svg"
import {NORMALIZER_VIEW_PA} from  "../../../../constants/routes/Routing"
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
const Container1 = styled("div")({
  // marginLeft: "25px",
  // marginRight: "25px",
  // marginTop: "10px",
  textTransform: 'none',
  paddingBottom:"25px"

});
const Container2 = styled("div")({
  // background: "white",
  // marginLeft: "25px",
  // marginRight: "25px",
  marginTop: "10px",
  textTransform: 'none'
});

const Footer = styled("div")({
  paddingTop: "120px",
  paddingBottom: "45px",
});

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  // @ts-ignore
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
const NormalizerApprove = (props: any) => {
  const [navPrompt, setnavPrompt] = React.useState(false);
  const { trainingData, ratingData, otherData,refetch, employeeData, nineBoxData, ratingScaleData,fetchCancel } = props
  const { employee_id } = useParams();
  const [moveTab, setMoveTab] = React.useState<any>(false)
  const [change, setChange] = React.useState<any>(false)
  let navigate = useNavigate();
  // const { data: employeeData } = useGetEmployeeAppraisalQuery(employee_id);
  console.log(navPrompt, 'navPrompt')
  const formIsDirty = navPrompt;
  usePrompt(
    // 'Please save the changes before you leave the page.',
    "Any changes you have made will not be saved if you leave the page.",
     formIsDirty);
  console.log(ratingScaleData, "ratingScaleData1")
  // console.log(employeeData, 'dddd')
  // const checkIfRejected = (value: string) => {
  //     if (employeeData !== undefined ) {
  //         return employeeData.data.normalizer.normalizer_rejected_value.filter((j:any) => j.value === value)[0].isChecked
  //     }
  // }
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEl);
  const id2 = openInfo ? "simple-popover" : undefined;
  // const id3 = openInfo1 ? "simple-popover" : undefined;

  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEl(null);
  };


  const Heading1 = styled("div")({
    fontSize: "24px",
    fontWeight: 400,
    color: "#004C75",
    // marginLeft: "25px",
    // marginTop: "20px",
    fontFamily: "regular",
  });
  //Tab 
  const [value, setValue] = React.useState<any>(0);

  console.log(value, 'valueeee')
  const [rejectAlert, setrejectAlert] = React.useState(false);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if (navPrompt === true) {
    //   setrejectAlert(true);
    // }
    if (moveTab === true) {
      setrejectAlert(true);
    } else {
      setValue(newValue);
    }
  };
  const handleViewPA = () => {
    window.open(`${NORMALIZER_VIEW_PA}/employee/${employee_id}`, '_blank')
  }

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

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: "24px" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  React.useEffect(() => {
    if (employeeData) {
    if (!employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer")) {
      navigate(`${NORMALIZER_VIEW_PA}/employee/${employee_id}`)
    }
    }
  },[employeeData])
  return (
    <ProvidedNormalizerContextProvider>
      <div style={{ backgroundColor: "#F1F1F1", 
      height: "auto", 
      minHeight: "100px",
    overflow: "hidden",  }}>
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
        <Heading1>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
            marginLeft="25px"
            // marginTop='20px'
            minHeight="50px"
          >
            {/* <IconButton>
              <Link
                to={`/normalizer`}
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
                color="inherit" to={`/normalizer`}> My Team Dashboard</Link>
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

              >My Actions</Link>
              <Typography style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }} 
              // color="text.primary" to={""} aria-current="page"
              >
                {employeeData && employeeData?.data?.calendar?.name}
              </Typography>
            </Breadcrumbs>

            {/* <p style={{ paddingLeft: "25px" }}>
            <img
              src={Headleft}
              alt="icon"
              height="12px"
              style={{ transform: "rotateZ(-180deg)" }}
            />
            <label
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
                paddingLeft: "15.2px",
              }}
            >
              Overview
            </label>
          </p> */}
          </Stack>
        </Heading1>
        <Container1>
          <Box
            sx={{
              // maxWidth: "95% !important",
              // height: "1408px",
              // marginTop: "5px",
              // height: "calc(100vh - 165px)",
              marginLeft:"25px",
              marginRight:"25px",
              background: "#fff",
            }}
          >
            <Box style={{ padding: "35px" }}>
            
              <div>
                <Header
                  appraisalData={employeeData}
                  ratingScaleData={ratingScaleData}
                  nineBoxData={nineBoxData}
                  employeeData={employeeData}
                />
              </div>


              {/* <TabPanel value={value} index={0}> */}
              {/* {employeeData && ( */}


              <NormalizerRatingN navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                employeeData={employeeData} value={value} setValue={setValue} handleChange={handleChange}
                ratingScaleData={ratingScaleData} moveTab={moveTab} setMoveTab={setMoveTab}
              />
              {/* )} */}
              {/* </TabPanel> */}

              {/* <TabPanel value={value} index={1}> */}
              <Container2>
                {value === 1 &&
                  <div>
                    <ProvidedNormalizerContextProvider>
                    <PerformancefeedbacksummaryN employeeData={employeeData} change={change} setChange={setChange} />
                    {/* {employeeData && ( */}
                    {/* <ProvidedReviewerContextProvider> */}
                      <NAreaofImprovementN />
                    {/* </ProvidedReviewerContextProvider> */}

                    <TrainingRecommendations />
                    {/* )} */}
                    {/* {employeeData && ( */}
                    {/* <NtrainingCommentsN /> */}
                    {/* )} */}
                    {/* {employeeData && ( */}
                    {/* <ProvidedReviewerContextProvider> */}
                      <AppraiserOtherRecommendationN
                        employeeData={employeeData}
                        navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                        moveTab={moveTab} setMoveTab={setMoveTab}
                        change={change} setChange={setChange}
                      />
                      {/* <NormalizerOtherCommentsN /> */}
                      {/* )} */}
                      <NFeedbackCommentsN
                        employeeData={employeeData}
                        navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                        moveTab={moveTab} setMoveTab={setMoveTab}
                        change={change} setChange={setChange}
                      />
                    {/* </ProvidedReviewerContextProvider> */}
                    {/* )} */}
                    {/* {employeeData && ( */}


                    <Footer>
                      {/* <ProvidedAppraisalContextProvider> */}

                        <FooterButtonsN
                          value={value} setValue={setValue} handleChange={handleChange}  navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                          moveTab={moveTab} setMoveTab={setMoveTab} change={change} setChange={setChange}
                          fetchCancel={fetchCancel} employeeData={employeeData}
                        />
                
                      {/* </ProvidedAppraisalContextProvider> */}
                    </Footer>
                    </ProvidedNormalizerContextProvider>
                  </div>
                }
              </Container2>





              {/* </TabPanel> */}
              {/* 
            {employeeData  && <NormalizerRating navPrompt={navPrompt} setnavPrompt={setnavPrompt} />}
                 <Performancefeedbacksummary  employeeData={employeeData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
                    {employeeData  &&<Table2 />}
                    {employeeData &&<NTrainingComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} />}
        {employeeData  &&<AppraiserOtherRecommendations navPrompt={navPrompt} setnavPrompt={setnavPrompt} />}
                    {employeeData  &&<NormalizerOtherComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} />} */}
            </Box>
          </Box>
        </Container1>

      </div>
    </ProvidedNormalizerContextProvider>
  )
}
export default NormalizerApprove