import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import HeaderTabs from "./HeaderTabs";
import Table2 from "./Table2";
import RTrecommandation from "./RTrecommandation";
import Checkboxs from "./Checkboxs";
import Footerbuttons from "./Footerbuttons";
import Performancefeedbacksummary from "./Performancefeedbacksummary";
import AppraiserOtherRecommendations from "./AppraiserOtherRecommendations";
import { Navcancelbuttons } from "./Navcancelbuttons";
import ROtherRecommandation from "./ROtherRecommandation";
import ReviewerRating from "./Rating/ReviewerRating";
import { useContext, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { Box, Breadcrumbs, Button, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import Infoicon from "./icons/Infoicon.svg";
import FooterButtonsForRecommendation from "./FooterButtonsForRecommendation";
import Table1 from "./Table1";
import Headleft from "./icons/Headleft.svg";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AlertDialogSuccess from "../../UI/DialogSuccess";
//prompt -------functions

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
  // marginTop: "10px",
  // textTransform: "none",
  // paddingBottom: "10px"
});
const Container2 = styled("div")({
  // marginLeft: "25px",
  // marginRight:"25px",
  // background: "#F2F9FA",
  backgroundColor: "#FFFFFF",
  marginLeft: "2.5%",
  marginRight: "2.5%",
  //marginTop: "10px",
  textTransform: "none",

  //height: "1280px",
  // marginLeft: "25px",
});

const Footer = styled("div")({
  // marginLeft: "450px",
  paddingTop: "120px",
  paddingBottom: "45px",
});
const Heading1 = styled("div")({
  // fontSize: "24px",
  // fontWeight: 400,
  // color: "#004C75",
  marginLeft: "33px",
  // marginTop: "20px",
  // fontFamily: "Arial",
});
const Reviewer = (props: any) => {
  const navigate = useNavigate();
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);

  console.log(navPrompt, 'navPrompt')
  const formIsDirty = navPrompt;
  usePrompt('Please save the changes before you leave the page.', formIsDirty);
  //prompt ------functions

  const { employeeData, trainingData, ratingData, otherData } = props;
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
  const [value, setValue] = React.useState(0);
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [moveTab, setMoveTab] = useState(false);
  const [message, setMessage] = useState("")
  const [openOk, setOpenOk] = useState(false)
  console.log(value, 'Tabvalue')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if (navPrompt === true) {
    //   setrejectAlert(true);
    // }
    if (moveTab === true) {
      setOpenOk(true);
      setMessage("Please save the changes before leaving the page.")
    }
    else {
      setValue(newValue);
    }
  };

  const handleAlertClose = () => {
    setOpenOk(false);
    setMessage("")
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

  //Tab functionalities
  return (
    <div style={{ backgroundColor: "#F1F1F1" }}>
      <AlertDialogSuccess
        isAlertOpen={openOk}
        handleAlertClose={handleAlertClose}>
        {message}
      </AlertDialogSuccess>
      <Dialog
        open={rejectAlert}
        onClose={handleSliderDialogClose}
        aria-labelledby="responsive-dialog-title"
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
          {/* <IconButton
            onClick={() => { navigate(`/reviewer`) }}
          >
            <img src={Headleft} alt="icon" />
          </IconButton> */}
          {/* <Link to={`/dashboardreview`}></Link> */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit" to={`/reviewer`}>PA Dashboard</Link>
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
            <Link style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }} color="text.primary" to={""} aria-current="page">
              {employeeData && employeeData?.data?.calendar?.name}
            </Link>
          </Breadcrumbs>
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

          {/* <p style={{ paddingLeft: "25px" }}>
            <img
              src={Headleft}
              alt="icon"
              height="12px"
              style={{ transform: "rotateZ(-180deg)" }}
            />
            <label
             style={{
              paddingLeft: "10px",
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          
            >
              Overview
            </label>
          </p> */}
        </Stack>
      </Heading1>
      <Container1>

        {employeeData
          // && checkIfRejected("rating") 
          && (
            // <HeaderTabs employee1Data={employeeData} rating1Data={ratingData} />
            <ReviewerRating
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
          {value === 1 && <div>
            <Performancefeedbacksummary employeeData={employeeData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} />

            {employeeData && (
              <Table1 />
            )}
            {employeeData && (
              <Table2 />
            )}
            {/* {employeeData && (
              <RTrecommandation training1Data={trainingData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
            )} */}

            {employeeData && (
              <AppraiserOtherRecommendations
              employeeData = {employeeData}
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
                setMoveTab={setMoveTab}
                moveTab={moveTab} />
            )}

            {/* {employeeData && (
              <ROtherRecommandation navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
            )} */}

            <Footer>
              {/* <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
              <FooterButtonsForRecommendation 
              navPrompt={navPrompt} 
              setnavPrompt={setnavPrompt} 
              setValue={setValue}
              moveTab = {moveTab}
              setMoveTab = {setMoveTab}
              value = {value} />
            </Footer>

          </div>}


        </Container2>
      </Container1>
    </div>
  );
};

export default Reviewer;
