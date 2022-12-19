import * as React from "react";
import { styled } from "@mui/material/styles";
import HeaderTabs from "../ReviewerRejection//HeaderTabs";
import Table2 from "../ReviewerRejection//Table2";
import RTrecommandation from "../ReviewerRejection//RTrecommandation";
import Checkboxs from "../ReviewerRejection//Checkboxs";
import Footerbuttons from "../ReviewerRejection/Footerbuttons";
import Performancefeedbacksummary from "../ReviewerRejection//Performancefeedbacksummary";
import ReviewerOtherRecommendations from "../ReviewerRejection//ReviewerOtherRecommendations";
import { Navcancelbuttons } from "./Navcancelbuttons";
import Stack from "@mui/material/Stack";
import Headleft from "../ReviewerRejection/Icons/Headleft.svg";
import { Breadcrumbs, Button, IconButton, Typography } from "@mui/material";
import Header from "../ReviewerRejection/Header";
import ReviewerRating from "./Rating/ReviewerRating";
import ATRecommendation from "./ATRecommendation";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useCallback, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import FooterButtonsForRecommendation from "./FooterButtonsForRecommendation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { useAppraiserRejectsReviewerContext } from "../../../context/AppraiserRejectsReviewer";



//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
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
  textTransform: "none",
});
const Container2 = styled("div")({
  // marginLeft: "25px",
  // marginRight:"25px",
  //background: "#F2F9FA",
  backgroundColor: "#FFFFFF",
  marginLeft: "2.5%",
  marginRight: "2.5%",
  //marginTop: "10px",
  textTransform: "none",
});

const Footer = styled("div")({
  // marginLeft: "450px",
  paddingTop: "120px",
  paddingBottom: "45px",
});
const Heading1 = styled("div")({
  fontSize: "24px",
  fontWeight: 400,
  color: "#004C75",
  marginLeft: "32px",
  // marginTop: "20px",
  fontFamily: "Arial",
});
const Rejection = (props: any) => {
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt(
    "Please save the changes before you leave the page.",
    formIsDirty
  );
  //prompt ------functions
  const navigate = useNavigate();
  const { employeeData, trainingData, ratingData, otherData } = props;
   //@ts-ignore
   const { moveTabValue, setMoveTabValue} = useAppraiserRejectsReviewerContext()
  console.log(employeeData, "empdata");
  // console.log(employeeData.data.reviewer.reviewer_rejected_value.filter((j:any) => j.value === "rating")[0].isChecked,'employeeData')

  // if (employeeData && employeeData?.data.appraisal.appraiser_status !== 'reviewer-rejected') {
  //   return (
  //     <>Reviewer should reject first </>
  //   )
  // }

  const checkIfRejected = (value: string) => {
    if (employeeData !== undefined) {
      return employeeData?.data?.reviewer?.reviewer_rejected_value?.filter(
        (j: any) => j?.value === value
      )[0]?.isChecked;
    }
  };

  //Tab functionalities
  const [value, setValue] = React.useState(0);
  const [moveTab, setMoveTab] = useState(false);
  const [message, setMessage] = useState("");
  const [openOk, setOpenOk] = useState(false);
  const [rejectAlert, setrejectAlert] = React.useState(false);

  console.log(value, 'Tabvalue')
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if(navPrompt === true){
    //   setrejectAlert(true);
    // } 
    if (moveTab == true) {
      setOpenOk(true);
      setMessage("Please save the changes before leaving the page.")
    } 
    else {
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

  const handleAlertCloseOk = () => {
    setOpenOk(false);
    setMessage("");
  }

  //Tab functionalities

  return (
    <div style={{ backgroundColor: "#F1F1F1" }}>

      <AlertDialogSuccess
        isAlertOpen={openOk}
        handleAlertClose={handleAlertCloseOk}
      >
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
            onClick={() => { navigate("/dashboardreview") }}
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
        {/* <Header/> */}

        {employeeData && (
          // <HeaderTabs employee1Data={employeeData} rating1Data={ratingData} />
          <ReviewerRating
            navPrompt={navPrompt}
            setnavPrompt={setnavPrompt}
            value={value}
            setValue={setValue}
            handleChange={handleChange}
          />
        )}

        {/* {employeeData && checkIfRejected('rating') &&<Navcancelbuttons/>} */}

        <Container2>

          {value === 1 &&
            <div>
              <Performancefeedbacksummary
                employeeData={employeeData}
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
                moveTab = {moveTab}
                setMoveTab = {setMoveTab}
              />

              {/*{employeeData && checkIfRejected("training_recommendation(s)") && (*/}
              {/*  <Table2 />*/}
              {/*)}*/}

              {employeeData && (
                <ATRecommendation
                  training1Data={trainingData}
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  moveTab = {moveTab}
                  setMoveTab = {setMoveTab}
                />
              )}
              {/* {employeeData &&  (
            <RTrecommandation
              training1Data={trainingData}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
            />
          )} */}
              {employeeData && (
                <Checkboxs
                  other1Data={otherData}
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  moveTab={moveTab}
                  setMoveTab={setMoveTab}
                />
              )}
              {/* {employeeData &&  (
            <ReviewerOtherRecommendations
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
            />
          )} */}
              <Footer>
                {/* <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
                <FooterButtonsForRecommendation navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  setValue={setValue}
                  moveTab={moveTab}
                  setMoveTab={setMoveTab} />
              </Footer>
            </div>
          }
          {/* <Footer>
            <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
          </Footer> */}
        </Container2>
      </Container1>
    </div>
  );
};

export default Rejection;
