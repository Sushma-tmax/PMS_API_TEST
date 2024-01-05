import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
// import Checkboxs from "./Checkboxs";
import { useContext, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import TeamApprove from './teamapprove';
import Performancefeedbacksummary1 from './Performancefeedbacksummary1';
import Table21 from './Table21';
import AppraiserOtherRecommendations1 from './AppraiserOtherRecommendations1';
import { Box, Breadcrumbs, Button, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { useGetEmployeeAppraisalQuery } from '../../../../service';
import Headleft from "../../../../assets/Images/Headleft.svg";
import Table11 from './Table11';
import FooterButtonsRecommendation from './FooterButtonsRecommendation';
import ProvidedReviewerContextProvider from '../../../../context/reviewerContextContext';
import { Link } from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AlertDialogSuccess from '../../../UI/DialogSuccess';
import EmployeeTrainingRecommendation from './EmployeeTrainingRecommendation';
import EmployeeSpecificArea from './EmployeeSpecificArea';
import { REVIEWER_VIEW_PA } from '../../../../constants/routes/Routing';
const Container1 = styled("div")({
  // position: "relative",
  // width: "96%",
  // height: "1907px",
  // marginLeft: "25px",
  // marginRight: "25px",
  // marginTop: "10px",
  textTransform: "none",
  paddingBottom: "25px"
});
const Container2 = styled("div")({
  // marginLeft: "25px",
  // marginRight:"25px",
  backgroundColor: "#FFFFFF",
  marginLeft: "25px",
  marginRight: "25px",
  textTransform: "none",
  padding: "35px",
  paddingTop: "0px"
  //height: "1280px",
  // marginLeft: "25px",
});
const Heading1 = styled("div")({
  // fontSize: "24px",
  // fontWeight: 400,
  // color: "#004C75",
  marginLeft: "25px",
  // marginTop: "20px",
  fontFamily: "Arial",
});

const Footer = styled("div")({
  // marginLeft: "450px",
  paddingTop: "120px",
  paddingBottom: "45px",
});
export function useBlocker(blocker: any, when = true) {
  const { employee_id } = useParams();
  const { data: employeeData } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(employeeData, "employeeData");
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
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ReviewerApproveAppraiser = (props: any) => {
  const [navPrompt, setnavPrompt] = React.useState(false);
  const [moveTab, setMoveTab] = useState()
  const [openOk, setOpenOk] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate();
  const { employee_id } = useParams();
  const { data: employeeData,refetch:fetchCancel } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(navPrompt, 'navPrompt')
  const formIsDirty = navPrompt;
  usePrompt(
    // 'Please save the changes before you leave the page.',
    "Any changes you have made will not be saved if you leave the page.",
     formIsDirty);
  //prompt ------functions

  const { trainingData, ratingData, otherData } = props;
  console.log(employeeData, "empdata");
  // console.log(employeeData.data.reviewer.reviewer_rejected_value.filter((j:any) => j.value === "rating")[0].isChecked,'employeeData')

  const checkIfRejected = (value: string) => {
    if (employeeData !== undefined) {
      return employeeData?.data?.reviewer?.reviewer_rejected_value?.filter(
        (j: any) => j?.value === value
      )[0]?.isChecked;
    }
  };
  //Tab functionalities
  const [value1, setValue1] = React.useState(0)
  const [rejectAlert, setrejectAlert] = React.useState(false);
  //  Console.log(value1,"TabValue")
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue1(newValue);
  // };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if (navPrompt === true) {
    //   setrejectAlert(true);
    // }
    if (moveTab === true) {
      setOpenOk(true);
      setMessage("Please save the changes before leaving the page.")
    } else {
      setValue1(newValue);
    }
  };

  const handleAlertClose = () => {
    setOpenOk(false);
    setMessage("");
    }

  const handleSliderDialogClose = () => {

    setrejectAlert(false);

  };
  const handleSliderDialogCancel = () => {
    if (value1 === 0) {
      setValue1(1)
    } else {
      setValue1(0)
    }
    setrejectAlert(false);

  };

  useEffect(() => {
    if (employeeData) {
    if (!employeeData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer")) {
      navigate(`${REVIEWER_VIEW_PA}/employee/${employee_id}`)
    }
  }
  },[employeeData])

  return (
    <ProvidedReviewerContextProvider>
      <div style={{ backgroundColor: "#F1F1F1",minHeight: "100px",
          overflow: "hidden",
           height: "auto", }}>
        <AlertDialogSuccess
        isAlertOpen = {openOk} 
        handleAlertClose = {handleAlertClose}>
          
          {message}
        </AlertDialogSuccess>
        <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
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
              Please save your changes before leaving the page
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
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  marginRight: "10px",
                  height: "35px",
                  width: "70px",
                  background: "transparent"
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
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Heading1>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
            minHeight="50px"
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                style={{
                  fontSize: "18px",
                  color: "#3e8cb5",
                  fontFamily: "Arial",
                }}
                color="inherit" to={`/reviewer`}>My Team Dashboard</Link>
              <Link style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
                color="inherit"
                to={`/reviewer`}
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
            {/* <IconButton
          onClick={()=>{navigate(`/reviewer`)}}
          >
            <img src={Headleft} alt="icon" />
          </IconButton> */}
            {/* <Link to={`/dashboardreview`}></Link> */}
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


          </Stack>
        </Heading1>

        <Container1>

          {employeeData && (

            <TeamApprove navPrompt={navPrompt} setnavPrompt={setnavPrompt}
              value1={value1} setValue1={setValue1} handleChange={handleChange}
              moveTab={moveTab} setMoveTab={setMoveTab}
            />
            // <Ratings navPrompt={navPrompt} setnavPrompt={setnavPrompt} 
            // value={value1} setValue={setValue1} handleChange={handleChange}
            // />
          )}

          <Container2>
            {value1 === 1 &&
              <div>

                <Performancefeedbacksummary1 employeeData={employeeData} navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                  setMoveTab={setMoveTab} moveTab={moveTab} />
                {employeeData && (

                  <Table11 />
                )}
                {employeeData && (

                  <EmployeeSpecificArea/>
                )}
                {employeeData && (

                  <Table21 />
                )}
                {employeeData && (
                  <EmployeeTrainingRecommendation/>
                )}
                
                {/* {employeeData && (
                <Rtrecommendation1 training1Data={trainingData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
              )} */}
                {employeeData && (
                  <AppraiserOtherRecommendations1
                    moveTab={moveTab}
                    setMoveTab={setMoveTab} 
                    navPrompt={navPrompt} 
                    setnavPrompt={setnavPrompt}
                    />
                )}
                
                {/* {employeeData && (
                <ROtherRecommandation1 navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
              )} */}
                {/* <Footer>
                <FooterButoons1
                  value1={value1} setValue1={setValue1} handleChange={handleChange}
                />
              </Footer> */}
                <Footer>
                {/* {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer") &&  */}
                  <FooterButtonsRecommendation
                    value1={value1} 
                    setValue1={setValue1} 
                    handleChange={handleChange}
                    moveTab={moveTab} 
                    setMoveTab={setMoveTab}
                    navPrompt={navPrompt} 
                    setnavPrompt={setnavPrompt}
                    fetchCancel={fetchCancel}
                  />
            {/* } */}
                </Footer>
              </div>
            }
            {/* <Performancefeedbacksummary1 employeeData={employeeData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} />

            <AppraiserOtherRecommendations1 navPrompt={navPrompt} setnavPrompt={setnavPrompt} />

            <ROtherRecommandation1 navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
            {/* <FooterButtons navPrompt={navPrompt} setnavPrompt={setnavPrompt}/> */}

          </Container2>
        </Container1>


      </div>
    </ProvidedReviewerContextProvider>
  );

};
export default ReviewerApproveAppraiser;