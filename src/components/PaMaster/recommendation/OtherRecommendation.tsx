/* eslint-disable */
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Container, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  MASTER_NAV,
  OTHER_RECOMMENDATION_VIEW_PAGE,
} from "../../../constants/routes/Routing";
import PAMaster from "../../UI/PAMaster";
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useGetOtherRecommendationQuery } from "../../../service";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  customAlert: {
    backgroundColor: '#3e8cb5',
    color: "white",
    height: '60px !important',
    alignItems: "center",
    fontSize: "1rem"
  },
  customSnackbar: {
    paddingBottom: '16px',
    paddingRight: '16px',
  },
}));
//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  useEffect(() => {
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

const Text = styled("div")({
  // "& .MuiOutlinedInput-root": {
  //   height: "46px",
  // },
  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
  },
});

interface IOtherRecommendationProps {
  onSubmit: (name: string) => void;
}

const OtherRecommendation = (props: any) => {
  const {
    onSubmit,
    defaultValue,
    error,
    error1,
    displayError,
    from,
    open,
    handleClickClose,
    savingData
  } = props;
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [hide, setHide] = useState(false);
  const [charError, setCharError] = useState<any>("");
  const [duplicateError, setDuplicateError] = useState<any>(error);
  const [duplicateErrorEdit, setDuplicateErrorEdit] = useState<any>(error1);
  const { data, refetch } = useGetOtherRecommendationQuery("");
  const [sortOrder, setSortOrder] = useState<any>();
  const [textfeildError, settextfeildError] = useState<any>("");
  const [textfeildError1, settextfeildError1] = useState<any>("");

  const [open2, setOpen2] = React.useState(false);
  const dialogStyle = {
    backgroundColor: '#b3e0f2', // Set your desired background color here
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
  };
  useEffect(() => {
    if (data) {
      setSortOrder(data?.data?.length + 1);
    }
    if (defaultValue) {
      setSortOrder(defaultValue?.data?.sort_value);
    }
    if (defaultValue) {
      setName(defaultValue.data.name);
      console.log(defaultValue.data.name, "val");
    }
  }, [defaultValue, data]);

  console.log(name, "name");

  //console.log(setName);
  //const removeSpaceForSortOrder = sortOrder?.trim();
  const errorHandler = () => {
    // if (name === "") {
    //   settextfeildError("Enter text field");
    //   settextfeildError1("");
    // } else if (sortOrder === "") {
    //   return settextfeildError1("Enter Sort order");
    // } else {
    //   const removeSpace = name.trim();
    //   settextfeildError("");
    //   onSubmit(removeSpace, sortOrder);
    //   setnavPrompt(false);
    // }
    
    console.log(sortOrder,"removeSpaceForSortOrder")
    if(name === "" || sortOrder === ""){
    if (name === "") {
      settextfeildError("Enter text field");
      settextfeildError1("");
    } 
    if (sortOrder === "") {
     settextfeildError1("Enter Sort order");
    } 
  }else {
      const removeSpace = name.trim();
      settextfeildError("");
      settextfeildError1("");
      onSubmit(removeSpace, sortOrder);
      setnavPrompt(false);
    }
  };

  useEffect(() => {
    if (name != "") {
      settextfeildError("");
      settextfeildError1("");
      // if (sortOrder === "") {
      //   return settextfeildError1("Enter Sort order");
      // }
    }
  }, [name]);

  useEffect(() => {
    if (error === true) {
      setDuplicateError(true);
      setOpen2(true);
    }
  }, [error]);

  useEffect(() => {
    if (error1 === true) {
      setDuplicateErrorEdit(true);
      setOpen2(true);
    }
  }, [error1]);

  useEffect(() => {
    if (name === "") {
      setDuplicateError(false);
      setDuplicateErrorEdit(false);
    }
  }, [name]);

  // useEffect(() => {

  //   if (name === "" || name.match(/^[-_,\|\\.!@"'?#$%^&*=+`\[~}{:;/><()a-zA-Z\s\]]+$/)) {
  //     setCharError("");
  //     settextfeildError("")
  //   }
  //   else {
  //     setCharError("Only characters are allowed");

  //   }
  // }, [name])
  // const handleValidate = () => {
  //   if (name.match(/^[,.:;/!()a-zA-Z\s]+$/)) {
  //     setCharError("")
  //   }
  //   else {
  //     setCharError("Only characters are allowed")
  //   }
  // }

  const navigate = useNavigate();

  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);
  // useEffect(() => {
  //   if (name !== '') {
  //     setnavPrompt(true)
  //   } else {
  //     setnavPrompt(false)
  //   }
  // }, [name]);
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.", 
    "Any changes you have made will not be saved if you leave the page. ",
  formIsDirty);
  //prompt ------functions

  console.log(displayError, "errrrrorr");

  return (
    <>
      <PAMaster
        secondName={"Further Recommendations"}
        name={from + " Further Recommendations"}
        nav={`${OTHER_RECOMMENDATION_VIEW_PAGE}`}
      />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding:"20px",
          marginLeft:"25px",
          marginRight:"25px"

        }}
      >
        {/* <Grid item xs={12}> */}
        {/* <Stack spacing={2}> */}
        {/* <div
          style={{ paddingTop: "30px", position: "absolute", width: "96.5%" }}
        >
          {duplicateError && (
            <Alert 
            style={{
              fontFamily:"Arial",
            }} severity="error">

              Entered Other Recommendation already exists!
            </Alert>
          )}

          {duplicateErrorEdit && (
            <Alert
              style={{
                fontFamily: "Arial",
              }}
              severity="error">

              Entered Other Recommendation already exists!

            </Alert>
          )} 
        </div> */}
        {/* //old dialod */}
        {/* <AlertDialogSuccess
          isAlertOpen={open}
          handleAlertClose={handleClickClose}
        >
          Changes were successfully saved.
        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={open}
        autoHideDuration={3000}
        onClose={handleClickClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleClickClose}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> Changes were successfully saved.</b>
        </Alert>
      </Snackbar> 
        <Dialog
        keepMounted
        //  sx={{
        //   "& .MuiDialog-container": {
        //     backgroundColor: "lightblue !important",
        //     opacity:"0.6 !important",
        //   },
          //  backdropFilter: "blur(5px)",
          
        // }}
          open={open2}
          // onClose={handleClose2}
          //  BackdropProps={{
          //   style: { background: "#333333 !important", opacity: "10%" },
          // }}
          PaperProps={{
            style: {
              boxShadow: "none",
              borderRadius: "6px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",
              // border:"2px solid #3e8cb5",
            },
          }}
          // aria-labelledby="alert-dialog-title"
          // aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            id="alert-dialog-title"
          >
            <IconButton onClick={handleClose3} >
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
              {" "}
              {duplicateError && (
                <div>Entered Further Recommendation already exists.</div>
              )}
              {duplicateErrorEdit && (
                <div>Entered Further Recommendation already exists.</div>
              )}
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
                color:"#3e8cb5",
                // marginRight: "10px",
                width: "70px",
                height: "35px",
                background: "transparent",
              }}
              variant="outlined"
              autoFocus
              onClick={handleClose3}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          paddingTop="90px"
        >
          <p> </p>

           <Typography
            style={{
              color: "#3E8CB5",
              paddingLeft: "70px",
              fontSize: "18px",
              fontFamily: "Arial",
              // fontWeight: "500",
              //marginRight: "-160px",
              // marginLeft: "100px",
            }}
          >
            Add Other Recommendation
          </Typography> 

          <div>
            <Link to={`${OTHER_RECOMMENDATION_VIEW_PAGE}`}>
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  width: "70px",
                  height: "35px",
                }}
                variant="outlined"
              >
                View
              </Button>
            </Link>
          </div> 
        </Stack> */}

        <div
          
        >
          <Text>
            <p style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                size="small"
                id="outlined-basic"
                multiline
                inputProps={{ maxLength: 256 }}
                // maxRows={4}
                // label="Other Recommendation "
                placeholder="Add further recommendation"
                autoComplete="off"
                value={name}
                // value={name.replace(/[^a-zA-Z]/ig,'')}
                onKeyPress={(event) => {
                  var key = event.keyCode || event.which;
                  if (key === 13) {
                    errorHandler(), event.preventDefault();
                    console.log("Enter Button has been clicked");
                  }
                }}
                onChange={(e: { target: { value: any } }) => {
                  setName(e.target.value);
                  // handleValidate()
                  setnavPrompt(true);
                }}
                variant="outlined"
                style={{ width: "45%", borderRadius: "5px" }}
                // error={!name && textfeildError}
                // helperText={
                //   !name && textfeildError
                //     ? "*Other Recommendation required."
                //     : " "
                // }

                helperText={name === "" && textfeildError}
                error={name === "" && textfeildError}
              ></TextField>
            </p>
          </Text>
          <Text>
            <p style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                size="small"
                id="outlined-basic"
                multiline
                inputProps={{ maxLength: 256 }}
                // maxRows={4}
                placeholder="Add sort order "
                autoComplete="off"
                value={sortOrder}
                // value={name.replace(/[^a-zA-Z]/ig,'')}
                onKeyPress={(event) => {
                  var key = event.keyCode || event.which;
                  if (key === 13) {
                    errorHandler(), event.preventDefault();
                    console.log("Enter Button has been clicked");
                  }
                }}
                onChange={(e: { target: { value: any } }) => {
                  const inputValue = e.target.value;
                  const trimmedValue = inputValue.trim();
                  setSortOrder(trimmedValue);
                  // handleValidate()
                  setnavPrompt(true);
                }}
                variant="outlined"
                style={{ width: "45%", borderRadius: "5px" }}
                // error={!name && textfeildError}
                // helperText={
                //   !name && textfeildError
                //     ? "*Other Recommendation required."
                //     : " "
                // }

                helperText={sortOrder === "" && textfeildError1}
                error={sortOrder === "" && textfeildError1}
              ></TextField>
            </p>
          </Text>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            paddingTop="15px"
          >
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                width: "70px",
                height: "35px",

                // lineHeight:"normal",
                // padding:"9px 15px"
              }}
              variant="outlined"
              disabled={open || savingData}
              onClick={() => {
                // onSubmit(name);
                errorHandler();
              }}
            >
              Save
            </Button>
            <Link to={`${OTHER_RECOMMENDATION_VIEW_PAGE}`}>
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  width: "70px",
                  height: "35px",
                  // lineHeight:"normal",
                  // padding:"9px 15px"
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </Link>
          </Stack>
        </div>
        {/* </Stack> */}
        {/* </Grid> */}
      </Box>
    </>
  );
};

export default OtherRecommendation;
