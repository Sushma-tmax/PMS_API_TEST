/* eslint-disable */
import * as React from "react";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Container, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  MASTER_NAV,
  FEEDBACK_QUESTIONNAIRE_VIEW_lIST,
} from "../../constants/routes/Routing";
import PAMaster from "../../components/UI/PAMaster";
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../assets/Images/Closeicon.svg"
import IconButton from "@mui/material/IconButton";
import AlertDialogSuccess from "../UI/DialogSuccess";


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
  "& .MuiInputBase-input": {
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
  },
});

interface IFeedBackQuestionnaire {
  onSubmit: (name: string) => void;
  defaultValue: any;
}

const FeedBackQuestionnaire = (props: any) => {
  const { onSubmit, defaultValue, feedbackError1, feedbackError2, open,handleClickClose,from  } = props;
  const [duplicateError, setDuplicateError] = useState<any>(feedbackError1);
  const [duplicateErrorEdit, setDuplicateErrorEdit] =
    useState<any>(feedbackError2);
  const [name, setName] = React.useState("");
  const [charError, setCharError] = useState<any>("");

  const [open2, setOpen2] = useState(false);
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
    if (defaultValue) {
      setName(defaultValue.data.name);
      console.log(defaultValue.data.name, "val");
    }
  }, [defaultValue]);

  const [textfeildError, settextfeildError] = useState<any>("");
  //console.log(setName);
  const errorHandler = () => {
    if (name === "") {
      return settextfeildError("Enter text field");
    } else {
      const removeSpace = name.trim();
      return settextfeildError(""), onSubmit(removeSpace), setnavPrompt(false);
    }
  };

  useEffect(() => {
    if (name != "") {
      return settextfeildError("");
    }
  }, [name]);

  useEffect(() => {
    if (feedbackError1 === true) {
      setDuplicateError(true);
      setOpen2(true)
    }
  }, [feedbackError1]);

  useEffect(() => {
    if (feedbackError2 === true) {
      setDuplicateErrorEdit(true);
      setOpen2(true)
    }
  }, [feedbackError2]);

  useEffect(() => {
    if (name === "") {
      setDuplicateError(false);
      setDuplicateErrorEdit(false);
    }
  }, [name]);

  // useEffect(()=> {

  //   if (name === "" || name.match(/^[-_,\|\\.!@"'?#$%^&*=+`\[~}{:;/><()a-zA-Z\s\]]+$/)) {
  //     setCharError("");
  //     settextfeildError("")
  //   }
  //   else {
  //     setCharError("Only characters are allowed");

  //   }
  // },[name])

  const navigate = useNavigate();

  // const handleKeyPress = (e:any) =>  {
  //   var key = event.keyCode || event.which;
  //   if (key === 13) {
  //       // perform your Logic on "enter" button
  //       console.log("Enter Button has been clicked")
  //   }
  // };
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
    "Please save the changes before you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  return (
    <>
      <PAMaster
        name={from + " Feedback Questionnaire"}
        nav={`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`}
        secondName={"Feedback Questionnaire"}
      />
      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 165px)",
          background: "#fff",
          position: "relative",
          padding:"30px"
          //boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          //marginTop: "15px",
        }}
      >
        <Grid item xs={12}>
          <Stack>
            {/* <div
              style={{
                paddingTop: "30px",
                position: "absolute",
                width: "96.5%",
              }}
            >
            {duplicateError && (
                <Alert style={{
                  fontFamily:"Arial",
                }}  severity="error">
                  Entered feedback questionnaire already exists!
                </Alert>
              )}
              {duplicateErrorEdit && (
                <Alert style={{
                  fontFamily:"Arial",
                }}  severity="error">
                  Entered feedback questionnaire already exists!
                </Alert>
              )}
            </div> */}
            <div style={{ width: "50%", }}>
          <Dialog
         open={open2} 
       // onClose={handleClose2}
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
                        <IconButton onClick={handleClose3}  >
                          <img src={Closeicon} alt="icon" />
                        </IconButton>
                      </DialogTitle> */}
           <Stack>
        <DialogContent><DialogContentText
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
          //height: "100px",
          // width :"300px",
          alignItems: "center",
        }}
        
        >
         <div >
         {duplicateError && (
                <div style={{
                  fontFamily:"Arial",
                }} >
                  Entered feedback questionnaire already exists.
                </div>
              )}
              {duplicateErrorEdit && (
                <div style={{
                  fontFamily:"Arial",
                }}  >
                  Entered feedback questionnaire already exists.
                </div>
              )}
          </div>
          </DialogContentText></DialogContent>
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
                    // marginRight: "10px",
                    color: "#3E8CB5",
                    background: "transparent",
                      width: "70px",
                    height: "35px",
                  }}
                  variant="outlined"
                  autoFocus
                  onClick={handleClose3}
                >
                  Ok
                </Button>
              </DialogActions>
              </Stack>
            </Dialog>
            </div>
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
                  paddingLeft: "110px",
                  fontSize: "18px",
                  fontFamily: "Arial",
                  //marginRight: "-160px",
                }}
              >
                Add Feedback Questionnaire
              </Typography> 

              <div>
                <Link to={`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`}>
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
            <Text>
              <p style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                      textTransform: "none",
                      fontFamily: "Arial",
                      color: "#333333",
                    },
                  }}
                  size="small"
                  id="outlined-basic"
                  multiline
                  // maxRows={4}
                  placeholder="Add feedback questionnaire"
                  autoComplete="off"
                  inputProps={{ maxLength: 256 }}
                  onKeyPress={(event) => {
                    var key = event.keyCode || event.which;
                    if (key === 13) {
                      errorHandler(),
                      event.preventDefault()
                        console.log("Enter Button has been clicked");
                    }
                  }}
                  value={name}
                  onChange={(e: { target: { value: any } }) => {
                    setName(e.target.value);
                    setnavPrompt(true);
                  }}
                  variant="outlined"
                  style={{ width: "45%" }}
                  error={textfeildError}
                  helperText={textfeildError}
                ></TextField>
              </p>
            </Text>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
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
                }}
                variant="outlined"
                onClick={() => {
                  // onSubmit(name);
                  errorHandler();
                }}
              >
                Save
              </Button>

              <Link to={`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`}>
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
                  Cancel
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Grid>
        <AlertDialogSuccess
          isAlertOpen={open}
          handleAlertClose={handleClickClose}
        >
          Changes have been saved.
        </AlertDialogSuccess>
      </Container>
    </>
  );
};

export default FeedBackQuestionnaire;
